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
  preferenceFraction: number | null;
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

const TIMELINE_HEIGHT = 700;
const TIMELINE_MARGIN_LEFT = 170;
const TIMELINE_MARGIN_RIGHT = 50;
const TIMELINE_TOP_LABEL_Y = 16;
const TIMELINE_LANE_TOP = 260;
const TIMELINE_LANE_SPACING = 19;
const DATA_MIN_YEAR = 2015;
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

const LANE_COLORS: Record<TimelineLane, string> = {
  data: TAG_BASE_COLORS.llms_and_data,
  visualization: TAG_BASE_COLORS.visualization,
  interpretability: TAG_BASE_COLORS.interpretability,
  art: TAG_BASE_COLORS.art,
  real_people_using_ai: TAG_BASE_COLORS.real_people_using_ai,
  not_ai: TAG_BASE_COLORS.not_ai,
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
    if (item.hiddenFromMain) {
      return 4;
    }
    const minRadius = 4;
    const maxRadius = 28;
    const fraction = item.preferenceFraction ?? 0.5;
    const curved = Math.pow(fraction, 2.4);
    return minRadius + curved * (maxRadius - minRadius);
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

  private hashedBit(seed: string): boolean {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    return (hash & 1) === 0;
  }

  private layoutPersistentLabels(items: TimelineItem[]): PersistentTimelineLabel[] {
    const labelMaxWidth = 100;
    const labelPaddingY = 2;
    const lineHeight = 11;
    const maxLines = 4;
    const maxCharsPerLine = 18;
    const subjectGap = 30;
    const labelGap = 5;
    const overlapPad = 3;
    const minY = 140;
    const maxY = TIMELINE_HEIGHT - 8;
    const lanesTop = TIMELINE_LANE_TOP;
    const lanesBottom =
      TIMELINE_LANE_TOP + (LANE_ORDER.length - 1) * TIMELINE_LANE_SPACING;
    const subjectAreaTop = lanesTop - subjectGap;
    const subjectAreaBottom = lanesBottom + subjectGap;

    const placed: PersistentTimelineLabel[] = [];
    const occupied: Array<{ x: number; y: number; width: number; height: number }> = [];
    const occupiedLines: Array<{ x: number; y1: number; y2: number }> = [];

    for (const item of items) {
      const title = this.shortPersistentLabelTitle(item.project.name);
      const lines = this.wrapTextByWords(title, maxCharsPerLine, maxLines);
      const longestLine = lines.reduce(
        (longest, line) => Math.max(longest, line.length),
        0
      );
      const labelWidth = Math.min(
        labelMaxWidth,
        Math.max(40, Math.ceil(longestLine * 5.2))
      );
      const labelHeight = labelPaddingY * 2 + lines.length * lineHeight;
      const kindText = item.isPublication ? 'paper' : 'proj';
      const initialDir: 'up' | 'down' = this.hashedBit('v:' + item.project.name)
        ? 'up'
        : 'down';
      const initialSide: 'left' | 'right' = this.hashedBit(
        'h:' + item.project.name
      )
        ? 'right'
        : 'left';
      const otherDir: 'up' | 'down' = initialDir === 'up' ? 'down' : 'up';
      const otherSide: 'left' | 'right' =
        initialSide === 'right' ? 'left' : 'right';
      const variations: Array<{ direction: 'up' | 'down'; side: 'left' | 'right' }> = [
        { direction: initialDir, side: initialSide },
        { direction: initialDir, side: otherSide },
        { direction: otherDir, side: initialSide },
        { direction: otherDir, side: otherSide },
      ];
      const stepSize = labelHeight + labelGap;

      let chosen: PersistentTimelineLabel | undefined;
      let chosenRect: { x: number; y: number; width: number; height: number } | undefined;
      let chosenLine: { x: number; y1: number; y2: number } | undefined;
      for (let attempt = 0; attempt < 80 && !chosen; attempt++) {
        const offset = attempt * stepSize;
        for (const strict of [true, false]) {
          for (const variation of variations) {
            const { direction, side } = variation;
            const y =
              direction === 'up'
                ? subjectAreaTop - labelHeight - offset
                : subjectAreaBottom + offset;
            if (direction === 'up' && y < minY) {
              continue;
            }
            if (direction === 'down' && y + labelHeight > maxY) {
              continue;
            }
            const rectX = side === 'right' ? item.x : item.x - labelWidth;
            const rect = {
              x: rectX,
              y,
              width: labelWidth,
              height: labelHeight,
            };
            const inflated = {
              x: rect.x - overlapPad,
              y: rect.y - overlapPad,
              width: rect.width + overlapPad * 2,
              height: rect.height + overlapPad * 2,
            };
            const overlap = occupied.some((placedRect) =>
              this.rectsOverlap(inflated, placedRect)
            );
            if (overlap) {
              continue;
            }
            const candidateLine = {
              x: item.x,
              y1: direction === 'down' ? item.laneY : y,
              y2: direction === 'down' ? y + labelHeight : item.laneY,
            };
            if (strict) {
              const newLineCrossesText = occupied.some(
                (placedRect) =>
                  candidateLine.x > placedRect.x &&
                  candidateLine.x < placedRect.x + placedRect.width &&
                  candidateLine.y1 < placedRect.y + placedRect.height &&
                  candidateLine.y2 > placedRect.y
              );
              if (newLineCrossesText) {
                continue;
              }
              const textCrossesExistingLine = occupiedLines.some(
                (line) =>
                  line.x > rect.x &&
                  line.x < rect.x + rect.width &&
                  line.y1 < rect.y + rect.height &&
                  line.y2 > rect.y
              );
              if (textCrossesExistingLine) {
                continue;
              }
            }
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
            chosenRect = rect;
            chosenLine = candidateLine;
            break;
          }
          if (chosen) {
            break;
          }
        }
      }

      if (chosen && chosenRect && chosenLine) {
        occupied.push(chosenRect);
        occupiedLines.push(chosenLine);
      }

      if (chosen) {
        placed.push(chosen);
      }
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
    const visibleRanks = new Map<string, number>();
    let rank = 0;
    for (const project of projects) {
      if (!project.hide_in_main_list) {
        visibleRanks.set(project.name, rank);
        rank += 1;
      }
    }
    const totalVisible = rank;

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
      const hiddenFromMain = Boolean(project.hide_in_main_list);
      const rankIndex = visibleRanks.get(project.name);
      const preferenceFraction =
        hiddenFromMain || rankIndex === undefined
          ? null
          : totalVisible <= 1
            ? 1
            : 1 - rankIndex / (totalVisible - 1);
      return {
        project,
        decimalYear,
        isPublication,
        citationCount,
        dotColor,
        strokeColor,
        laneY,
        x,
        hiddenFromMain,
        preferenceFraction,
      };
    });
  }

  private smoothCurveCommands(
    points: Array<{ x: number; y: number }>,
    tension = 0.45
  ): string {
    if (points.length < 2) {
      return '';
    }
    const commands: string[] = [];
    for (let i = 1; i < points.length - 1; i++) {
      const corner = points[i];
      const next = points[i + 1];
      const midX = (corner.x + next.x) / 2;
      const midY = (corner.y + next.y) / 2;
      const ctrlX = midX + (corner.x - midX) * tension;
      const ctrlY = midY + (corner.y - midY) * tension;
      commands.push(`Q ${ctrlX} ${ctrlY} ${midX} ${midY}`);
    }
    const last = points[points.length - 1];
    const penultimate = points[points.length - 2];
    const ctrlX = last.x + (penultimate.x - last.x) * tension;
    const ctrlY = last.y + (penultimate.y - last.y) * tension;
    commands.push(`Q ${ctrlX} ${ctrlY} ${last.x} ${last.y}`);
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
    const areaTop = 50;
    const areaBottom = 115;
    const areaHeight = areaBottom - areaTop;
    const areaScale = areaHeight;
    const yearTicks: number[] = [];
    for (let year = Math.ceil(DATA_MIN_YEAR); year <= Math.floor(DATA_MAX_YEAR); year++) {
      yearTicks.push(year);
    }

    const brownBsStartYear = DATA_MIN_YEAR; // start of timeline
    const brownBsEndYear = 2016 + 5 / 12; // June 2016, when Google internship starts
    const fadeInStartYear = 2015 + 8 / 12; // when left-side opacity fade starts becoming visible
    const fadeInEndYear = brownBsEndYear; // fade finishes by the time internship begins
    const fadeOutStartYear = 2026; // right-side fade-out begins
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
      const isBrownBs = year >= brownBsStartYear && year < brownBsEndYear;
      const isBrownMasters = year >= brownMastersStartYear && year < brownMastersEndYear;
      const isUw = year >= uwStartYear;
      return isBrownBs || isBrownMasters ? 1 : isUw ? 0.8 : 0;
    };

    const googleLabelY = (_year: number): number => areaBottom + 14;
    const educationLabelY = (_year: number): number => areaTop - 4;

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
          favorites
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

          <defs>
            <linearGradient
              id='area-edge-fade'
              gradientUnits='userSpaceOnUse'
              x1=${this.xForYear(DATA_MIN_YEAR)}
              y1='0'
              x2=${this.xForYear(DATA_MAX_YEAR)}
              y2='0'
            >
              <stop offset=${(fadeInStartYear - DATA_MIN_YEAR) / (DATA_MAX_YEAR - DATA_MIN_YEAR)} stop-color='black'></stop>
              <stop offset=${(fadeInEndYear - DATA_MIN_YEAR) / (DATA_MAX_YEAR - DATA_MIN_YEAR)} stop-color='white'></stop>
              <stop offset=${(fadeOutStartYear - DATA_MIN_YEAR) / (DATA_MAX_YEAR - DATA_MIN_YEAR)} stop-color='white'></stop>
              <stop offset='1' stop-color='black'></stop>
            </linearGradient>
            <mask
              id='area-edge-fade-mask'
              maskUnits='userSpaceOnUse'
              x='0'
              y='0'
              width=${this.timelineWidth}
              height=${TIMELINE_HEIGHT}
            >
              <rect
                x='0'
                y='0'
                width=${this.timelineWidth}
                height=${TIMELINE_HEIGHT}
                fill='url(#area-edge-fade)'
              ></rect>
            </mask>
          </defs>

          <rect x='0' y='0' width='${this.timelineWidth}' height='${TIMELINE_HEIGHT}' fill='#ffffff'></rect>

          <g mask='url(#area-edge-fade-mask)'>
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
          </g>

          ${yearTicks.map(
            (year) => svg`
              <line
                x1=${this.xForYear(year)}
                y1=${areaBottom + 30}
                x2=${this.xForYear(year)}
                y2=${TIMELINE_LANE_TOP + (LANE_ORDER.length - 1) * TIMELINE_LANE_SPACING + 50}
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
            this.xForYear((brownBsStartYear + brownBsEndYear) / 2),
            educationLabelY((brownBsStartYear + brownBsEndYear) / 2),
            'Brown',
            'BS'
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
                stroke-opacity='0.1'
                stroke-width='3.2'
              ></line>
              <text
                class='timeline-lane-label'
                x=${TIMELINE_MARGIN_LEFT - 12}
                y=${TIMELINE_LANE_TOP + laneIndex * TIMELINE_LANE_SPACING + 4}
                text-anchor='end'
              >
                ${LANE_LABELS[lane].toUpperCase()}
              </text>
            `
          )}

          ${persistentLabels.map((label) => {
            const scale = this.scaleForItem(label.item, timelineItems);
            const baseRadius = this.importanceRadiusForItem(label.item) * scale;
            const ringRadius = baseRadius + 3;
            const cx = label.item.x;
            const cy = label.item.laneY;
            const y1 =
              label.direction === 'down' ? cy + ringRadius : label.y;
            const y2 =
              label.direction === 'down'
                ? label.y + label.height
                : cy - ringRadius;
            const lineClass =
              label.direction === 'down'
                ? 'timeline-persistent-line down'
                : 'timeline-persistent-line';
            const sweepFlag = label.direction === 'down' ? 0 : 1;
            const arcPath = `M ${cx - ringRadius} ${cy} A ${ringRadius} ${ringRadius} 0 0 ${sweepFlag} ${cx + ringRadius} ${cy}`;
            return svg`
              <line
                class=${lineClass}
                x1=${cx}
                y1=${y1}
                x2=${cx}
                y2=${y2}
                stroke=${label.item.dotColor}
              ></line>
              <path
                class=${lineClass}
                d=${arcPath}
                fill='none'
                stroke=${label.item.dotColor}
              ></path>
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
                    stroke='none'
                    stroke-width='0'
                  >
                    <title>${item.project.name}</title>
                  </circle>
                </g>
              </g>
            `
          )}

          ${persistentLabels.map((label) => {
            const textAnchor = label.side === 'right' ? 'start' : 'end';
            const textX = label.side === 'right' ? label.x + 3 : label.x - 3;
            return svg`
            <g class='timeline-persistent-label'>
              ${label.lines.map(
                (line, lineIndex) => svg`
                  <text
                    class='timeline-persistent-label-text'
                    x=${textX}
                    y=${label.y + 2 + 8 + lineIndex * 11}
                    text-anchor=${textAnchor}
                  >
                    ${line}
                  </text>
                `
              )}
            </g>
          `;
          })}
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
