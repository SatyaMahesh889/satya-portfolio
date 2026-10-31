/**
 * "Engineering Meets AI." AI tools accelerate the work; every capability
 * lists what remains the engineer's responsibility.
 */
export const aiSection = {
  eyebrow: 'AI-assisted development',
  title: 'Engineering Meets AI.',
  description:
    'I combine software engineering knowledge with modern AI development tools to accelerate the journey from idea to working product.',
  highlight: 'From concept to working application — faster development through engineering expertise and AI-assisted workflows.',
  ownership:
    'I use Claude and OpenAI Codex to accelerate implementation, while personally handling requirements, engineering decisions, code review, testing, debugging and delivery.',
  /** What this workflow is used to build. */
  builds: [
    'Responsive websites',
    'Interactive frontend applications',
    'Backend APIs',
    'Full-stack applications',
    'Business dashboards',
    'Digital prototypes',
  ],
  tools: [
    { name: 'Claude', icon: 'claude' as const },
    { name: 'OpenAI Codex', icon: 'codex' as const },
  ],
}

export const aiCapabilities = [
  {
    title: 'Rapid Prototyping',
    summary: 'Transform business requirements into working prototypes efficiently.',
    owner: ['Clarify requirements and the key user flows', 'Decide scope and what “working” means'],
    assist: ['Scaffold screens and components quickly', 'Explore layout and interaction variations'],
  },
  {
    title: 'Full-Stack Development',
    summary: 'Build responsive frontend experiences and connect them with functional backend services.',
    owner: ['Design APIs, data models and integration points', 'Keep frontend and backend contracts consistent'],
    assist: ['Generate boilerplate and repetitive code', 'Draft UI components for refinement'],
  },
  {
    title: 'AI-Assisted Implementation',
    summary: 'Use Claude and Codex to accelerate development, code generation, and implementation workflows.',
    owner: ['Break work into clear, reviewable tasks', 'Set constraints, conventions and structure'],
    assist: ['Draft implementations against those constraints', 'Speed up refactors and multi-file changes'],
  },
  {
    title: 'Code Review & Refinement',
    summary: 'Review generated code, identify issues, debug, and improve maintainability.',
    owner: ['Review every change before it is accepted', 'Debug, simplify and improve maintainability'],
    assist: ['Suggest fixes and explain unfamiliar code', 'Point out edge cases worth checking'],
  },
  {
    title: 'Testing & Delivery',
    summary: 'Validate functionality, fix issues, optimise the experience, and prepare applications for deployment.',
    owner: ['Verify behaviour on real devices and browsers', 'Fix issues, optimise and deploy'],
    assist: ['Help write tests and checklists', 'Speed up investigation of failures'],
  },
]
