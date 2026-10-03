// Replace these placeholders. Add a real `href` when a project or case study is ready.
export const projects = Array.from({ length: 6 }, (_, index) => ({
  number: String(index + 1).padStart(2, '0'),
  title: `Project Title ${String(index + 1).padStart(2, '0')}`,
  description: 'Brief description of the project goes here. Share the idea, what you made, and why it matters.',
  category: 'Category',
  year: '2026',
  status: 'Placeholder',
  href: null,
}));
