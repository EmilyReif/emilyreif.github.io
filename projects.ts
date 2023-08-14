import { TemplateResult, html } from "lit";

type Link = {
  name: string;
  link: string;
}
export type Project = {
  name: string,
  description: string | TemplateResult,
  image?: string,
  links: Link[],
  dates?: string,
  role?: string
}
export const projects: Project[] = [
  {
    name: 'PALM + PALM2: RAI data analysis',
    description: 'Responsible AI analysis on PaLM and PaLM2 pre-training data',
    links: [
      { link: 'https://arxiv.org/abs/2204.02311', name: 'PaLM paper' },
      { link: 'https://arxiv.org/abs/2305.10403', name: 'PaLM2 technical report' }],

    image: 'topics.png',
  },
  {
    name: 'Visualizing and understanding the geometry of BERT',
    description: 'How are syntax and semantics are encoded in transformers?',
    links: [
      { link: 'https://proceedings.neurips.cc/paper_files/paper/2019/hash/159c1ffe5b61b41b3c4d8f4c2150f6c4-Abstract.html', name: 'Paper' },
      { link: 'https://pair-code.github.io/interpretability/context-atlas/blogpost/', name: 'tool' },
      {link: 'https://github.com/PAIR-code/interpretability/tree/master/context-atlas', name: 'code'}
    ], image: 'bert.png',
  },
  {
    name: 'A gentle introduction to graph neural networks',
    description: 'Visualization-based distill.pub article on understanding GNNs',
    links: [
      { link: 'https://distill.pub/2021/gnn-intro', name: 'paper' }],

    image: 'gnn.png',
  },
  {
    name: 'A recipe for arbitrary text style transfer with LLMs',
    description: 'Using LLMs for arbitrary text style transfer, with a natural language interface',
    links: [
      {link: 'https://arxiv.org/abs/2109.03910', name: 'paper'},
      {link: 'https://storage.googleapis.com/style-transfer-paper-123/index.html', name: 'styled text' },
    ],
    image: 'style_transfer.png',
  },
  {
    name: 'Linguistic Lens',
    description: 'Interactive visualization tool for understanding grammatical diversity in LLM-generated text',
    links: [
      { link: 'https://arxiv.org/pdf/2305.11364.pdf', name: 'paper' },
      { link: 'https://storage.googleapis.com/data-synth-trees/demo/index.html', name: 'Tool' },
      {link: 'https://github.com/PAIR-code/interpretability/tree/master/data-synth-syntax', name: 'code' },
    ],
    image: 'linguisticlens.png',
  },
  {
    name: 'Know Your Data',
    description: html`Tool for understanding large datasets using data augmentation and visualization <br><br> (I led the text version, which was tragically never open sourced)`,
    links: [{ link: 'https://knowyourdata.withgoogle.com/', name: 'KnowYourData' }],
    image: 'knowyourdata.png',
  },
  {
    name: 'A pretrainer\'s guide to training data',
    description: 'What happens when you sytematically vary time, quality, toxicity, and domain of pre-training data for LLMs?',
    links: [
      { link: 'https://arxiv.org/abs/2305.13169', name: 'paper' }],

    image: 'pretraining.jpg',
  },


  {
    name: 'Waterfall of meaning',
    description: 'Art piece exploring the internals of LMs. Shown with the Barbican AI - More Than Human exhibit in  London, China, and Spain',
    links: [
      {link: 'https://artsandculture.google.com/story/xgVxw84BWGgnLg', name: 'article'},
      {link: 'https://storage.googleapis.com/waterfall-of-meaning/demo/standalone.html', name: 'online piece' },
      {link: 'https://github.com/PAIR-code/waterfall-of-meaning', name: 'code' },
    ],

    image: 'waterfall_of_meaning.png',
  },


  {
    name: 'Embedding projector',
    description: 'A tool for interactive visualization and interpretation of embeddings',
    links: [
      { link: 'https://arxiv.org/abs/1611.05469', name: 'paper' },
      { link: 'https://projector.tensorflow.org/', name: 'Tool' },
    ],

    image: 'embeddingprojector.png',
  },


  {
    name: 'Wordcraft writers workshop',
    description: 'LLM-powered writing assistant for a workshop with professional writers including Ken Lui and Robin Sloan. Illustrated with a generative image model',
    links: [
      { link: 'https://wordcraft-writers-workshop.appspot.com/', name: 'stories' },
    ],

    image: 'wordcraft.jpg',
  },


  {
    name: 'Language interpretability tool',
    description: 'Open-source platform for visualizing and understanding language models',
    links: [
      {link: 'https://pair-code.github.io/lit/', name: 'site'},
      {link: 'https://arxiv.org/abs/2008.05122', name: 'paper' },
    ],
    image: 'lit.png',
  },

  {
    name: 'Probing pretraining data',
    description: 'Probing heterogeneous pretraining datasets with small curated datasets',
    links: [
      {link: 'https://gyauney.github.io/papers/probing-heterogeneous-datasets_poster.pdf', name: 'poster'},
    ],
    image: 'probing.png',
  },

  {
    name: 'NNs and gestalt',
    description: 'Neural networks trained on natural scenes exhibit gestalt closure',
    links: [
      {link: 'https://link.springer.com/article/10.1007/s42113-021-00100-7', name: 'paper'},
    ],
    image: 'gestalt.png',
  },

  {
    name: 'Moodboard search',
    description: html`AI-powered creative expression using subjective concepts and embeddings<br><br>Winner of 2023 interaction award`,
    links: [
      {link: 'https://awards.ixda.org/projects/mood-board-search-enabling-ai-powered-creative-expression', name: 'site'},
    ],
    image: 'cavcam.png',
  },
  {
    name: 'Reverse rorschach',
    description: html`Installation by artist Shahryar Nashat using text-to-image generation model. <br><br>helped with intial brainstorming + proof of concepts, and got the technical pieces working`,
    links: [
      {link: 'https://www.luma.org/en/arles/our-program/event/shahryar-nashat-reverse-rorschach-826693ae-da2f-45f7-a77b-cfee4110ff27.html', name: 'site'},
    ],
    image: 'rorsch.png',
  },
  {
    name: 'SMILY: HITL tool for pathologists',
    description: 'Human-centered tools for coping with imperfect algorithms during medical decision-making',
    links: [
      {link: 'https://dl.acm.org/doi/abs/10.1145/3290605.3300234', name: 'paper'},
    ],
    image: 'smily.png',
  },
  {
    name: 'Superlative Instruments',
    description: 'synthesizers, not AI research. implemented the website, helped with company ops, etc',
    links: [
      {link: 'https://playsuperlative.com/', name: 'site'},
    ],
    image: 'superlative.png',
  },
  // {
  //   name: 'Toymaker',
  //   description: html`Animated short, not AI research. character animation lead / cloth sim lead / shading / modeling. <br><br> (digital animation wasn't great back then... but we did win some awards)`,
  //   links: [
  //     {link: 'https://vimeo.com/242488116', name: 'video'},
  //   ],
  //   image: 'toymaker.png',
  // },
]