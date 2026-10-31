export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'ismool', label: 'ismool' },
  { id: 'contact', label: 'Contact' },
] as const

export const sectionIds = navItems.map((n) => n.id)
