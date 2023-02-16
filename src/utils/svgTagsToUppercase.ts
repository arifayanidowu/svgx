export const svgTagsToUpperCase = (svg: string) => {
  const parsedSvgString = svg.replace(
    /<(\w+)|<\/(\w+)|\w+-\w+=/g,
    (match, p1, p2, p3) => {
      if (p1) {
        return `<${p1.charAt(0).toUpperCase()}${p1.substring(1)}`;
      } else if (p2) {
        return `</${p2.charAt(0).toUpperCase()}${p2.substring(1)}`;
      } else {
        const [prop1, prop2] = match.split("-");
        return `${prop1}${prop2.charAt(0).toUpperCase()}${prop2.slice(1)}`;
      }
    }
  );
  return parsedSvgString;
};
