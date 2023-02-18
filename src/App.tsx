import "@fontsource/abel";
import "@fontsource/akronim";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages";

function App() {
  return (
    <ErrorBoundary>
      <Index />
    </ErrorBoundary>
  );
}

export default App;
