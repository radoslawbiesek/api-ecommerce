export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD") //for example è decomposes to as e +  ̀
    .replace(/[\u0300-\u036F]/g, "") // removes combining marks
    .replace(/ /g, "-") // replaces spaces with hyphens
    .replace(/[^\w.-]+/g, ""); // removes all non-word characters except for dots and hyphens
}
