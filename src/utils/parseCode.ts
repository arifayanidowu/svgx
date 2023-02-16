import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

type Options = {
  singleQuote: boolean;
};
export const parseCode = (code: string) => {
  return (config: Options) => {
    const formattedCode = prettier.format(code, {
      parser: "babel",
      plugins: [parserBabel],
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
