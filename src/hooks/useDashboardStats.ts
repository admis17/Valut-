import type { Entry } from '../types/entry';

export function useDashboardStats(entries: Entry[]) {
  const now = new Date();
  const addedThisMonth = entries.filter((e) => {
    const d = new Date(e.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const cardCount = entries.filter((e) => e.type === 'card').length;
  const brochureCount = entries.filter((e) => e.type === 'brochure').length;
  const bothCount = entries.filter((e) => e.type === 'both').length;
  const total = entries.length;

  const indMap: Record<string, number> = {};
  entries.forEach((e) => {
    if (e.industry) indMap[e.industry] = (indMap[e.industry] || 0) + 1;
  });
  const topIndustries = Object.entries(indMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return { total, addedThisMonth, cardCount, brochureCount, bothCount, topIndustries };
}
