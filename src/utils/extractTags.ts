export const extractTags = (svg: string) => {
  const tags = svg.match(/<\w+/g);
  let removeOpeningTags = tags?.map((tag) => tag.replace("<", ""));
  let convertToUppercase = removeOpeningTags
    ?.map((tag) => tag[0].toUpperCase() + tag.slice(1))
    .filter((tag) => tag !== "Svg")
    .filter((tag, index, arr) => arr.indexOf(tag) === index);
  return convertToUppercase;
};
