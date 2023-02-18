import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-tsx";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow";
import "brace/mode/jsx";
import "brace/mode/xml";
import { useAppSelector } from "../state/hooks";

interface IEditorProps {
  mode: string;
  name: string;
  code: string;
  onChange?: (value: string, event: any) => void;
  onPaste?: (value: string) => void;
  debounceChangePeriod?: number;
  isReadOnly: boolean;
  placeholder?: string;
}

export const Editor = ({
  mode,
  name,
  code,
  onPaste,
  debounceChangePeriod,
  isReadOnly,
  placeholder,
}: IEditorProps) => {
  const { isLightMode } = useAppSelector((state) => state.app);

  return (
    <AceEditor
      mode={mode}
      theme={isLightMode ? "tomorrow" : "tomorrow_night"}
      name={name}
      fontSize={12}
      showPrintMargin={true}
      showGutter={true}
      onPaste={onPaste}
      highlightActiveLine={true}
      value={code}
      debounceChangePeriod={debounceChangePeriod}
      editorProps={{ $blockScrolling: Infinity }}
      setOptions={{ showFoldWidgets: false, autoScrollEditorIntoView: true }}
      readOnly={isReadOnly}
      placeholder={placeholder}
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
