import "./App.css";
import MainProvider from "./providers/MainProvider";
import { Router } from "./router";

function App() {
  return (
    <MainProvider>
      <Router />
    </MainProvider>
  );
}

export default App;
