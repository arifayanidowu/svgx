import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-tsx";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow";

import "brace/mode/jsx";
import "brace/mode/xml";
import { parseCode } from "../utils/parseCode";
import { useAppSelector } from "../state/hooks";

interface IEditorProps {
  mode: string;
  name: string;
  code: string;
  onChange?: (value: string) => void;
  debounceChangePeriod?: number;
  isReadOnly: boolean;
}

export const Editor = ({
  mode,
  name,
  code,
  onChange,
  debounceChangePeriod,
  isReadOnly,
}: IEditorProps) => {
  const { isSingleQuote, isLightMode } = useAppSelector((state) => state.app);
  const prettyCode = parseCode(code)({ singleQuote: isSingleQuote! });

  return (
    <AceEditor
      mode={mode}
      theme={isLightMode ? "tomorrow" : "tomorrow_night"}
      name={name}
      fontSize={13}
      showPrintMargin={true}
      showGutter={true}
      onChange={onChange}
      highlightActiveLine={true}
      value={prettyCode}
      debounceChangePeriod={debounceChangePeriod}
      editorProps={{ $blockScrolling: Infinity }}
      setOptions={{ showFoldWidgets: false }}
      readOnly={isReadOnly}
      height={window.innerHeight + "px"}
    />
  );
};

Editor.defaultProps = {
  mode: "tsx",
  name: "svg-editor",
  code: "",
  debounceChangePeriod: 300,
  isReadOnly: false,
  onChange: undefined,
};
