import { Grid } from "@mui/material";
import {
  ClipboardCopy,
  FileUpload,
  Layout,
  Toast,
  Editor,
  SkeletonLoader,
} from "../components";
import Notice from "../components/Notice";
import { useEditor } from "../hooks";
import { useAppSelector } from "../state/hooks";
// import { parseCode } from "../utils/parseCode";

const Index = () => {
  const {
    code,
    setCode,
    output,
    open,
    clipboardText,
    handleCopy,
    handleClose,
    appLoading,
  } = useEditor();
  const { framework } = useAppSelector((state) => state.app);

  const handleChange = (value: string) => {
    const file = new File([value], "file.svg", {
      type: "image/svg+xml",
    });

    if (file.type !== "image/svg+xml") {
      alert("Please upload a valid SVG file");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (text) {
          setCode(text?.toString());
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Layout>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          overflowX: "hidden",
        }}
      >
        <Grid item md={6} sx={{ position: "relative", width: "100%" }}>
          <>
            {appLoading ? (
              <SkeletonLoader />
            ) : (
              !code && <FileUpload setCode={setCode} />
            )}

            <Editor
              mode="tsx"
              code={code}
              name="svg-editor"
              onChange={handleChange}
            />
          </>
        </Grid>
        <Grid item md={6} sx={{ width: "100%", position: "relative" }}>
          {!output ? null : (
            <ClipboardCopy onCopy={handleCopy} text={clipboardText} />
          )}
          {!appLoading ? null : <SkeletonLoader />}
          <Editor mode="tsx" code={output} name="svg-editor" isReadOnly />
          <Notice
            visible={!!output && framework === "react-native"}
            title="To use SVG in React Native, install the 'react-native-svg' package"
          />
        </Grid>
      </Grid>
      <Toast
        open={open}
        message="Copied to clipboard"
        handleClose={handleClose}
      />
    </Layout>
  );
};

export default Index;
