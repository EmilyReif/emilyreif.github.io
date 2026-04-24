import { TemplateResult, html } from "lit";

export const PROJECT_TAG_ORDER = [
  "llms_and_data",
  "people_and_data",
  "pretraining_data",
  "visualization",
  "interpretability",
  "art",
  "real_people_using_ai",
  "not_ai",
] as const;

export type ProjectTag = (typeof PROJECT_TAG_ORDER)[number];

export const PROJECT_TAG_LABELS: Record<ProjectTag, string> = {
  llms_and_data: "LLMs and dataaaa",
  people_and_data: "People and data",
  pretraining_data: "Pretraining data",
  visualization: "Visualization",
  interpretability: "Interpretability",
  art: "Art",
  real_people_using_ai: "Real people using AI",
  not_ai: "Not AI",
};

const tagOrderIndex = new Map(
  PROJECT_TAG_ORDER.map((t, i) => [t, i] as const)
);

export function sortProjectTags(tags: ProjectTag[]): ProjectTag[] {
  return [...tags].sort(
    (a, b) => (tagOrderIndex.get(a) ?? 0) - (tagOrderIndex.get(b) ?? 0)
  );
}

type Link = {
  name: string;
  link: string;
};
export type Project = {
  name: string;
  description: string | TemplateResult;
  image?: string;
  links: Link[];
  dates?: string;
  role?: string;
  tags: ProjectTag[];
  /** When true, excluded from the main Projects list (still in data for exports / tooling). */
  hide_in_main_list?: boolean;
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
  "a recipe for arbitrary text style transfer with large language models": { year: 2022, citations: 110, aliases: ["a recipe for arbitrary text style transfer with llms"] },
  "a pretrainer s guide to training data measuring the effects of data age domain coverage quality toxicity": { year: 2024, month: 7, citations: 65, aliases: ["a pretrainer s guide to training data"] },
  "llm comparator interactive analysis of side by side evaluation of large language models": { year: 2025, month: 1, citations: 55, aliases: ["llm comparator"] },
  "automatic histograms leveraging language models for text dataset exploration": { year: 2024, month: 5, citations: 18, aliases: ["automatic histograms"] },
  "data similarity is not enough to explain language model performance": { year: 2023, month: 12, citations: 28 },
  "an interpretability illusion for bert": { year: 2021, citations: 95 },
  "evaluating attribution for graph neural networks": { year: 2020, month: 12, citations: 135 },
  "so und framework analyzing so cial representation in un structured d ata": { year: 2024, citations: 15, aliases: ["sound analyzing social representation in unstructured data"] },
  "understanding the dataset practitioners behind large language models": { year: 2024, citations: 12, aliases: ["understanding the dataset practitioners behind large language model development"] },
  "the evolution of llm adoption in industry data curation practices": { year: 2024, citations: 9 },
  "llm adoption in data curation workflows industry practices and insights": { year: 2025, citations: 7 },
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
  "superlative instruments": { year: 2021, citations: 10 },
  "improving solar panel efficiency using reinforcement learning": { year: 2017, citations: 10 },
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
    tags: ["llms_and_data", "visualization", "interpretability"],
  },
  {
    name: "PALM + PALM2: RAI data analysis",
    description: "Responsible AI analysis on PaLM and PaLM2 pre-training data",
    links: [
      { link: "https://arxiv.org/abs/2204.02311", name: "PaLM paper" },
      { link: "https://arxiv.org/abs/2305.10403", name: "PaLM2 technical report" },
    ],
    image: "topics.png",
    tags: ["llms_and_data", "people_and_data", "pretraining_data"],
  },
  {
    name: "A pretrainer's guide to training data",
    description:
      "What happens when you systematically vary time, quality, toxicity, and domain of pre-training data for LLMs?",
    links: [
      { link: "https://aclanthology.org/2024.naacl-long.179/", name: "paper" },
    ],
    image: "pretraining.jpg",
    tags: ["llms_and_data", "pretraining_data"],
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
    tags: ["llms_and_data"],
  },
  {
    name: "A gentle introduction to graph neural networks",
    description: "Visualization-based distill.pub article on understanding GNNs",
    links: [{ link: "https://distill.pub/2021/gnn-intro", name: "paper" }],
    image: "gnn.png",
    tags: ["visualization"],
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
    tags: ["visualization", "interpretability"],
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
    tags: [
      "llms_and_data",
      "visualization",
      "interpretability",
      "art",
      "real_people_using_ai",
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
    tags: ["llms_and_data", "visualization"],
  },
  {
    name: "Know Your Data",
    description: html`Tool for understanding large datasets using data augmentation and visualization <br><br> (I led the text version, which was internal to Google)`,
    links: [{ link: "https://knowyourdata.withgoogle.com/", name: "KnowYourData" }],
    image: "knowyourdata.png",
    tags: ["llms_and_data", "visualization"],
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
    tags: ["llms_and_data", "visualization"],
  },
  {
    name: "Embedding projector",
    description: "A tool for interactive visualization and interpretation of embeddings",
    links: [
      { link: "https://arxiv.org/abs/1611.05469", name: "paper" },
      { link: "https://projector.tensorflow.org/", name: "Tool" },
    ],
    image: "embeddingprojector.png",
    tags: ["llms_and_data", "visualization", "interpretability"],
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
    tags: ["llms_and_data", "visualization"],
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
    tags: ["llms_and_data", "real_people_using_ai"],
  },
  {
    name: "Language interpretability tool",
    description: "Open-source platform for visualizing and understanding language models",
    links: [
      { link: "https://pair-code.github.io/lit/", name: "site" },
      { link: "https://arxiv.org/abs/2008.05122", name: "paper" },
    ],
    image: "lit.png",
    tags: ["visualization", "interpretability"],
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
    tags: ["llms_and_data", "pretraining_data", "interpretability"],
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
    tags: ["interpretability"],
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
    tags: ["art", "real_people_using_ai"],
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
    tags: ["art", "real_people_using_ai"],
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
    tags: ["real_people_using_ai", "not_ai"],
  },
  {
    name: "Superlative Instruments",
    description:
      "Synthesizers, not AI research. implemented the website, helped with company ops, etc",
    links: [{ link: "https://playsuperlative.com/", name: "site" }],
    image: "superlative.png",
    tags: ["not_ai"],
  },
  {
    name: "Evaluating attribution for graph neural networks",
    description:
      "Quantitative evaluation of attribution methods for GNNs with synthetic ground truth",
    links: [
      {
        link: "https://proceedings.neurips.cc/paper/2020/hash/417fbbf2e9d5a28a855a11894b2e795a-Abstract.html",
        name: "paper",
      },
    ],
    hide_in_main_list: true,
    tags: ["interpretability"],
  },
  {
    name: "An interpretability illusion for BERT",
    description:
      "Phenomena that can make BERT-based interpretability tools appear more reliable than they are",
    links: [{ link: "https://arxiv.org/abs/2104.07143", name: "paper" }],
    hide_in_main_list: true,
    tags: ["interpretability"],
  },
  {
    name: "Who's asking? User personas and the mechanics of latent misalignment",
    description: "How implicit user personas affect model behavior and safety",
    links: [{ link: "https://arxiv.org/abs/2406.12094", name: "paper" }],
    hide_in_main_list: true,
    tags: ["interpretability"],
  },
  {
    name: "Understanding the dataset practitioners behind large language model development",
    description:
      "Interviews and analysis of data practitioners in LLM development (CHI 2024 extended abstract)",
    links: [{ link: "https://arxiv.org/abs/2402.16611", name: "paper" }],
    hide_in_main_list: true,
    tags: ["llms_and_data", "people_and_data"],
  },
  {
    name: "Data similarity is not enough to explain language model performance",
    description:
      "Similarity to pretraining data often does not track downstream task accuracy",
    links: [
      { link: "https://aclanthology.org/2023.emnlp-main.695/", name: "paper" },
    ],
    hide_in_main_list: true,
    tags: ["llms_and_data", "pretraining_data", "interpretability"],
  },
  {
    name: "The evolution of LLM adoption in industry data curation practices",
    description:
      "Survey, interviews, and user studies on how data teams adopt LLMs in curation workflows",
    links: [{ link: "https://arxiv.org/abs/2412.16089", name: "paper" }],
    hide_in_main_list: true,
    tags: ["llms_and_data", "people_and_data"],
  },
  {
    name: "LLM adoption in data curation workflows: industry practices and insights",
    description:
      "CHI 2025 extended abstract; related follow-on to the industry adoption work",
    links: [
      {
        link: "https://researchr.org/publication/QianLRSHCWCTK25",
        name: "publication",
      },
    ],
    hide_in_main_list: true,
    tags: ["llms_and_data", "people_and_data"],
  },
  {
    name: "SoUnD: analyzing social representation in unstructured data",
    description:
      "Framework for RAI analysis of who and what is represented in foundation model training data (AIES 2024)",
    links: [{ link: "https://arxiv.org/abs/2311.17259", name: "paper" }],
    hide_in_main_list: true,
    tags: ["llms_and_data", "people_and_data", "pretraining_data"],
  },
  // {
  //   name: "Developing a conceptual framework for analyzing people in unstructured data",
  //   description:
  //     "Workshop version (SoLaR / NeurIPS workshops 2023) of ideas later expanded in SoUnD",
  //   links: [
  //     { link: "https://openreview.net/forum?id=QSPHfgw5fp", name: "paper" },
  //   ],
  //   hide_in_main_list: true,
  //   tags: ["llms_and_data", "people_and_data", "pretraining_data"],
  // },
  {
    name: "RDoFlow: automatically assessing under-specified statistical analyses in HCI",
    description:
      "IUI 2026",
    links: [
      { link: "https://iui.acm.org/2026/accepted-papers/", name: "venue" },
    ],
    hide_in_main_list: true,
    tags: ["not_ai"],
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
    tags: ["llms_and_data"],
  },
  {
    name: "Improving solar panel efficiency using reinforcement learning",
    description:
      "RLDM 2017 version of the solar tracking work, with related EnviroInfo 2017 and AAAI 2018 follow-ons.",
    links: [
      { link: "http://cs.brown.edu/~dabel/papers/solarl.pdf", name: "RLDM 2017 paper" },
      {
        link: "http://cs.brown.edu/~dabel/papers/solarl_enviro_info.pdf",
        name: "EnviroInfo 2017 paper",
      },
      {
        link: "https://aaai.org/papers/11415-bandit-based-solar-panel-control",
        name: "AAAI 2018 paper",
      },
    ],
    hide_in_main_list: true,
    tags: ["real_people_using_ai", "not_ai"],
  },
  {
    name: "Toymaker",
    description: html`Animated short, not AI research. character animation lead / cloth sim lead / shading / modeling. <br><br> (digital animation wasn't great back then...)`,
    links: [{ link: "https://vimeo.com/242488116", name: "video" }],
    image: "toymaker.png",
    tags: ["art", "not_ai"],
  },
];

export const mainProjects: Project[] = projects.filter(
  (p) => !p.hide_in_main_list
);
