import { Grid } from "@mui/material";
import {
  ClipboardCopy,
  FileUpload,
  Layout,
  Toast,
  Editor,
  SkeletonLoader,
} from "../components";
import { useEditor } from "../hooks";

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
