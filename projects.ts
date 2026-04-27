import { TemplateResult, html } from "lit";

/** Vertical lane on the timeline (color + y position). */
export const PROJECT_CATEGORY_ORDER = [
  "research",
  "tools",
  "creative_work",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORY_ORDER)[number];

/** Cross-cutting project networks (chips + hover highlight), not y-position. */
export const PROJECT_NETWORK_ORDER = [
  "llms_and_data",
  "visualization",
  "interpretability",
  "experts_using_ai",
  "kyd",
  "embeddings",
] as const;

export type ProjectNetwork = (typeof PROJECT_NETWORK_ORDER)[number];

const categoryOrderIndex = new Map(
  PROJECT_CATEGORY_ORDER.map((t, i) => [t, i] as const)
);

const networkOrderIndex = new Map(
  PROJECT_NETWORK_ORDER.map((t, i) => [t, i] as const)
);

export function sortProjectCategories(
  categories: ProjectCategory[]
): ProjectCategory[] {
  return [...categories].sort(
    (a, b) =>
      (categoryOrderIndex.get(a) ?? 0) - (categoryOrderIndex.get(b) ?? 0)
  );
}

export function sortProjectNetworks(networks: ProjectNetwork[]): ProjectNetwork[] {
  return [...networks].sort(
    (a, b) => (networkOrderIndex.get(a) ?? 0) - (networkOrderIndex.get(b) ?? 0)
  );
}

export const PROJECT_NETWORK_LABELS: Record<ProjectNetwork, string> = {
  llms_and_data: "LLMs and data",
  visualization: "Visualization",
  interpretability: "Interpretability",
  experts_using_ai: "Applications",
  kyd: "KYD",
  embeddings: "Embeddings",
};

type Link = {
  name: string;
  link: string;
};

/** Extra timeline-only rows for one project (main project cards stay a single entry). */
export type ProjectTimelineVariant = {
  /** Stable id for hover/highlight (unique across all timeline items). */
  key: string;
  /** Text on the timeline connector labels (may be shorter than the card title). */
  labelTitle: string;
  cardTitle: string;
  description: string;
  /** Index into `project.links` for this row’s paper URL and date inference. */
  linkIndex: number;
  /** `PROJECT_TIMELINE_METADATA` entry for citation dot sizing. */
  timelineMetaKey: string;
};

export type Project = {
  name: string;
  description: string | TemplateResult;
  image?: string;
  links: Link[];
  dates?: string;
  role?: string;
  venue?: string;
  /** Lane placement and dot color on the timeline. */
  categories: ProjectCategory[];
  /** Thematic networks (chip filter / highlight). */
  networks: ProjectNetwork[];
  /** When true, excluded from the main Projects list (still in data for exports / tooling). */
  hide_in_main_list?: boolean;
  /**
   * When set, the timeline renders one dot/label per variant instead of one for the
   * project; the projects list and card copy stay unchanged.
   */
  timelineVariants?: ProjectTimelineVariant[];
};

export type ProjectTimelineMetadata = {
  year: number;
  month?: number;
  citations: number;
  aliases?: string[];
};

export const PROJECT_TIMELINE_METADATA: Record<string, ProjectTimelineMetadata> = {
  "palm scaling language modeling with pathways": { year: 2023, citations: 2500, aliases: ["palm palm2 rai data analysis"] },
  "palm 2 technical report": { year: 2023, citations: 1200, aliases: ["palm + palm2 rai data analysis"] },
  "visualizing and understanding the geometry of bert": { year: 2019, month: 12, citations: 650 },
  "embedding projector": { year: 2016, month: 11, citations: 2100 },
  "language interpretability tool": { year: 2020, month: 11, citations: 420 },
  "a gentle introduction to graph neural networks": { year: 2021, month: 9, citations: 520 },
  "wordcraft story writing with large language models": { year: 2022, citations: 180, aliases: ["wordcraft writers workshop"] },
  "a recipe for arbitrary text style transfer with large language models": { year: 2021, month: 11, citations: 110, aliases: ["a recipe for arbitrary text style transfer with llms"] },
  "a pretrainer s guide to training data measuring the effects of data age domain coverage quality toxicity": { year: 2024, month: 7, citations: 65, aliases: ["a pretrainer s guide to training data"] },
  "llm comparator interactive analysis of side by side evaluation of large language models": { year: 2025, month: 1, citations: 55, aliases: ["llm comparator"] },
  "automatic histograms leveraging language models for text dataset exploration": { year: 2024, month: 5, citations: 18, aliases: ["automatic histograms"] },
  "data similarity is not enough to explain language model performance": { year: 2023, month: 12, citations: 28 },
  "an interpretability illusion for bert": { year: 2021, citations: 95 },
  "evaluating attribution for graph neural networks": { year: 2020, month: 12, citations: 135 },
  "so und framework analyzing so cial representation in un structured d ata": {
    year: 2024,
    citations: 15,
    aliases: [
      "sound analyzing social representation in unstructured data",
      "developing a conceptual framework for analyzing people in unstructured data",
    ],
  },
  "understanding the dataset practitioners behind large language models": { year: 2024, citations: 12, aliases: ["understanding the dataset practitioners behind large language model development"] },
  "llm adoption in industry data curation practices": {
    year: 2024,
    citations: 16,
    aliases: [
      "the evolution of llm adoption in industry data curation practices",
      "llm adoption in data curation workflows industry practices and insights",
      "llm adoption in data curation workflows: industry practices and insights",
    ],
  },
  "who s asking user personas and the mechanics of latent misalignment": { year: 2024, citations: 10, aliases: ["who s asking user personas and the mechanics of latent misalignment"] },
  "rdoflow automatically assessing under specified statistical analyses in hci": { year: 2026, month: 7, citations: 2, aliases: ["rdoflow automatically assessing under specified statistical analyses in hci"] },
  "the case for a single model that can both generate continuations and fill in the blank": { year: 2022, citations: 90 },
  "smily": { year: 2019, citations: 240, aliases: ["smily hitl tool for pathologists"] },
  "neural networks trained on natural scenes exhibit gestalt closure": { year: 2021, citations: 95, aliases: ["nns and gestalt"] },
  "developing a conceptual framework for analyzing people in unstructured data": { year: 2023, month: 10, citations: 10 },
  "know your data": { year: 2021, month: 5, citations: 10 },
  "moodboard search": { year: 2023, month: 1, citations: 10, aliases: ["mood board search enabling ai powered creative expression"] },
  "probing pretraining data": { year: 2024, month: 7, citations: 10, aliases: ["probing heterogeneous pretraining datasets with small curated datasets"] },
  "reverse rorschach": { year: 2023, month: 6, citations: 10 },
  "superlative instruments": { year: 2019, month: 11, citations: 10 },
  "improving solar panel efficiency using reinforcement learning": {
    year: 2017,
    citations: 10,
    aliases: [
      "bandit-based solar panel control",
      "toward improving solar panel efficiency using reinforcement learning",
      "solar panel tracking and control reinforcement learning",
    ],
  },
  "toymaker": { year: 2017, month: 11, citations: 10 },
  "waterfall of meaning": { year: 2019, month: 6, citations: 10 },
};

export const projects: Project[] = [
  {
    name: "Visualizing Distributions of Language Model Generations",
    description:
      "Visualizations to explore, compare, and reason about distributions of language model outputs for a single input.",
    links: [
      { link: "https://arxiv.org/pdf/2604.18724", name: "paper" },
      {
        link: "https://emilyreif.com/llm-consistency-vis/interactive_article",
        name: "article",
      },
      { link: "https://emilyreif.com/llm-consistency-vis/", name: "demo" },
    ],
    image: "llm_consistency_vis.png",
    categories: ["research", "tools"],
    networks: ["llms_and_data", "visualization", "interpretability"],
  },
  {
    name: "PALM + PALM2: RAI data analysis",
    description: "Responsible AI analysis on PaLM and PaLM2 pre-training data",
    links: [
      { link: "https://arxiv.org/abs/2204.02311", name: "PaLM paper" },
      { link: "https://arxiv.org/abs/2305.10403", name: "PaLM2 technical report" },
    ],
    image: "topics.png",
    categories: ["research"],
    networks: ["llms_and_data", "kyd"],
    timelineVariants: [
      {
        key: "palm-rai-data",
        labelTitle: "PaLM RAI data",
        cardTitle: "PaLM: RAI data analysis",
        description: "Responsible AI analysis on PaLM pre-training data",
        linkIndex: 0,
        timelineMetaKey: "palm scaling language modeling with pathways",
      },
      {
        key: "palm2-rai-data",
        labelTitle: "PaLM 2 RAI data",
        cardTitle: "PaLM 2: RAI data analysis",
        description: "Responsible AI analysis on PaLM 2 pre-training data",
        linkIndex: 1,
        timelineMetaKey: "palm 2 technical report",
      },
    ],
  },
  {
    name: "A pretrainer's guide to training data",
    description:
      "What happens when you systematically vary time, quality, toxicity, and domain of pre-training data for LLMs?",
    links: [
      { link: "https://aclanthology.org/2024.naacl-long.179/", name: "paper" },
    ],
    image: "pretraining.jpg",
    categories: ["research"],
    networks: ["llms_and_data", "kyd"],
  },
  {
    name: "A recipe for arbitrary text style transfer with LLMs",
    description:
      "Using LLMs for arbitrary text style transfer, with a natural language interface",
    links: [
      { link: "https://arxiv.org/abs/2109.03910", name: "paper" },
      {
        link: "https://storage.googleapis.com/style-transfer-paper-123/index.html",
        name: "styled text",
      },
    ],
    image: "style_transfer.png",
    categories: ["research"],
    networks: ["llms_and_data"],
  },
  {
    name: "A gentle introduction to graph neural networks",
    description: "Visualization-based distill.pub article on understanding GNNs",
    links: [{ link: "https://distill.pub/2021/gnn-intro", name: "paper" }],
    image: "gnn.png",
    categories: ["research"],
    networks: ["visualization"],
  },
  {
    name: "Visualizing and understanding the geometry of BERT",
    description: "How are syntax and semantics are encoded in transformers?",
    links: [
      {
        link: "https://proceedings.neurips.cc/paper_files/paper/2019/hash/159c1ffe5b61b41b3c4d8f4c2150f6c4-Abstract.html",
        name: "Paper",
      },
      {
        link: "https://pair-code.github.io/interpretability/context-atlas/blogpost/",
        name: "tool",
      },
      {
        link: "https://github.com/PAIR-code/interpretability/tree/master/context-atlas",
        name: "code",
      },
    ],
    image: "bert.png",
    categories: ["research"],
    networks: ["llms_and_data", "visualization", "interpretability", "embeddings"],
  },
  {
    name: "Waterfall of meaning",
    description:
      "Art piece exploring the internals of LMs. Shown with the Barbican AI - More Than Human exhibit in  London, China, and Spain",
    links: [
      {
        link: "https://artsandculture.google.com/story/xgVxw84BWGgnLg",
        name: "article",
      },
      {
        link: "https://storage.googleapis.com/waterfall-of-meaning/demo/standalone.html",
        name: "online piece",
      },
      { link: "https://github.com/PAIR-code/waterfall-of-meaning", name: "code" },
    ],
    image: "waterfall_of_meaning.png",
    categories: ["creative_work"],
    networks: [
      "llms_and_data",
      "visualization",
      "interpretability",
      "embeddings",
    ],
  },
  {
    name: "Linguistic Lens",
    description:
      "Interactive visualization tool for understanding grammatical diversity in LLM-generated text",
    links: [
      { link: "https://arxiv.org/pdf/2305.11364.pdf", name: "paper" },
      {
        link: "https://storage.googleapis.com/data-synth-trees/demo/index.html",
        name: "Tool",
      },
      {
        link: "https://github.com/PAIR-code/interpretability/tree/master/data-synth-syntax",
        name: "code",
      },
    ],
    image: "linguisticlens.png",
    categories: ["research", "tools"],
    networks: ["llms_and_data", "visualization"],
  },
  {
    name: "Know Your Data",
    description: html`Tool for understanding large datasets using data augmentation and visualization <br><br> (I led the text version, which was internal to Google)`,
    links: [{ link: "https://knowyourdata.withgoogle.com/", name: "KnowYourData" }],
    image: "knowyourdata.png",
    categories: ["tools"],
    networks: ["llms_and_data", "visualization", "kyd"],
  },
  {
    name: "LLM Comparator",
    description: "Interactive side-by-side comparison of llm-generated datasets",
    links: [
      {
        link: "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10670495",
        name: "paper",
      },
    ],
    image: "llm_comp.png",
    categories: ["research", "tools"],
    networks: ["llms_and_data", "visualization"],
  },
  {
    name: "Embedding projector",
    description: "A tool for interactive visualization and interpretation of embeddings",
    links: [
      { link: "https://arxiv.org/abs/1611.05469", name: "paper" },
      { link: "https://projector.tensorflow.org/", name: "Tool" },
    ],
    image: "embeddingprojector.png",
    categories: ["research", "tools"],
    networks: [
      "llms_and_data",
      "visualization",
      "interpretability",
      "embeddings",
    ],
  },
  {
    name: "Automatic Histograms",
    description:
      "Leveraging language models for text dataset exploration by creating entity-based features on-the-fly.",
    links: [
      {
        link: "https://dl.acm.org/doi/pdf/10.1145/3613905.3650798",
        name: "paper",
      },
    ],
    image: "ah.png",
    categories: ["research", "tools"],
    networks: ["llms_and_data", "visualization", "kyd"],
  },
  {
    name: "Wordcraft writers workshop",
    description:
      "LLM-powered writing assistant for a workshop with professional writers including Ken Lui and Robin Sloan. Illustrated with a generative image model",
    links: [
      { link: "https://wordcraft-writers-workshop.appspot.com/", name: "stories" },
      { link: "https://arxiv.org/abs/2107.07430", name: "paper" },
    ],
    image: "wordcraft.jpg",
    categories: ["research", "tools", "creative_work"],
    networks: ["experts_using_ai"],
  },
  {
    name: "Language interpretability tool",
    description: "Open-source platform for visualizing and understanding language models",
    links: [
      { link: "https://pair-code.github.io/lit/", name: "site" },
      { link: "https://arxiv.org/abs/2008.05122", name: "paper" },
    ],
    image: "lit.png",
    categories: ["research", "tools"],
    networks: ["interpretability"],
  },
  {
    name: "Probing pretraining data",
    description: "Probing heterogeneous pretraining datasets with small curated datasets",
    links: [
      {
        link: "https://gyauney.github.io/papers/probing-heterogeneous-datasets_poster.pdf",
        name: "poster",
      },
    ],
    image: "probing.png",
    categories: ["research"],
    networks: ["llms_and_data", "interpretability", "kyd", "embeddings"],
  },
  {
    name: "NNs and gestalt",
    description: "Neural networks trained on natural scenes exhibit gestalt closure",
    links: [
      {
        link: "https://link.springer.com/article/10.1007/s42113-021-00100-7",
        name: "paper",
      },
    ],
    image: "gestalt.png",
    categories: ["research"],
    networks: ["interpretability"],
  },
  {
    name: "Moodboard search",
    description: html`AI-powered creative expression using subjective concepts and embeddings<br><br>Winner of 2023 interaction award`,
    links: [
      {
        link: "https://awards.ixda.org/projects/mood-board-search-enabling-ai-powered-creative-expression.html",
        name: "site",
      },
    ],
    image: "cavcam.png",
    categories: ["creative_work"],
    networks: ["embeddings", "experts_using_ai"],
  },
  {
    name: "Reverse rorschach",
    description: html`Installation by artist Shahryar Nashat using text-to-image generation model. <br><br>helped with intial brainstorming + proof of concepts, and got the technical pieces working`,
    links: [
      {
        link: "https://sylviakouvali.com/exhibitions/reverse-rorschach/",
        name: "site",
      },
    ],
    image: "rorsch.png",
    categories: ["creative_work"],
    networks: ["experts_using_ai"],
  },
  {
    name: "SMILY: HITL tool for pathologists",
    description:
      "Human-centered tools for coping with imperfect algorithms during medical decision-making",
    links: [
      {
        link: "https://dl.acm.org/doi/abs/10.1145/3290605.3300234",
        name: "paper",
      },
    ],
    image: "smily.png",
    categories: ["research", "tools"],
    networks: ["experts_using_ai", "embeddings"],
  },
  {
    name: "Superlative Instruments",
    description:
      "Synthesizers, not AI research. implemented the website, helped with company ops, etc",
    links: [{ link: "https://playsuperlative.com/", name: "site" }],
    image: "superlative.png",
    categories: ["creative_work"],
    networks: [],
  },
  {
    name: "Evaluating attribution for graph neural networks",
    description:
      "Quantitative evaluation of attribution methods for GNNs with synthetic ground truth",
    links: [
      {
        link: "https://proceedings.neurips.cc/paper_files/paper/2020/hash/417fbbf2e9d5a28a855a11894b2e795a-Abstract.html",
        name: "paper",
      },
    ],
    hide_in_main_list: true,
    categories: ["research"],
    networks: ["interpretability"],
  },
  {
    name: "An interpretability illusion for BERT",
    description:
      "Phenomena that can make BERT-based interpretability tools appear more reliable than they are",
    links: [{ link: "https://arxiv.org/abs/2104.07143", name: "paper" }],
    hide_in_main_list: true,
    categories: ["research"],
    networks: ["interpretability", "embeddings"],
  },
  {
    name: "Who's asking? User personas and the mechanics of latent misalignment",
    description: "How implicit user personas affect model behavior and safety",
    links: [{ link: "https://arxiv.org/abs/2406.12094", name: "paper" }],
    hide_in_main_list: true,
    categories: ["research"],
    networks: ["interpretability", "embeddings"],
  },
  {
    name: "Understanding the dataset practitioners behind large language model development",
    description:
      "Interviews and analysis of data practitioners in LLM development (CHI 2024 extended abstract)",
    links: [{ link: "https://arxiv.org/abs/2402.16611", name: "paper" }],
    hide_in_main_list: true,
    categories: ["research"],
    networks: ["llms_and_data"],
  },
  {
    name: "Data similarity is not enough to explain language model performance",
    description:
      "Similarity to pretraining data often does not track downstream task accuracy",
    links: [
      { link: "https://aclanthology.org/2023.emnlp-main.695/", name: "paper" },
    ],
    hide_in_main_list: true,
    categories: ["research"],
    networks: ["llms_and_data", "interpretability", "embeddings", "kyd"],
  },
  {
    name: "LLM adoption in industry data curation practices",
    description:
      "Survey, interviews, and user studies on how data teams adopt LLMs in curation workflows (2024 paper), plus a CHI 2025 extended abstract with further industry insights.",
    links: [
      { link: "https://arxiv.org/abs/2412.16089", name: "paper (2024)" },
      {
        link: "https://researchr.org/publication/QianLRSHCWCTK25",
        name: "CHI 2025 extended abstract",
      },
    ],
    hide_in_main_list: true,
    categories: ["research"],
    networks: ["llms_and_data", "experts_using_ai", "kyd"],
  },
  {
    name: "SoUnD: analyzing social representation in unstructured data",
    description:
      "Framework for RAI analysis of who and what is represented in foundation model training data (AIES 2024). Builds on an earlier workshop paper developing the conceptual framework.",
    links: [
      { link: "https://arxiv.org/abs/2311.17259", name: "paper (SoUnD)" },
      {
        link: "https://openreview.net/forum?id=QSPHfgw5fp",
        name: "workshop paper (framework)",
      },
    ],
    hide_in_main_list: true,
    categories: ["research"],
    networks: ["llms_and_data", "kyd"],
  },
  {
    name: "RDoFlow: automatically assessing under-specified statistical analyses in HCI",
    description:
      "IUI 2026",
    links: [
      { link: "https://iui.acm.org/2026/accepted-papers/", name: "venue" },
    ],
    hide_in_main_list: true,
    categories: ["research"],
    networks: [],
  },
  {
    name: "The case for a single model that can both generate continuations and fill-in-the-blank",
    description:
      "Pretraining and fine-tuning for both continuation and fit-b (NAACL 2022 findings)",
    links: [
      {
        link: "https://aclanthology.org/2022.findings-naacl.185/",
        name: "paper",
      },
    ],
    hide_in_main_list: true,
    categories: ["research"],
    networks: ["llms_and_data"],
  },
  {
    name: "Solar panel tracking and control (reinforcement learning)",
    description:
      "Brown MS work on reinforcement learning for solar tracking and control: RLDM 2017 and EnviroInfo 2017 on efficiency improvements, AAAI 2018 on bandit-based control, plus a related write-up on improving efficiency.",
    links: [
      { link: "http://cs.brown.edu/~dabel/papers/solarl.pdf", name: "RLDM 2017 paper" },
      {
        link: "http://cs.brown.edu/~dabel/papers/solarl_enviro_info.pdf",
        name: "EnviroInfo 2017 paper",
      },
      {
        link: "https://aaai.org/papers/11415-bandit-based-solar-panel-control",
        name: "AAAI 2018 (bandit control)",
      },
    ],
    hide_in_main_list: true,
    categories: ["research"],
    networks: ["experts_using_ai"],
  },
  {
    name: "Toymaker",
    description: html`Animated short, not AI research. character animation lead / cloth sim lead / shading / modeling. <br><br> Screened at festivals including KIDS FIRST!, Green Bay, LA Int'l Children's, and PA Indie Shorts (2018–2019)`,
    links: [{ link: "https://vimeo.com/242488116", name: "video" }],
    image: "toymaker.png",
    categories: ["creative_work"],
    networks: [],
  },
];

export const mainProjects: Project[] = projects.filter(
  (p) => !p.hide_in_main_list
);
