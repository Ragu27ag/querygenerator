import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainHome from "./Pages/MainHome";
import Generate from "./Pages/Generate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHome />}>
          <Route index element={<Generate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
