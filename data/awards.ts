export interface Award {
  id: string
  title: string
  issuer: string
  category: 'ai' | 'engineering' | 'bootcamp'
  categoryLabel: string
  description: string
  pdfUrl: string
  accent: string
  skills: string[]
  iconType: 'bot' | 'brain' | 'terminal' | 'code' | 'graduation' | 'shield'
}

export const awardsData: Award[] = [
  {
    id: 'ibm-ai-agent',
    title: 'Build an AI Agent',
    issuer: 'IBM SkillsBuild',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    description:
      'Sertifikasi resmi IBM SkillsBuild dalam perancangan arsitektur autonomous AI agent, prompt chaining, reasoning logic, dan integrasi API AI cerdas.',
    pdfUrl: '/sertif/sertif ibm build an ai agent.pdf',
    accent: '#3b82f6', // Electric Blue
    skills: ['AI Agents', 'Prompt Chaining', 'Agentic Workflows', 'API Integration'],
    iconType: 'bot',
  },
  {
    id: 'ibm-llm',
    title: 'Large Language Models (LLMs)',
    issuer: 'IBM SkillsBuild',
    category: 'ai',
    categoryLabel: 'Generative AI',
    description:
      'Sertifikasi resmi IBM SkillsBuild dalam pemahaman mendalam arsitektur transformer neural network, fine-tuning LLM, dan implementasi Generative AI.',
    pdfUrl: '/sertif/sertif ibm llm.pdf',
    accent: '#ec4899', // Pink Neon
    skills: ['Large Language Models', 'Generative AI', 'Transformers', 'Prompting'],
    iconType: 'brain',
  },
  {
    id: 'ibm-troubleshoot',
    title: 'Troubleshoot Your Code with IBM watsonx',
    issuer: 'IBM SkillsBuild',
    category: 'ai',
    categoryLabel: 'Developer Tools',
    description:
      'Sertifikasi resmi IBM SkillsBuild dalam metodologi troubleshooting kode, optimasi software, dan automated debugging berbantu AI watsonx Assistant.',
    pdfUrl: '/sertif/sertif ibm troubelshhoot your code using ibm bob.pdf',
    accent: '#10b981', // Emerald
    skills: ['watsonx Assistant', 'Code Debugging', 'Software Optimization', 'AI Tools'],
    iconType: 'terminal',
  },
  {
    id: 'hacktiv',
    title: 'Hacktiv8 Certification',
    issuer: 'Hacktiv8',
    category: 'bootcamp',
    categoryLabel: 'Coding Bootcamp',
    description:
      'Sertifikasi kompetensi software engineering dan pemecahan algoritma intensif berstandar industri teknologi global dari Hacktiv8 Bootcamp.',
    pdfUrl: '/sertif/hacktiv.pdf',
    accent: '#f59e0b', // Amber
    skills: ['Software Engineering', 'Full-Stack Development', 'Algorithms', 'Best Practices'],
    iconType: 'shield',
  },
  {
    id: 'codepolitan',
    title: 'CodePolitan Certification',
    issuer: 'CodePolitan',
    category: 'engineering',
    categoryLabel: 'Web Programming',
    description:
      'Sertifikasi kelulusan fondasi pemrograman web modern, logika komputasi, dan arsitektur pengembangan web dinamis dari CodePolitan.',
    pdfUrl: '/sertif/codepoliton.pdf',
    accent: '#8b5cf6', // Indigo Violet
    skills: ['Web Development', 'Modern JavaScript', 'Frontend Architecture', 'HTML/CSS'],
    iconType: 'code',
  },
  {
    id: 'dibimbing',
    title: 'Dibimbing.id Certification',
    issuer: 'Dibimbing.id',
    category: 'bootcamp',
    categoryLabel: 'Digital Skill & Tech',
    description:
      'Sertifikasi pelatihan intensif pengembangan keahlian digital, praktik industri modern, dan implementasi teknologi software dari Dibimbing.id.',
    pdfUrl: '/sertif/dibimbing.pdf',
    accent: '#00d4ff', // Cyan
    skills: ['Digital Skills', 'Industry Workflow', 'Software Tools', 'Modern Tech'],
    iconType: 'graduation',
  },
]
