/** Tiny classname joiner — keeps conditional Tailwind strings readable
 *  without pulling in clsx/tailwind-merge for a site this small. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
