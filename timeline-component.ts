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
/** Horizontal push for hover cards so they sit clear of the stem line (<text> is ~3px; this is a few lines more). */
const HOVER_CARD_INSET_FROM_LINE_PX = 1;
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
  'real_people_using_ai',
  'art',
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

const NETWORK_BLOBS_ENABLED = false;

type ProjectNetwork = {
  id: string;
  color: string;
  mode: 'spokes' | 'complete';
  center?: string;
  members: string[];
  arcOffset: number;
};

const PROJECT_NETWORKS: ProjectNetwork[] = [
  {
    id: 'kyd',
    color: '#2aa4a4',
    mode: 'spokes',
    center: 'Know Your Data',
    members: [
      'Probing pretraining data',
      'Data similarity is not enough to explain language model performance',
      'SoUnD: analyzing social representation in unstructured data',
      "A pretrainer's guide to training data",
      'PALM + PALM2: RAI data analysis',
    ],
    arcOffset: -30,
  },
  {
    id: 'embeddings',
    color: '#8e6bc9',
    mode: 'complete',
    members: [
      'Embedding projector',
      'Visualizing and understanding the geometry of BERT',
      'Waterfall of meaning',
      'An interpretability illusion for BERT',
      'Probing pretraining data',
      "Who's asking? User personas and the mechanics of latent misalignment",
      'Data similarity is not enough to explain language model performance',
    ],
    arcOffset: -60,
  },
  {
    id: 'tools',
    color: '#d48c42',
    mode: 'complete',
    members: [
      'Embedding projector',
      'SMILY: HITL tool for pathologists',
      'Language interpretability tool',
      'Know Your Data',
      'Moodboard search',
      'Linguistic Lens',
      'Automatic Histograms',
      'LLM Comparator',
    ],
    arcOffset: 45,
  },
];

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

  @state()
  private hoveredCardHeight = 0;

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

  override updated(changed: Map<string, unknown>) {
    if (changed.has('hoveredProjectName')) {
      if (this.hoveredProjectName) {
        const card = this.querySelector(
          '.timeline-hover-card.hovered'
        ) as HTMLElement | null;
        if (card) {
          this.hoveredCardHeight = card.offsetHeight;
        }
      } else {
        this.hoveredCardHeight = 0;
      }
    }
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
      const lanesMidY = (lanesTop + lanesBottom) / 2;
      const initialDir: 'up' | 'down' =
        item.laneY <= lanesMidY ? 'up' : 'down';
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

    // Post-pass: if a label's text rect overlaps another label's vertical
    // line, try flipping the label to the opposite side of its own line.
    for (let i = 0; i < placed.length; i++) {
      const label = placed[i];
      const rect = occupied[i];
      const overlapsOtherLine = occupiedLines.some(
        (line, j) =>
          j !== i &&
          line.x > rect.x &&
          line.x < rect.x + rect.width &&
          line.y1 < rect.y + rect.height &&
          line.y2 > rect.y
      );
      if (!overlapsOtherLine) continue;

      const newSide: 'left' | 'right' =
        label.side === 'right' ? 'left' : 'right';
      const newRectX =
        newSide === 'right' ? label.item.x : label.item.x - label.width;
      const newRect = {
        x: newRectX,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
      const newInflated = {
        x: newRect.x - overlapPad,
        y: newRect.y - overlapPad,
        width: newRect.width + overlapPad * 2,
        height: newRect.height + overlapPad * 2,
      };
      const overlapRect = occupied.some(
        (r, j) => j !== i && this.rectsOverlap(newInflated, r)
      );
      if (overlapRect) continue;
      const newOverlapsLine = occupiedLines.some(
        (line, j) =>
          j !== i &&
          line.x > newRect.x &&
          line.x < newRect.x + newRect.width &&
          line.y1 < newRect.y + newRect.height &&
          line.y2 > newRect.y
      );
      if (newOverlapsLine) continue;

      occupied[i] = newRect;
      placed[i] = { ...label, side: newSide };
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

    const items: TimelineItem[] = projects.map((project) => {
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

    // Jitter items that share (nearly) the same position so their persistent
    // label lines don't sit exactly on top of each other.
    const collisionRadiusX = 5;
    const collisionRadiusY = 5;
    const jitterStep = 6;
    const buckets = new Map<string, TimelineItem[]>();
    for (const item of items) {
      const key = `${Math.round(item.x / collisionRadiusX)}|${Math.round(
        item.laneY / collisionRadiusY
      )}`;
      const bucket = buckets.get(key);
      if (bucket) {
        bucket.push(item);
      } else {
        buckets.set(key, [item]);
      }
    }
    Array.from(buckets.values()).forEach((bucket) => {
      if (bucket.length < 2) return;
      bucket.sort((a, b) =>
        a.project.name.localeCompare(b.project.name)
      );
      const mid = (bucket.length - 1) / 2;
      bucket.forEach((item, index) => {
        item.x += (index - mid) * jitterStep;
      });
    });

    return items;
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

  override render() {
    const timelineItems = this.computeTimelineItems();
    const persistentLabels = this.layoutPersistentLabels(timelineItems);
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

    const yGoogleTopAt = (year: number) =>
      areaBottom - googleFractionAtYear(year) * areaScale;
    const yEduTopAt = (year: number) =>
      yGoogleTopAt(year) - educationFractionAtYear(year) * areaScale;
    const googleBandCenterY = (year: number) =>
      (areaBottom + yGoogleTopAt(year)) / 2;
    const eduBandCenterY = (year: number) =>
      (yEduTopAt(year) + yGoogleTopAt(year)) / 2;
    /** Bottom of an education sliver (just above the Google band) at this year. */
    const eduBandTagY = (year: number) => yGoogleTopAt(year) - 2;
    // Google role sublabels sit on the bottom of the Google (employment) bar; x = period center.
    const googleSubY = areaBottom - 3;
    const xIntern = this.xForYear(
      (googleInternStartYear + googleInternEndYear) / 2
    );
    const xBrain = this.xForYear((googleBrainStartYear + 2020) / 2);
    const xRai = this.xForYear((2020 + googleDropYear) / 2);
    const xDm = this.xForYear((googleDropYear + DATA_MAX_YEAR) / 2);

    const googleSpanMid = (googleInternStartYear + DATA_MAX_YEAR) / 2;
    const xGoogle = this.xForYear(googleSpanMid);
    const yGoogleHero = googleBandCenterY(googleSpanMid);
    const wBs = (brownBsStartYear + brownBsEndYear) / 2;
    const wMs = (brownMastersStartYear + brownMastersEndYear) / 2;
    const wUw = (uwStartYear + DATA_MAX_YEAR) / 2;

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
            <filter id='network-blob' x='-20%' y='-50%' width='140%' height='200%'>
              <feGaussianBlur in='SourceGraphic' stdDeviation='14'></feGaussianBlur>
              <feColorMatrix
                type='matrix'
                values='1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 14 -6'
              ></feColorMatrix>
            </filter>
          </defs>

          <rect x='0' y='0' width='${this.timelineWidth}' height='${TIMELINE_HEIGHT}' fill='#ffffff'></rect>

          <g mask='url(#area-edge-fade-mask)'>
            <path
              d=${googlePath}
              fill='#7289a8'
              fill-opacity='0.8'
              stroke='#ffffff'
              stroke-opacity='0.95'
              stroke-width='2.5'
              stroke-linejoin='round'
            ></path>
            <path
              d=${educationPath}
              fill='#7289a8'
              fill-opacity='0.4'
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

          ${svg`
            <g class='timeline-area-annotations'>
              <text
                class='timeline-area-hero'
                x=${xGoogle}
                y=${yGoogleHero}
                text-anchor='middle'
                dominant-baseline='middle'
              >
                Google
              </text>
              <text
                class='timeline-area-subln'
                x=${xIntern}
                y=${googleSubY}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                intern
              </text>
              <text
                class='timeline-area-subln'
                x=${xBrain}
                y=${googleSubY}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                Brain
              </text>
              <text
                class='timeline-area-subln'
                x=${xRai}
                y=${googleSubY}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                Responsible AI
              </text>
              <text
                class='timeline-area-subln'
                x=${xDm}
                y=${googleSubY}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                DeepMind
              </text>
              <text
                class='timeline-area-tag'
                x=${this.xForYear(wBs)}
                y=${eduBandTagY(wBs)}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                BS
              </text>
              <text
                class='timeline-area-hero'
                x=${this.xForYear(wMs)}
                y=${eduBandCenterY(wMs)}
                text-anchor='middle'
                dominant-baseline='middle'
              >
                Brown
              </text>
              <text
                class='timeline-area-tag'
                x=${this.xForYear(wMs)}
                y=${eduBandTagY(wMs)}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                MS
              </text>
              <text
                class='timeline-area-hero'
                x=${this.xForYear(wUw)}
                y=${eduBandCenterY(wUw)}
                text-anchor='middle'
                dominant-baseline='middle'
              >
                UW
              </text>
              <text
                class='timeline-area-tag'
                x=${this.xForYear(wUw)}
                y=${eduBandTagY(wUw)}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                phD
              </text>
            </g>
          `}

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

          ${(() => {
            const byName = new Map(
              timelineItems.map((item) => [item.project.name, item])
            );
            const computeMst = (
              members: TimelineItem[]
            ): Array<[TimelineItem, TimelineItem]> => {
              if (members.length < 2) return [];
              const dist = (a: TimelineItem, b: TimelineItem) =>
                Math.hypot(a.x - b.x, a.laneY - b.laneY);
              const candidates: Array<[number, TimelineItem, TimelineItem]> =
                [];
              for (let i = 0; i < members.length; i++) {
                for (let j = i + 1; j < members.length; j++) {
                  candidates.push([
                    dist(members[i], members[j]),
                    members[i],
                    members[j],
                  ]);
                }
              }
              candidates.sort((a, b) => a[0] - b[0]);
              const parent = new Map<TimelineItem, TimelineItem>();
              for (const m of members) parent.set(m, m);
              const find = (x: TimelineItem): TimelineItem => {
                let r = x;
                while (parent.get(r) !== r) r = parent.get(r)!;
                let cur = x;
                while (parent.get(cur) !== r) {
                  const next = parent.get(cur)!;
                  parent.set(cur, r);
                  cur = next;
                }
                return r;
              };
              const out: Array<[TimelineItem, TimelineItem]> = [];
              for (const [, a, b] of candidates) {
                const ra = find(a);
                const rb = find(b);
                if (ra !== rb) {
                  parent.set(ra, rb);
                  out.push([a, b]);
                  if (out.length === members.length - 1) break;
                }
              }
              return out;
            };
            const computeEdges = (
              network: ProjectNetwork,
              members: TimelineItem[]
            ): Array<[TimelineItem, TimelineItem]> => {
              if (network.mode === 'spokes' && network.center) {
                const center = byName.get(network.center);
                const edges: Array<[TimelineItem, TimelineItem]> = [];
                if (center) {
                  for (const member of members) {
                    if (member !== center) {
                      edges.push([center, member]);
                    }
                  }
                }
                return edges;
              }
              return computeMst(members);
            };
            // For each edge, compute a quadratic-bezier control point that
            // pushes the curve away from non-member dots that the straight
            // line would otherwise pass too close to.
            const routeEdge = (
              a: TimelineItem,
              b: TimelineItem,
              obstacles: TimelineItem[]
            ): { cx: number; cy: number } => {
              const ax = a.x;
              const ay = a.laneY;
              const bx = b.x;
              const by = b.laneY;
              const mx = (ax + bx) / 2;
              const my = (ay + by) / 2;
              const dx = bx - ax;
              const dy = by - ay;
              const len = Math.hypot(dx, dy) || 1;
              const px = -dy / len;
              const py = dx / len;
              let signedDisp = 0;
              for (const obs of obstacles) {
                const ox = obs.x;
                const oy = obs.laneY;
                const t = ((ox - ax) * dx + (oy - ay) * dy) / (len * len);
                if (t < 0.05 || t > 0.95) continue;
                const projX = ax + t * dx;
                const projY = ay + t * dy;
                const distLine = Math.hypot(ox - projX, oy - projY);
                const obsRadius = this.importanceRadiusForItem(obs) + 18;
                if (distLine > obsRadius) continue;
                const obsPerp = (ox - ax) * px + (oy - ay) * py;
                const sideSign = obsPerp >= 0 ? 1 : -1;
                const strength = (obsRadius - distLine) * 0.7;
                signedDisp -= sideSign * strength;
              }
              const maxDisp = Math.min(len * 0.35, 60);
              if (signedDisp > maxDisp) signedDisp = maxDisp;
              if (signedDisp < -maxDisp) signedDisp = -maxDisp;
              return {
                cx: mx + 2 * signedDisp * px,
                cy: my + 2 * signedDisp * py,
              };
            };
            const blobNetworks = PROJECT_NETWORKS.filter(
              (n) => n.id !== 'kyd'
            );
            const lineNetworks = PROJECT_NETWORKS.filter(
              (n) => n.id === 'kyd'
            );
            return svg`
              ${NETWORK_BLOBS_ENABLED
                ? blobNetworks.map((network) => {
                    const members = network.members
                      .map((name) => byName.get(name))
                      .filter(
                        (item): item is TimelineItem => item !== undefined
                      );
                    if (members.length === 0) {
                      return null;
                    }
                    const memberSet = new Set(members);
                    const obstacles = timelineItems.filter(
                      (item) => !memberSet.has(item)
                    );
                    const edges = computeEdges(network, members);
                    return svg`
                      <g
                        class='timeline-network-blob'
                        filter='url(#network-blob)'
                        opacity='0.38'
                      >
                        ${edges.map(([a, b]) => {
                          const { cx, cy } = routeEdge(a, b, obstacles);
                          const d = `M ${a.x} ${a.laneY} Q ${cx} ${cy} ${b.x} ${b.laneY}`;
                          return svg`
                            <path
                              d=${d}
                              stroke=${network.color}
                              stroke-width='28'
                              stroke-linecap='round'
                              fill='none'
                            ></path>
                          `;
                        })}
                        ${members.map(
                          (m) => svg`
                            <circle
                              cx=${m.x}
                              cy=${m.laneY}
                              r='26'
                              fill=${network.color}
                            ></circle>
                          `
                        )}
                      </g>
                    `;
                  })
                : null}
              ${lineNetworks.map((network) => {
                const members = network.members
                  .map((name) => byName.get(name))
                  .filter(
                    (item): item is TimelineItem => item !== undefined
                  );
                if (members.length === 0) {
                  return null;
                }
                const edges = computeEdges(network, members);
                return svg`
                  <g class='timeline-network-lines'>
                    ${edges.map(
                      ([a, b]) => svg`
                        <line
                          x1=${a.x}
                          y1=${a.laneY}
                          x2=${b.x}
                          y2=${b.laneY}
                          stroke='#888'
                          stroke-width='1'
                          stroke-opacity='0.55'
                        ></line>
                      `
                    )}
                  </g>
                `;
              })}
            `;
          })()}

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
                    fill-opacity=${item.project.name === this.hoveredProjectName
                      ? Math.min(1, this.itemOpacity(item) + 0.32)
                      : this.itemOpacity(item)}
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
            const scale = this.scaleForItem(label.item, timelineItems);
            const baseRadius = this.importanceRadiusForItem(label.item) * scale;
            const ringRadius = baseRadius + 3;
            const cx = label.item.x;
            const cy = label.item.laneY;
            const isHovered =
              label.item.project.name === this.hoveredProjectName;
            const compactBottom = label.y + label.height;
            const expandedBottom = isHovered
              ? Math.max(
                  compactBottom,
                  label.y + this.hoveredCardHeight
                )
              : compactBottom;
            const compactTop = label.y;
            const expandedTop = isHovered
              ? Math.min(compactTop, compactBottom - this.hoveredCardHeight)
              : compactTop;
            const y1 =
              label.direction === 'down' ? cy + ringRadius : expandedTop;
            const y2 =
              label.direction === 'down'
                ? expandedBottom
                : cy - ringRadius;
            const lineClass = [
              'timeline-persistent-line',
              label.direction === 'down' ? 'down' : '',
              isHovered ? 'hovered' : '',
            ]
              .filter(Boolean)
              .join(' ');
            const ringClass = [
              'timeline-persistent-ring',
              label.direction,
              label.direction === 'down' ? 'down' : '',
              isHovered ? 'hovered' : '',
            ]
              .filter(Boolean)
              .join(' ');
            // Solid half-arc (stem side) always. On hover: full <circle> on top, same r, dash-in.
            const lineSideSweep = label.direction === 'down' ? 0 : 1;
            const halfD = `M ${cx - ringRadius} ${cy} A ${ringRadius} ${ringRadius} 0 0 ${lineSideSweep} ${cx + ringRadius} ${cy}`;
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
                class=${ringClass}
                d=${halfD}
                fill='none'
                stroke=${label.item.dotColor}
                stroke-linecap='round'
                stroke-linejoin='round'
              ></path>
              ${isHovered
                ? svg`
              <circle
                class=${[ringClass, 'timeline-persistent-ring-full'].join(' ')}
                cx=${cx}
                cy=${cy}
                r=${ringRadius}
                fill='none'
                stroke=${label.item.dotColor}
                pathLength='100'
                stroke-linecap='round'
              ></circle>
            `
                : null}
            `;
          })}

          ${persistentLabels.map((label) => {
            const textAnchor = label.side === 'right' ? 'start' : 'end';
            const textX = label.side === 'right' ? label.x + 3 : label.x - 3;
            const isHovered =
              label.item.project.name === this.hoveredProjectName;
            const groupClass = isHovered
              ? 'timeline-persistent-label hovered'
              : 'timeline-persistent-label';
            return svg`
            <g
              class=${groupClass}
              @mouseenter=${() => {
                this.hoveredProjectName = label.item.project.name;
              }}
              @mouseleave=${() => {
                this.hoveredProjectName = null;
              }}
              @click=${() => {
                const url = this.preferredProjectLink(label.item.project);
                if (url) {
                  window.open(url, '_blank', 'noopener');
                }
              }}
            >
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
        ${persistentLabels.map((label) => {
          const isHovered =
            label.item.project.name === this.hoveredProjectName;
          const kind = label.item.isPublication ? 'paper' : 'project';
          const venue = label.item.project.venue;
          const isRight = label.side === 'right';
          const isUp = label.direction === 'up';
          const compactTop = label.y + 2;
          const compactBottom =
            compactTop + Math.max(1, label.lines.length) * 11;
          const positionParts: string[] = [];
          const inx = HOVER_CARD_INSET_FROM_LINE_PX;
          if (isRight) {
            positionParts.push(`left:${label.x + inx}px`);
          } else {
            positionParts.push(
              `right:calc(100% - ${Math.max(0, label.x - inx)}px)`
            );
          }
          if (isUp) {
            positionParts.push(
              `bottom:calc(100% - ${compactBottom}px)`
            );
          } else {
            positionParts.push(`top:${compactTop - 2}px`);
          }
          positionParts.push(
            `transform-origin:${isRight ? 'left' : 'right'} ${
              isUp ? 'bottom' : 'top'
            }`
          );
          positionParts.push(
            `text-align:${isRight ? 'left' : 'right'}`
          );
          const sideClass = isRight ? 'anchor-right' : 'anchor-left';
          const dirClass = isUp ? 'grow-up' : 'grow-down';
          return html`
            <div
              class=${`timeline-hover-card ${sideClass} ${dirClass} ${
                isHovered ? 'hovered' : ''
              }`}
              style=${positionParts.join(';')}
              @mouseenter=${() => {
                this.hoveredProjectName = label.item.project.name;
              }}
              @mouseleave=${() => {
                this.hoveredProjectName = null;
              }}
              @click=${() => {
                const url = this.preferredProjectLink(label.item.project);
                if (url) {
                  window.open(url, '_blank', 'noopener');
                }
              }}
            >
              <div class='timeline-hover-card-body'>
                <div class='timeline-hover-card-title'>
                  ${label.item.project.name}
                </div>
                <div class='timeline-hover-card-meta'>
                  <span class=${`timeline-hover-card-chip ${kind}`}
                    >${kind}</span
                  >
                  ${venue
                    ? html`<span class='timeline-hover-card-venue'
                        >${venue}</span
                      >`
                    : null}
                </div>
                <div class='timeline-hover-card-description'>
                  ${label.item.project.description}
                </div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
