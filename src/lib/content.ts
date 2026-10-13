/** Everything the public site shows. The admin panel edits this one document. */
export interface Link {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  org: string;
  period: string;
  bullets: string[];
}

export interface SkillGroup {
  id: string;
  name: string;
  items: string[];
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface SiteContent {
  profile: {
    name: string;
    headline: string;
    intro: string;
    about: string[];
    location: string;
    email: string;
    photo: string;
    cvUrl: string;
  };
  links: Link[];
  stats: Stat[];
  projects: Project[];
  experience: Experience[];
  skills: SkillGroup[];
  awards: string[];
}

export const defaultContent: SiteContent = {
  profile: {
    name: "Jaloliddin Kulmatov",
    headline: "AI / ML Engineer · Full-Stack Developer · Founder of ICOM",
    intro:
      "Engineering student at Jeonbuk National University. I build AI products and web apps that help people learn, work and live in a new country.",
    about: [
      "I'm from Uzbekistan and study International Engineering and Science at Jeonbuk National University in Korea, on a full scholarship. This semester I'm on exchange at Universiti Malaya.",
      "I'm passionate about science and technology, with a strong interest in web development, machine learning, data science and problem-solving.",
      "I founded ICOM, an AI platform for international students in Korea. It earned a patent and a conference paper.",
    ],
    location: "Jeonju, South Korea",
    email: "jaloliddinqulmatov12@gmail.com",
    photo: "/photo.jpg",
    cvUrl: "/cv.pdf",
  },
  links: [
    { label: "GitHub", url: "https://github.com/Jaloliddin-Kulmatov" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jaloliddin-kulmatov/" },
    { label: "Telegram", url: "https://t.me/JaloliddinKulmatov" },
    { label: "Blog", url: "https://kulmatovs-blog.onrender.com/" },
  ],
  stats: [
    { id: "gpa", value: "4.47/4.5", label: "GPA, full scholarship" },
    { id: "rank", value: "1st of 69", label: "international students in Engineering" },
    { id: "patent", value: "Patent", label: "from the ICOM project" },
    { id: "paper", value: "Paper", label: "2026 Summer Conference" },
  ],
  projects: [
    {
      id: "icom",
      title: "ICOM",
      category: "AI & Full-Stack",
      summary:
        "Platform for international students in Korea: chat, internships, visa and housing guides, banking and an AI assistant. Internship posts are collected and translated with AI twice a day.",
      tech: ["Next.js", "TypeScript", "Flask", "PostgreSQL", "Groq LLM"],
      image: "/projects/icom.jpg",
      github: "https://github.com/Jaloliddin-Kulmatov/ICOM-v1",
      demo: "https://icom.ai.kr",
      featured: true,
    },
    {
      id: "talaba",
      title: "TALABA",
      category: "AI & Full-Stack",
      summary:
        "ICOM for students in Uzbekistan, in Uzbek: community, jobs, university admission help, housing, scholarships and an AI assistant.",
      tech: ["Next.js", "TypeScript", "Tailwind", "Python"],
      image: "/projects/talaba.jpg",
      github: "https://github.com/Jaloliddin-Kulmatov/talaba",
      demo: "https://talaba-zeta.vercel.app",
      featured: true,
    },
    {
      id: "nori",
      title: "Nori (노리다)",
      category: "AI & Full-Stack",
      summary: "Upload an English CV and get a Korean-style résumé PDF. AI translates and reorganizes it for jobs in Korea.",
      tech: ["Flask", "Groq LLM", "pdfplumber", "ReportLab"],
      image: "",
      github: "https://github.com/Jaloliddin-Kulmatov/Nori",
      demo: "",
      featured: false,
    },
    {
      id: "voicemimic",
      title: "VoiceMimic",
      category: "AI & Full-Stack",
      summary: "Record or upload a short voice clip, type any text, and hear it in that voice with XTTS-v2 voice cloning.",
      tech: ["Python", "Flask", "XTTS-v2", "JavaScript"],
      image: "",
      github: "https://github.com/Jaloliddin-Kulmatov/voice-mimic",
      demo: "",
      featured: false,
    },
    {
      id: "ctest",
      title: "C-Test Trainer",
      category: "Tools & Websites",
      summary:
        "Practice site for the German onSET test: 4 full timed tests, 24 grammar topics, 593 vocabulary words, a mistake notebook and progress charts.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "/projects/ctest.jpg",
      github: "https://github.com/Jaloliddin-Kulmatov/ctest-trainer",
      demo: "https://ctest-trainer-eight.vercel.app",
      featured: true,
    },
    {
      id: "scaps",
      title: "SCAPS IV Extractor",
      category: "Research",
      summary:
        "Research tool from the JBNU Solar Cell Lab: turns SCAPS-1D simulation files into one Excel table (Voc, Jsc, FF, PCE). Runs in the browser.",
      tech: ["JavaScript", "Python", "FastAPI"],
      image: "/projects/scaps.jpg",
      github: "https://github.com/Jaloliddin-Kulmatov/Scaps_data_parameters",
      demo: "https://scaps-data-1b9a.vercel.app",
      featured: false,
    },
    {
      id: "findme",
      title: "Find_me",
      category: "Tools & Websites",
      summary: "Finds where a username exists across 40+ websites, with Python serverless functions on Vercel.",
      tech: ["Python", "Serverless", "JavaScript"],
      image: "/projects/findme.jpg",
      github: "https://github.com/Jaloliddin-Kulmatov/Find_me",
      demo: "https://find-me-sandy.vercel.app",
      featured: false,
    },
    {
      id: "blog",
      title: "Flask Blog",
      category: "Tools & Websites",
      summary: "Blog platform with login, admin roles, a rich-text editor, comments and a contact form. PostgreSQL on Render.",
      tech: ["Flask", "PostgreSQL", "Bootstrap"],
      image: "/projects/blog_web.jpg",
      github: "https://github.com/Jaloliddin-Kulmatov/Kulmatovs_blog_v2",
      demo: "https://kulmatovs-blog.onrender.com/",
      featured: false,
    },
    {
      id: "foodreels",
      title: "Food Reels",
      category: "Tools & Websites",
      summary: "Hackathon prototype: watch short food videos and order the dish without leaving the feed.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "/projects/food_real.jpg",
      github: "https://github.com/Jaloliddin-Kulmatov/Food_Reel",
      demo: "",
      featured: false,
    },
    {
      id: "regression",
      title: "Multivariable Regression",
      category: "Data & ML",
      summary: "House price valuation model with multivariable regression on the Boston housing data.",
      tech: ["Python", "scikit-learn", "Pandas", "Jupyter"],
      image: "",
      github: "https://github.com/Jaloliddin-Kulmatov/Multivariable_Regression",
      demo: "",
      featured: false,
    },
  ],
  experience: [
    {
      id: "icom",
      role: "Founder & Full-Stack Developer",
      org: "ICOM (icom.ai.kr)",
      period: "Apr 2026 – Present",
      bullets: [
        "Built the whole platform by myself for international students in Korea.",
        "Reached 50+ users at JBNU. Got a patent. Wrote a conference paper with Prof. Aaron Snowberger.",
      ],
    },
    {
      id: "lab",
      role: "Undergraduate Research Assistant",
      org: "Solar Cell Lab, JBNU",
      period: "2026 (4 months)",
      bullets: [
        "Helped PhD students simulate and improve solar cells in COMSOL and PC1D.",
        "Built SCAPS IV Extractor to turn simulation files into Excel tables.",
      ],
    },
    {
      id: "freelance",
      role: "Python & Full-Stack Developer",
      org: "Freelance and personal projects",
      period: "Mar 2025 – Present",
      bullets: ["Built 50+ apps and websites, including an object detection system and a strawberry ripeness classifier."],
    },
    {
      id: "ielts",
      role: "IELTS Teacher & Content Manager",
      org: "5 Skills Educational Center, Uzbekistan",
      period: "May 2024 – Feb 2025",
      bullets: ["Made lessons for each student and ran full mock exams. Helped translate and edit IELTS books."],
    },
  ],
  skills: [
    { id: "prog", name: "Programming", items: ["Python", "TypeScript", "JavaScript", "C", "C++", "SQL"] },
    { id: "ai", name: "AI / ML", items: ["LLM APIs (OpenAI, Groq)", "Function calling", "Embeddings", "Hugging Face", "Computer vision", "scikit-learn"] },
    { id: "web", name: "Web", items: ["Next.js", "React", "Tailwind", "Flask", "FastAPI", "PostgreSQL", "REST APIs"] },
    { id: "data", name: "Data", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Plotly"] },
    { id: "lang", name: "Languages", items: ["Uzbek (native)", "English (IELTS 7.5)", "Korean (TOPIK 4)", "Russian", "German (beginner)"] },
  ],
  awards: [
    "Paper: “Design and Implementation of an AI-Assisted Information and Community Platform for International Students in Korea”, 2026 Summer Conference",
    "Patent from the ICOM project (2026)",
    "JBNU President's Award: perfect 4.5/4.5 GPA for a full year",
    "Winner, UNOSD Summer Camp, Seoul (2026)",
    "Finalist, regional AI Hackathon, South Korea",
    "Fellow, Silk Road Health Data Science Fellowship (Feb–Aug 2026)",
  ],
};
