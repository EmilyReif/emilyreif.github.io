import './timeline.css';

import { LitElement, html, svg } from 'lit';
import { customElement, state } from 'lit/decorators';
import {
  Project,
  ProjectTag,
  projects,
  ProjectTimelineMetadata,
  PROJECT_TIMELINE_METADATA,
} from './projects';

type TimelineSizeMode = 'importance' | 'publication';
type TimelineLane =
  | 'data'
  | 'visualization'
  | 'interpretability'
  | 'art'
  | 'real_people_using_ai'
  | 'not_ai';

type TimelineItem = {
  project: Project;
  decimalYear: number;
  isPublication: boolean;
  citationCount: number;
  dotColor: string;
  strokeColor: string;
  laneY: number;
  x: number;
  hiddenFromMain: boolean;
};

type PersistentTimelineLabel = {
  item: TimelineItem;
  x: number;
  y: number;
  width: number;
  height: number;
  direction: 'up' | 'down';
  side: 'left' | 'right';
  lines: string[];
  kindText: string;
};

const TIMELINE_HEIGHT = 580;
const TIMELINE_MARGIN_LEFT = 170;
const TIMELINE_MARGIN_RIGHT = 50;
const TIMELINE_TOP_LABEL_Y = 16;
const TIMELINE_LANE_TOP = 145;
const TIMELINE_LANE_SPACING = 38;
const DATA_MIN_YEAR = 2016;
const DATA_MAX_YEAR = 2026.7;

const TAG_BASE_COLORS: Record<ProjectTag, string> = {
  llms_and_data: '#e4a823',
  people_and_data: '#f1c245',
  pretraining_data: '#dc8a22',
  visualization: '#8c1d18',
  interpretability: '#7344ad',
  art: '#3f78bf',
  real_people_using_ai: '#2f8c54',
  not_ai: '#8ecf8b',
};

const TAG_TO_LANE: Record<ProjectTag, TimelineLane> = {
  llms_and_data: 'data',
  people_and_data: 'data',
  pretraining_data: 'data',
  visualization: 'visualization',
  interpretability: 'interpretability',
  art: 'art',
  real_people_using_ai: 'real_people_using_ai',
  not_ai: 'not_ai',
};

const LANE_ORDER: TimelineLane[] = [
  'data',
  'visualization',
  'interpretability',
  'art',
  'real_people_using_ai',
  'not_ai',
];

const LANE_LABELS: Record<TimelineLane, string> = {
  data: 'llms and data',
  visualization: 'visualization',
  interpretability: 'interpretability',
  art: 'art',
  real_people_using_ai: 'real people using AI',
  not_ai: 'not AI',
};

function normalizeTitle(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getScholarMetadata(projectName: string): ProjectTimelineMetadata | undefined {
  const normalizedName = normalizeTitle(projectName);
  for (const [title, metadata] of Object.entries(PROJECT_TIMELINE_METADATA)) {
    if (normalizeTitle(title) === normalizedName) {
      return metadata;
    }
    if ((metadata.aliases ?? []).some((alias) => normalizeTitle(alias) === normalizedName)) {
      return metadata;
    }
  }
  return undefined;
}

function inferYearFromLink(url: string): number | undefined {
  const explicitYears = url.match(/(19|20)\d{2}/g) ?? [];
  const validYears = explicitYears
    .map((yearText) => Number(yearText))
    .filter((year) => year >= 1990 && year <= 2035);
  if (validYears.length > 0) {
    return validYears[validYears.length - 1];
  }

  const arxivMatch = url.match(/arxiv\.org\/(?:abs|pdf)\/(\d{2})(\d{2})\./i);
  if (arxivMatch) {
    return 2000 + Number(arxivMatch[1]);
  }
  return undefined;
}

function inferYearMonthFromLink(url: string): { year: number; month?: number } | undefined {
  const arxivMatch = url.match(/arxiv\.org\/(?:abs|pdf)\/(\d{2})(\d{2})\./i);
  if (arxivMatch) {
    return {
      year: 2000 + Number(arxivMatch[1]),
      month: Number(arxivMatch[2]),
    };
  }

  const yearMonthMatch = url.match(/((?:19|20)\d{2})[\/\-_\.](0[1-9]|1[0-2])(?:[\/\-_\.]|$)/);
  if (yearMonthMatch) {
    return {
      year: Number(yearMonthMatch[1]),
      month: Number(yearMonthMatch[2]),
    };
  }
  return undefined;
}

function decimalYear(year: number, month?: number): number {
  if (!month || month < 1 || month > 12) {
    return year + 0.5;
  }
  return year + (month - 1) / 12;
}

function inferProjectDecimalYear(project: Project): number {
  const paperFirstLinks = [
    ...project.links.filter((link) => {
      const lowerName = link.name.toLowerCase();
      return (
        lowerName.includes('paper') ||
        lowerName.includes('publication') ||
        lowerName.includes('venue')
      );
    }),
    ...project.links,
  ];

  for (const link of paperFirstLinks) {
    const fromLink = inferYearMonthFromLink(link.link);
    if (fromLink) {
      return decimalYear(fromLink.year, fromLink.month);
    }
  }

  const scholarMetadata = getScholarMetadata(project.name);
  if (scholarMetadata) {
    return decimalYear(scholarMetadata.year, scholarMetadata.month);
  }

  for (const link of project.links) {
    const yearFromLink = inferYearFromLink(link.link);
    if (yearFromLink) {
      return decimalYear(yearFromLink);
    }
  }

  const yearFromName = project.name.match(/(19|20)\d{2}/);
  if (yearFromName) {
    return decimalYear(Number(yearFromName[0]));
  }
  return decimalYear(2024);
}

function inferPublicationStatus(project: Project): boolean {
  return project.links.some((link) => {
    const lowerName = link.name.toLowerCase();
    const lowerUrl = link.link.toLowerCase();
    return (
      lowerName.includes('paper') ||
      lowerName.includes('publication') ||
      lowerName.includes('venue') ||
      lowerUrl.includes('arxiv.org') ||
      lowerUrl.includes('aclanthology.org') ||
      lowerUrl.includes('ieeexplore.ieee.org') ||
      lowerUrl.includes('dl.acm.org') ||
      lowerUrl.includes('proceedings.neurips.cc')
    );
  });
}

function laneYForTags(tags: ProjectTag[]): number {
  const indices = Array.from(
    new Set(tags.map((tag) => TAG_TO_LANE[tag]).map((lane) => LANE_ORDER.indexOf(lane)))
  );
  const meanIndex = indices.reduce((sum, index) => sum + index, 0) / Math.max(indices.length, 1);
  return TIMELINE_LANE_TOP + meanIndex * TIMELINE_LANE_SPACING;
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '');
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return [r, g, b];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(Math.round(r))}${toHex(Math.round(g))}${toHex(Math.round(b))}`;
}

function blendTagColor(tags: ProjectTag[]): string {
  const colors = tags.map((tag) => hexToRgb(TAG_BASE_COLORS[tag]));
  const [r, g, b] = colors.reduce(
    (sum, [cr, cg, cb]) => [sum[0] + cr, sum[1] + cg, sum[2] + cb] as [number, number, number],
    [0, 0, 0]
  );
  const divisor = Math.max(colors.length, 1);
  return rgbToHex([r / divisor, g / divisor, b / divisor]);
}

function darkenColor(hexColor: string, factor = 0.7): string {
  const [r, g, b] = hexToRgb(hexColor);
  return rgbToHex([r * factor, g * factor, b * factor]);
}

function hashOffset(input: string, maxMagnitude: number): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return (hash % (maxMagnitude * 2 + 1)) - maxMagnitude;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

@customElement('timeline-component')
export class TimelineComponent extends LitElement {
  @state()
  private sizeMode: TimelineSizeMode = 'importance';

  @state()
  private timelineWidth = 1500;

  @state()
  private hoveredProjectName: string | null = null;

  private resizeObserver?: ResizeObserver;

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  override firstUpdated() {
    const timelineScroll = this.querySelector('.timeline-scroll');
    if (!timelineScroll) {
      return;
    }
    const updateTimelineWidth = () => {
      this.timelineWidth = Math.max(timelineScroll.clientWidth, 320);
    };
    updateTimelineWidth();
    this.resizeObserver = new ResizeObserver(() => {
      updateTimelineWidth();
    });
    this.resizeObserver.observe(timelineScroll);
  }

  override disconnectedCallback() {
    this.resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  private xForYear(decimalYear: number): number {
    const usableWidth = this.timelineWidth - TIMELINE_MARGIN_LEFT - TIMELINE_MARGIN_RIGHT;
    return (
      TIMELINE_MARGIN_LEFT +
      ((decimalYear - DATA_MIN_YEAR) / (DATA_MAX_YEAR - DATA_MIN_YEAR)) * usableWidth
    );
  }

  private importanceRadiusForItem(item: TimelineItem): number {
    return item.hiddenFromMain ? 4 : 16;
  }

  private publicationRadiusForItem(item: TimelineItem, items: TimelineItem[]): number {
    const citationValues = items.map((candidate) => candidate.citationCount);
    const minCitation = Math.min(...citationValues);
    const maxCitation = Math.max(...citationValues);
    if (maxCitation === minCitation) {
      return 10;
    }
    const normalized =
      (Math.sqrt(item.citationCount) - Math.sqrt(minCitation)) /
      (Math.sqrt(maxCitation) - Math.sqrt(minCitation));
    return 5 + normalized * 25;
  }

  private scaleForItem(item: TimelineItem, items: TimelineItem[]): number {
    const baseRadius = this.importanceRadiusForItem(item);
    if (this.sizeMode === 'importance') {
      return 1;
    }
    return this.publicationRadiusForItem(item, items) / Math.max(baseRadius, 0.1);
  }

  private preferredProjectLink(project: Project): string | undefined {
    const paperLike = project.links.find((link) => {
      const lowerName = link.name.toLowerCase();
      return (
        lowerName.includes('paper') ||
        lowerName.includes('publication') ||
        lowerName.includes('venue')
      );
    });
    return paperLike?.link ?? project.links[0]?.link;
  }

  private hoverInfoStyle(hoveredX: number): string {
    const boxWidth = 500;
    const gutter = 8;
    const placeRight = hoveredX < this.timelineWidth * 0.6;
    const rawLeft = placeRight ? hoveredX + 10 : hoveredX - boxWidth - 10;
    const left = clamp(rawLeft, gutter, this.timelineWidth - boxWidth - gutter);
    const textAlign = placeRight ? 'left' : 'right';
    return `left:${left}px;text-align:${textAlign};`;
  }

  private wrappedLineCount(text: string, maxCharsPerLine: number): number {
    return text
      .split('\n')
      .map((line) => Math.max(1, Math.ceil(line.length / maxCharsPerLine)))
      .reduce((sum, lineCount) => sum + lineCount, 0);
  }

  private hoverLineEndY(item: TimelineItem): number {
    const hoverTextTop = TIMELINE_LANE_TOP + (LANE_ORDER.length - 1) * TIMELINE_LANE_SPACING;
    const topPadding = 14;
    const titleLines = this.wrappedLineCount(item.project.name, 30);
    const descriptionLines =
      typeof item.project.description === 'string'
        ? this.wrappedLineCount(item.project.description, 46)
        : 4;
    const estimatedHeight = titleLines * 22 + descriptionLines * 18 + topPadding + 8;
    return Math.min(TIMELINE_HEIGHT - 10, hoverTextTop + estimatedHeight);
  }

  private shortPersistentLabelTitle(title: string): string {
    if (title.length > 58 && title.includes(':')) {
      const beforeColon = title.split(':')[0].trim();
      if (beforeColon.length >= 16) {
        return beforeColon;
      }
    }
    if (title.length <= 58) {
      return title;
    }
    return `${title.slice(0, 55).replace(/\s+$/, '')}...`;
  }

  private wrapTextByWords(text: string, maxCharsPerLine: number, maxLines: number): string[] {
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      return [''];
    }
    const lines: string[] = [];
    let current = '';
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length <= maxCharsPerLine) {
        current = candidate;
      } else {
        lines.push(current || word);
        current = current && current !== word ? word : '';
      }
      if (lines.length === maxLines) {
        break;
      }
    }
    if (lines.length < maxLines && current) {
      lines.push(current);
    }
    if (lines.length > maxLines) {
      lines.length = maxLines;
    }
    const usedWords = lines.join(' ').split(/\s+/).filter(Boolean).length;
    if (usedWords < words.length && lines.length > 0) {
      lines[lines.length - 1] = `${lines[lines.length - 1].replace(/\.\.\.$/, '')}...`;
    }
    return lines;
  }

  private rectsOverlap(
    a: { x: number; y: number; width: number; height: number },
    b: { x: number; y: number; width: number; height: number }
  ): boolean {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  private layoutPersistentLabels(items: TimelineItem[]): PersistentTimelineLabel[] {
    const labelWidth = 186;
    const labelPaddingY = 2;
    const chipRowHeight = 9;
    const chipGap = 4;
    const lineHeight = 11;
    const maxLines = 3;
    const maxCharsPerLine = 30;
    const placed: PersistentTimelineLabel[] = [];
    const occupied: Array<{ x: number; y: number; width: number; height: number }> = [];
    const minX = TIMELINE_MARGIN_LEFT + 6;
    const maxX = this.timelineWidth - TIMELINE_MARGIN_RIGHT - 6;
    const minY = 6;
    const maxY = TIMELINE_HEIGHT - 8;
    const dotBandTop = TIMELINE_LANE_TOP - 26;
    const dotBandBottom =
      TIMELINE_LANE_TOP + (LANE_ORDER.length - 1) * TIMELINE_LANE_SPACING + 26;
    const byPriority = [...items].sort((a, b) => {
      const aPriority = (a.hiddenFromMain ? 0 : 1000) + a.citationCount;
      const bPriority = (b.hiddenFromMain ? 0 : 1000) + b.citationCount;
      return bPriority - aPriority;
    });

    for (const item of byPriority) {
      const title = this.shortPersistentLabelTitle(item.project.name);
      const lines = this.wrapTextByWords(title, maxCharsPerLine, maxLines);
      const textHeight = lines.length * lineHeight;
      const labelHeight = labelPaddingY * 2 + chipRowHeight + chipGap + textHeight;
      const kindText = item.isPublication ? 'paper' : 'proj';

      let chosen: PersistentTimelineLabel | undefined;
      const preferBelow = item.laneY <= TIMELINE_LANE_TOP + 2 * TIMELINE_LANE_SPACING;
      const directions: Array<'down' | 'up'> = preferBelow ? ['down', 'up'] : ['up', 'down'];

      for (let row = 0; row < 36 && !chosen; row++) {
        for (const direction of directions) {
          for (const side of ['right', 'left'] as Array<'right' | 'left'>) {
            let y =
              direction === 'down'
                ? item.laneY + 12 + row * (labelHeight + 8)
                : item.laneY - 12 - labelHeight - row * (labelHeight + 8);
            if (direction === 'down') {
              y = Math.max(y, dotBandBottom + 8);
            } else {
              y = Math.min(y, dotBandTop - labelHeight - 8);
            }
            y = clamp(y, minY, maxY - labelHeight);
            const rectX = side === 'right' ? item.x + 8 : item.x - labelWidth - 8;
            const x = clamp(rectX, minX, maxX - labelWidth);
            const rect = { x, y, width: labelWidth, height: labelHeight };
            const overlap = occupied.some((placedRect) =>
              this.rectsOverlap(
                { x: rect.x - 6, y: rect.y - 6, width: rect.width + 12, height: rect.height + 12 },
                placedRect
              )
            );
            if (!overlap) {
              chosen = {
                item,
                x: item.x,
                y,
                width: labelWidth,
                height: labelHeight,
                direction,
                side,
                lines,
                kindText,
              };
              occupied.push(rect);
              break;
            }
          }
          if (chosen) {
            break;
          }
        }
        if (chosen) {
          break;
        }
      }

      if (!chosen) {
        const side: 'right' | 'left' = item.x < this.timelineWidth * 0.58 ? 'right' : 'left';
        const y =
          item.laneY <= TIMELINE_LANE_TOP + 2 * TIMELINE_LANE_SPACING
            ? dotBandBottom + 16 + placed.length * 6
            : dotBandTop - labelHeight - 16 - placed.length * 6;
        chosen = {
          item,
          x: item.x,
          y: clamp(y, minY, maxY - labelHeight),
          width: labelWidth,
          height: labelHeight,
          direction: y > item.laneY ? 'down' : 'up',
          side,
          lines,
          kindText,
        };
      }

      placed.push(chosen);
    }

    return placed;
  }

  private itemOpacity(item: TimelineItem): number {
    if (this.sizeMode === 'publication' && !item.isPublication) {
      return 0.35;
    }
    return 0.68;
  }

  private computeTimelineItems(): TimelineItem[] {
    return projects.map((project) => {
      const scholarMetadata = getScholarMetadata(project.name);
      const decimalYear = clamp(
        inferProjectDecimalYear(project),
        DATA_MIN_YEAR + 0.02,
        DATA_MAX_YEAR - 0.02
      );
      const isPublication = inferPublicationStatus(project);
      const citationCount = scholarMetadata?.citations ?? 10;
      const dotColor = blendTagColor(project.tags);
      const strokeColor = darkenColor(dotColor);
      const artLaneY = TIMELINE_LANE_TOP + LANE_ORDER.indexOf('art') * TIMELINE_LANE_SPACING;
      const laneY = project.tags.includes('art')
        ? artLaneY
        : laneYForTags(project.tags) + hashOffset(`${project.name}-y`, 6);
      const x = this.xForYear(decimalYear);
      return {
        project,
        decimalYear,
        isPublication,
        citationCount,
        dotColor,
        strokeColor,
        laneY,
        x,
        hiddenFromMain: Boolean(project.hide_in_main_list),
      };
    });
  }

  private smoothCurveCommands(points: Array<{ x: number; y: number }>): string {
    if (points.length < 2) {
      return '';
    }
    const commands: string[] = [];
    for (let i = 1; i < points.length - 1; i++) {
      const control = points[i];
      const next = points[i + 1];
      const midX = (control.x + next.x) / 2;
      const midY = (control.y + next.y) / 2;
      commands.push(`Q ${control.x} ${control.y} ${midX} ${midY}`);
    }
    const last = points[points.length - 1];
    const penultimate = points[points.length - 2];
    commands.push(`Q ${penultimate.x} ${penultimate.y} ${last.x} ${last.y}`);
    return commands.join(' ');
  }

  private smoothAreaPath(
    topBoundary: Array<{ x: number; y: number }>,
    bottomBoundary: Array<{ x: number; y: number }>
  ): string {
    if (topBoundary.length < 2 || bottomBoundary.length < 2) {
      return '';
    }
    const reversedBottom = [...bottomBoundary].reverse();
    return [
      `M ${topBoundary[0].x} ${topBoundary[0].y}`,
      this.smoothCurveCommands(topBoundary),
      `L ${reversedBottom[0].x} ${reversedBottom[0].y}`,
      this.smoothCurveCommands(reversedBottom),
      'Z',
    ].join(' ');
  }

  private renderAreaLabel(x: number, y: number, main: string, sub: string) {
    return svg`
      <text class='timeline-area-label' x=${x} y=${y} text-anchor='middle'>
        <tspan class='timeline-area-main'>${main}:</tspan>
        <tspan class='timeline-area-rest'> ${sub}</tspan>
      </text>
    `;
  }

  override render() {
    const timelineItems = this.computeTimelineItems();
    const persistentLabels = this.layoutPersistentLabels(timelineItems);
    const hoveredItem = this.hoveredProjectName
      ? timelineItems.find((item) => item.project.name === this.hoveredProjectName)
      : undefined;
    const hoveredScale = hoveredItem ? this.scaleForItem(hoveredItem, timelineItems) : 1;
    const hoveredDotRadius = hoveredItem
      ? this.importanceRadiusForItem(hoveredItem) * hoveredScale
      : 0;
    const hoveredRingRadius = hoveredDotRadius + 7;
    const areaTop = 8;
    const areaBottom = 76;
    const areaHeight = areaBottom - areaTop;
    const areaScale = areaHeight / 2;
    const yearTicks: number[] = [];
    for (let year = Math.ceil(DATA_MIN_YEAR); year <= Math.floor(DATA_MAX_YEAR); year++) {
      yearTicks.push(year);
    }

    const googleInternStartYear = 2016 + 5 / 12; // June 2016
    const googleInternEndYear = 2016 + 9 / 12; // end of Sept 2016
    const brownMastersStartYear = googleInternEndYear; // Sept 2016
    const brownMastersEndYear = 2017 + 5 / 12; // end of May 2017
    const googleBrainStartYear = 2017 + 8 / 12; // Sept 2017
    const googleDropYear = 2024 + 4 / 12;
    const uwStartYear = 2024 + 8 / 12;
    const areaSampleYears: number[] = [];
    for (let year = DATA_MIN_YEAR; year <= DATA_MAX_YEAR + 0.001; year += 1 / 12) {
      areaSampleYears.push(year);
    }

    const googleFractionAtYear = (year: number): number => {
      const isIntern = year >= googleInternStartYear && year < googleInternEndYear;
      const isFullTimeGoogle = year >= googleBrainStartYear && year < googleDropYear;
      const isPartTimeGoogle = year >= googleDropYear;
      return isIntern || isFullTimeGoogle ? 1 : isPartTimeGoogle ? 0.2 : 0;
    };

    const educationFractionAtYear = (year: number): number => {
      const isBrownMasters = year >= brownMastersStartYear && year < brownMastersEndYear;
      const isUw = year >= uwStartYear;
      return isBrownMasters ? 1 : isUw ? 0.8 : 0;
    };

    const googleLabelY = (_year: number): number => areaBottom + 6;
    const educationLabelY = (_year: number): number => areaTop - 2;

    const googleTopBoundary = areaSampleYears.map((year) => {
      const googleFraction = googleFractionAtYear(year);
      return { x: this.xForYear(year), y: areaBottom - googleFraction * areaScale };
    });
    const googleBottomBoundary = areaSampleYears.map((year) => ({
      x: this.xForYear(year),
      y: areaBottom,
    }));

    const educationTopBoundary = areaSampleYears.map((year) => {
      const googleFraction = googleFractionAtYear(year);
      const educationFraction = educationFractionAtYear(year);
      const googleTop = areaBottom - googleFraction * areaScale;
      return { x: this.xForYear(year), y: googleTop - educationFraction * areaScale };
    });
    const educationBottomBoundary = areaSampleYears.map((year) => {
      const googleFraction = googleFractionAtYear(year);
      return { x: this.xForYear(year), y: areaBottom - googleFraction * areaScale };
    });

    const googlePath = this.smoothAreaPath(googleTopBoundary, googleBottomBoundary);
    const educationPath = this.smoothAreaPath(educationTopBoundary, educationBottomBoundary);

    return html`
      <div class='timeline-controls font-sm'>
        <span class='timeline-control-label'>dot size:</span>
        <span class=${this.sizeMode === 'importance' ? 'timeline-mode active' : 'timeline-mode'}>
          importance
        </span>
        <label class='timeline-switch'>
          <input
            type='checkbox'
            ?checked=${this.sizeMode === 'publication'}
            @change=${(event: Event) => {
              const checked = (event.target as HTMLInputElement).checked;
              this.sizeMode = checked ? 'publication' : 'importance';
            }}
          />
          <span class='timeline-switch-track'></span>
        </label>
        <span class=${this.sizeMode === 'publication' ? 'timeline-mode active' : 'timeline-mode'}>
          citations
        </span>
      </div>
      <div class='timeline-scroll'>
        <svg class='timeline-svg' viewBox='0 0 ${this.timelineWidth} ${TIMELINE_HEIGHT}' role='img'>
          <desc>Timeline of projects and publications by theme and time.</desc>

          <rect x='0' y='0' width='${this.timelineWidth}' height='${TIMELINE_HEIGHT}' fill='#ffffff'></rect>

          <path
            d=${googlePath}
            fill='#7289a8'
            fill-opacity='0.36'
            stroke='#ffffff'
            stroke-opacity='0.95'
            stroke-width='2.5'
            stroke-linejoin='round'
          ></path>
          <path
            d=${educationPath}
            fill='#9eb2ca'
            fill-opacity='0.42'
            stroke='#ffffff'
            stroke-opacity='0.95'
            stroke-width='2.5'
            stroke-linejoin='round'
          ></path>

          ${yearTicks.map(
            (year) => svg`
              <line
                x1=${this.xForYear(year)}
                y1='38'
                x2=${this.xForYear(year)}
                y2='385'
                stroke='#1a1a1a'
                stroke-opacity='0.05'
                stroke-width='1'
              ></line>
              <text
                class='timeline-year-label'
                x=${this.xForYear(year)}
                y=${TIMELINE_TOP_LABEL_Y}
                text-anchor='middle'
              >
                ${year}
              </text>
            `
          )}

          ${this.renderAreaLabel(
            this.xForYear((googleInternStartYear + googleInternEndYear) / 2),
            googleLabelY((googleInternStartYear + googleInternEndYear) / 2),
            'Google',
            'internship'
          )}
          ${this.renderAreaLabel(
            this.xForYear((googleBrainStartYear + 2020) / 2),
            googleLabelY((googleBrainStartYear + 2020) / 2),
            'Google',
            'Brain'
          )}
          ${this.renderAreaLabel(
            this.xForYear((2020 + googleDropYear) / 2),
            googleLabelY((2020 + googleDropYear) / 2),
            'Google',
            'Responsible AI'
          )}
          ${this.renderAreaLabel(
            this.xForYear((googleDropYear + DATA_MAX_YEAR) / 2),
            googleLabelY((googleDropYear + DATA_MAX_YEAR) / 2),
            'Google',
            'DeepMind'
          )}
          ${this.renderAreaLabel(
            this.xForYear((brownMastersStartYear + brownMastersEndYear) / 2),
            educationLabelY((brownMastersStartYear + brownMastersEndYear) / 2),
            'Brown',
            'Masters'
          )}
          ${this.renderAreaLabel(
            this.xForYear((uwStartYear + DATA_MAX_YEAR) / 2),
            educationLabelY((uwStartYear + DATA_MAX_YEAR) / 2),
            'UW',
            'PhD'
          )}

          ${LANE_ORDER.map(
            (lane, laneIndex) => svg`
              <line
                x1=${TIMELINE_MARGIN_LEFT - 5}
                y1=${TIMELINE_LANE_TOP + laneIndex * TIMELINE_LANE_SPACING}
                x2=${this.timelineWidth - TIMELINE_MARGIN_RIGHT}
                y2=${TIMELINE_LANE_TOP + laneIndex * TIMELINE_LANE_SPACING}
                stroke='#4e4e4e'
                stroke-opacity='0.5'
                stroke-width='1.2'
              ></line>
              <text
                class='timeline-lane-label'
                x=${TIMELINE_MARGIN_LEFT - 12}
                y=${TIMELINE_LANE_TOP + laneIndex * TIMELINE_LANE_SPACING + 4}
                text-anchor='end'
              >
                ${LANE_LABELS[lane]}
              </text>
            `
          )}

          ${persistentLabels.map((label) => {
            const scale = this.scaleForItem(label.item, timelineItems);
            const baseRadius = this.importanceRadiusForItem(label.item) * scale;
            const y1 =
              label.direction === 'down'
                ? label.item.laneY + baseRadius + 2
                : label.item.laneY - baseRadius - 2;
            const y2 = label.direction === 'down' ? label.y : label.y + label.height;
            return svg`
              <line
                class='timeline-persistent-line'
                x1=${label.item.x}
                y1=${y1}
                x2=${label.item.x}
                y2=${y2}
              ></line>
            `;
          })}

          ${hoveredItem
            ? svg`
                <line
                  class='timeline-hover-line'
                  x1=${hoveredItem.x}
                  y1=${hoveredItem.laneY + hoveredRingRadius}
                  x2=${hoveredItem.x}
                  y2=${this.hoverLineEndY(hoveredItem)}
                ></line>
                <circle
                  class='timeline-hover-ring'
                  cx=${hoveredItem.x}
                  cy=${hoveredItem.laneY}
                  r=${hoveredRingRadius}
                ></circle>
              `
            : null}

          ${timelineItems.map(
            (item) => svg`
              <g
                class='timeline-dot-group'
                transform='translate(${item.x} ${item.laneY})'
                @mouseenter=${() => {
                  this.hoveredProjectName = item.project.name;
                }}
                @mouseleave=${() => {
                  this.hoveredProjectName = null;
                }}
                @click=${() => {
                  const url = this.preferredProjectLink(item.project);
                  if (url) {
                    window.open(url, '_blank', 'noopener');
                  }
                }}
              >
                <g
                  class='timeline-dot-scale'
                  transform='scale(${this.scaleForItem(item, timelineItems)})'
                >
                  <circle
                    class='timeline-dot'
                    cx='0'
                    cy='0'
                    r=${this.importanceRadiusForItem(item)}
                    fill=${item.dotColor}
                    fill-opacity=${this.itemOpacity(item)}
                    stroke=${item.isPublication ? item.strokeColor : 'none'}
                    stroke-width=${item.isPublication ? 2 : 0}
                  >
                    <title>${item.project.name}</title>
                  </circle>
                </g>
              </g>
            `
          )}

          ${persistentLabels.map((label) => svg`
            <g class='timeline-persistent-label'>
              <text
                class='timeline-persistent-icon'
                x=${label.side === 'right' ? label.x + 8 : label.x - 8}
                y=${label.y + 10}
                text-anchor=${label.side === 'right' ? 'start' : 'end'}
              >
                ${label.kindText === 'paper' ? '[*]' : '[+]'}
              </text>
              <text
                class='timeline-persistent-kind-text'
                x=${label.side === 'right' ? label.x + 36 : label.x - 36}
                y=${label.y + 10}
                text-anchor='middle'
              >
                ${label.kindText}
              </text>
              ${label.lines.map(
                (line, lineIndex) => svg`
                  <text
                    class='timeline-persistent-label-text'
                    x=${label.side === 'right' ? label.x + 8 : label.x - 8}
                    y=${label.y + 24 + lineIndex * 11}
                    text-anchor=${label.side === 'right' ? 'start' : 'end'}
                  >
                    ${line}
                  </text>
                `
              )}
            </g>
          `)}
        </svg>
        ${hoveredItem
          ? html`
              <div class='timeline-hover-anchor' style=${this.hoverInfoStyle(hoveredItem.x)}>
                <div class='timeline-hover-title'>${hoveredItem.project.name}</div>
                <div class='timeline-hover-description'>${hoveredItem.project.description}</div>
              </div>
            `
          : null}
      </div>
    `;
  }
}
