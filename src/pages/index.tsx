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

            <Editor mode="tsx" code={code} name="svg-editor" isReadOnly />
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
            title="To use Svg in React Native, you need to install react-native-svg package."
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
