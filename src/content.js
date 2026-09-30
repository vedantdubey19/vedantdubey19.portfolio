// Everything the site says lives in this file.
// Content comes from Vedant's résumé, public GitHub profile (github.com/vedantdubey19)
// and earlier portfolio (vedant-portfolio-beryl.vercel.app).

import hiresenseShot from './assets/hiresense.webp'
import photoMobile from './assets/me-mobile.webp'
import photo from './assets/me.webp'
import studyaiShot from './assets/studyai.webp'

const github = 'https://github.com/vedantdubey19'

export const profile = {
  name: 'Vedant Dubey',
  wordmark: 'Vedant',
  greeting: "Hey, I'm an",
  role: ['AI', 'Engineer'],
  tagline: 'I build LLM applications, RAG pipelines and AI agents, and deploy them as working products.',
  intro:
    'B.Tech CSE (Data Science), class of 2027. AI/ML intern at Axlero and IBM, Oracle-certified in Generative AI.',
  email: 'vedantdubey020@gmail.com',
  resumeUrl: '/Vedant-Dubey-Resume.pdf', // file in public/
  photo, // src/assets/me.webp, the hero background. Set to '' to hide it.
  photoMobile, // smaller copy of the same photo, served to phones
  location: 'Noida, India',
}

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

// The four numbered items along the bottom of the hero
export const focusAreas = ['LLM Applications', 'RAG & AI Agents', 'Machine Learning', 'Computer Vision']

// The scrolling strip under the hero
export const stack = [
  'Python',
  'PyTorch',
  'LangChain',
  'LangGraph',
  'Hugging Face',
  'Qdrant',
  'Sentence Transformers',
  'TensorFlow',
  'scikit-learn',
  'FastAPI',
  'ChromaDB',
  'OpenCV',
  'Docker',
  'MongoDB',
]

// `visual` picks a generated cover: graph | rings | bars | dots.
// `image` (imported from src/assets/) replaces the generated cover with a screenshot.
export const projects = [
  {
    title: 'OmniBrain',
    summary:
      'An agentic, multi-modal RAG orchestrator for complex documents. A LangGraph supervisor routes each query to search, Text-to-SQL and vision agents, then returns an answer cited back to the source page, table or chart.',
    tags: ['LangGraph', 'Multi-agent RAG', 'Qdrant', 'FastAPI', 'Text-to-SQL'],
    visual: 'graph',
    image: '',
    live: '',
    repo: `${github}/Omni-Brain`,
  },
  {
    title: 'Pulse AI',
    summary:
      'An API observability platform that detects failures and explains them. It ingested 2,000+ log events per second in load testing, flags anomalies against a sliding baseline and writes an LLM root-cause summary. Built with a teammate.',
    tags: ['Anomaly detection', 'LLM (Llama 3.1)', 'Go', 'MongoDB', 'WebSockets'],
    visual: 'bars',
    image: '',
    live: 'https://pulse-ai-pi.vercel.app',
    repo: `${github}/Pulse_AI`,
  },
  {
    title: 'HireSense AI',
    summary:
      'A recruitment engine that screens and ranks résumés against a job description using sentence-transformer embeddings and cosine similarity, with a recruiter dashboard to review every candidate.',
    tags: ['NLP', 'Semantic search', 'Sentence Transformers', 'PyTorch', 'FastAPI'],
    visual: 'dots',
    image: hiresenseShot,
    live: 'https://hire-sense-ai-beta.vercel.app',
    repo: `${github}/HireSense-AI`,
  },
  {
    title: 'Study AI',
    summary:
      'A RAG study assistant: upload PDFs or textbooks and ask questions answered only from your documents, with the retrieved chunks cited. Runs locally on Ollama or in the cloud on Gemini and Groq.',
    tags: ['RAG', 'LangChain', 'ChromaDB', 'Ollama', 'Gemini'],
    visual: 'dots',
    image: studyaiShot,
    live: 'https://studyai-6q5gxcbbl4l63jh8clpnf5.streamlit.app/',
    repo: `${github}/Study_Ai`,
  },
]

export const moreProjects = {
  eyebrow: 'More AI Projects',
  heading: 'Beyond the Featured Four',
  text: 'Hackathon and research builds across LLMs, computer vision and reinforcement learning.',
  allUrl: `${github}?tab=repositories`,
  items: [
    {
      title: 'MarkLoss',
      text: 'Step-level AI examiner for handwritten answers. Gemini reads the steps; SymPy code does the marking. Built for Horizon 2026.',
      tags: ['Gemini', 'SymPy', 'FastAPI'],
      href: 'https://horizon-hackathon-vert.vercel.app',
    },
    {
      title: 'AutoDev AI',
      text: 'GitHub integration that reviews pull requests with an LLM and predicts bug risk with a Random Forest model.',
      tags: ['LLM code review', 'scikit-learn', 'Docker'],
      href: `${github}/AutoDev-Ai`,
    },
    {
      title: 'Air Writer',
      text: 'Write in the air with hand gestures: real-time fingertip tracking turned into on-screen drawing.',
      tags: ['OpenCV', 'MediaPipe', 'Python'],
      href: `${github}/Air-Writer`,
    },
    {
      title: 'Snake DQN',
      text: 'A Deep Q-Network agent that learns to play Snake in an environment with shifting gravity.',
      tags: ['Reinforcement learning', 'PyTorch'],
      href: `${github}/Snake-Game-DQN-`,
    },
  ],
}

export const skills = {
  eyebrow: 'Skills',
  heading: 'AI Engineering Toolkit',
  lead: 'End to end: data, models, LLM pipelines, APIs and deployment.',
  groups: [
    {
      kicker: 'LLM applications.',
      title: 'Generative AI & LLMs',
      text: 'RAG pipelines, agentic workflows and multi-agent systems grounded in real data, with retrieval that keeps hallucinations down.',
      items: [
        'LLMs',
        'RAG',
        'AI agents',
        'Multi-agent systems',
        'LangChain',
        'LangGraph',
        'Prompt engineering',
        'Vector databases',
        'ChromaDB',
        'Qdrant',
        'Embeddings',
        'Semantic search',
        'Hugging Face Transformers',
        'Gemini, Groq & Llama',
        'Ollama',
      ],
    },
    {
      kicker: 'Solid foundations.',
      title: 'Machine Learning & Deep Learning',
      text: 'Supervised learning, deep networks, NLP, computer vision and reinforcement learning, with careful evaluation.',
      items: [
        'PyTorch',
        'TensorFlow',
        'scikit-learn',
        'Deep learning',
        'NLP',
        'Computer vision',
        'OpenCV',
        'MediaPipe',
        'Reinforcement learning',
        'Sentence Transformers',
        'Pandas',
        'NumPy',
        'Model evaluation',
      ],
    },
    {
      kicker: 'From notebook to live.',
      title: 'MLOps & Deployment',
      text: 'APIs, containers and hosting, so a model becomes a product someone can use.',
      items: ['Python', 'SQL', 'Java', 'FastAPI', 'REST APIs', 'Docker', 'CI/CD', 'Git', 'MongoDB', 'PostgreSQL', 'Streamlit', 'Model deployment'],
    },
  ],
}

export const experience = {
  eyebrow: 'Experience',
  heading: 'Internships & Certifications',
  lead: 'Three AI and data science internships alongside my degree, plus certifications in Generative AI.',
  items: [
    {
      title: 'Data Scientist Intern',
      meta: 'Axlero · Present',
      text: 'Leading the architecture for OmniBrain, a LangGraph multi-agent RAG system for reasoning over complex documents.',
    },
    {
      title: 'Data Science Intern',
      meta: 'Oasis Infobyte · Jul 2026 — Aug 2026',
      text: 'Built 5+ end-to-end data science projects, from spam detection to sales forecasting, with reusable preprocessing pipelines and model comparisons on accuracy, precision, recall and F1.',
    },
    {
      title: 'AI/ML Intern',
      meta: 'IBM (PBEL Program) · Sep 2025 — Nov 2025',
      text: 'Took a supervised classification model through the full pipeline, from EDA to hyperparameter tuning, reaching 88%+ accuracy, and presented the findings to program mentors.',
    },
    {
      title: 'B.Tech, CSE (Data Science)',
      meta: 'Lloyd Institute of Engineering and Technology, AKTU · 2023 — 2027',
      text: 'Computer Science Engineering with a Data Science specialization.',
    },
  ],
  // With `image` (a file in public/certificates/) the card opens the certificate full-size;
  // without one it links to `verify`.
  certifications: [
    {
      title: 'OCI 2025 Certified Generative AI Professional',
      meta: 'Oracle · Sep 2025',
      verify: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=4BC49A9F329CDD1A7FCED770A2B208432DBAF2BC48C7E840F556DE1D8FA0E1A3',
    },
    {
      title: 'OCI 2025 Certified AI Foundations Associate',
      meta: 'Oracle · Sep 2025',
      verify: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=D7375E756975654F57DBB35D6155C7AD7D3DA03AAD68A8AD8FAA53BFAEE315C5',
    },
    {
      title: 'Amazon Bedrock Customization, Optimization & Automation',
      meta: 'AWS via Coursera · Jun 2026',
      image: '/certificates/amazon-bedrock.webp',
      verify: 'https://coursera.org/verify/H0ME8BUF5OQZ',
    },
    {
      title: 'Generative AI Applications with RAG & LangChain',
      meta: 'IBM via Coursera · Jun 2026',
      image: '/certificates/genai-rag.webp',
      verify: 'https://coursera.org/verify/JBGKV17BK3X5',
    },
    {
      title: 'AI Virtual Internship (PBEL)',
      meta: 'IBM Developer Skills Network · Oct 2025',
      image: '/certificates/ibm-internship.webp',
      verify: 'https://courses.ibmmooc.skillsnetwork.site/certificates/6926ba93a7f142769b67e9884835c257',
    },
    {
      title: 'Introduction to Generative AI Studio',
      meta: 'Google Cloud via Simplilearn · Dec 2025',
      image: '/certificates/google-cloud.webp',
      verify: 'https://simpli-web.app.link/e/de2skpRjeZb',
    },
  ],
}

// `icon` is one of: linkedin | github | email
export const socials = [
  { icon: 'linkedin', label: 'LinkedIn', handle: 'in/vedantdubey20', href: 'https://www.linkedin.com/in/vedantdubey20/' },
  { icon: 'github', label: 'GitHub', handle: '@vedantdubey19', href: github },
  { icon: 'email', label: 'Email', handle: profile.email, href: `mailto:${profile.email}` },
]

export const connect = {
  eyebrow: 'Open to AI / ML internships',
  heading: "Let's Talk",
  text: 'Hiring for an AI Engineer, ML Engineer or Generative AI intern? Reach me on any of these.',
}
