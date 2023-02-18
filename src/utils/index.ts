import isSvg from "is-svg";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

type Options = {
  singleQuote: boolean;
};

const checkIsSvg = async (code: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (isSvg(code)) {
      resolve(code);
    } else {
      reject(new Error("Not a valid SVG"));
    }
  });
};

const extractTags = (svg: string) => {
  const tags = svg.match(/<\w+/g);
  let removeOpeningTags = tags?.map((tag) => tag.replace("<", ""));
  let convertToUppercase = removeOpeningTags
    ?.map((tag) => tag[0].toUpperCase() + tag.slice(1))
    .filter((tag) => tag !== "Svg")
    .filter((tag, index, arr) => arr.indexOf(tag) === index);
  return convertToUppercase;
};

const parseCode = (code: string) => {
  return (config: Options) => {
    const formattedCode = prettier.format(code, {
      parser: "babel",
      plugins: [parserBabel, "@svgr/plugin-prettier"],
      semi: true,
      singleQuote: config.singleQuote ?? false,
      jsxSingleQuote: config.singleQuote ?? false,
      trailingComma: "es5",
      arrowParens: "always",
      printWidth: 80,
      proseWrap: "always",
    });

    return formattedCode;
  };
};

const svgTagsToUpperCase = (svg: string) => {
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

const convertOutputToJsx = (
  code: string,
  framework: string,
  tags: string[]
) => {
  const output = `
      import React, {memo} from "react";
      ${
        framework === "react-native"
          ? `import Svg, { ${tags?.join(", ")} } from "react-native-svg"`
          : "\n"
      };
  
      function MySvg() {
          return (
              ${code.replace(/;/g, "")}
          );
      }
  
      export default memo(MySvg);
  `;
  return output;
};

const getOutput = async (code: string, framework: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    checkIsSvg(code)
      .then((svg) => {
        const tags = extractTags(svg);
        const output = convertOutputToJsx(svg, framework, tags!);
        resolve(output);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { checkIsSvg, extractTags, parseCode, svgTagsToUpperCase, getOutput };
