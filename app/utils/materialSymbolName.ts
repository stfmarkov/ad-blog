/**
 * Same rules as IconCard: full Iconify `collection:icon` ids pass through;
 * short Material Symbols glyph ids become `material-symbols:…` with underscores
 * normalized to hyphens for Iconify.
 */
export function materialSymbolName(id: string): string {
  if (id.includes(':')) return id
  return `material-symbols:${id.replace(/_/g, '-')}`
}
