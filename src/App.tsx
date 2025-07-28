import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { ActionsDemo } from "./components/ActionsDemo";
import { UseActionStateDemo } from "./components/UseActionStateDemo";
import { UseFormStatusDemo } from "./components/UseFormStatusDemo";
import { UseOptimisticDemo } from "./components/UseOptimisticDemo";
import { RefsAsPropsDemo } from "./components/RefsAsPropsDemo";
import { UseWithPromisesDemo } from "./components/UseWithPromisesDemo";
import { UseWithContextDemo } from "./components/UseWithContextDemo";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actions" element={<ActionsDemo />} />
        <Route path="/use-action-state" element={<UseActionStateDemo />} />
        <Route path="/use-form-status" element={<UseFormStatusDemo />} />
        <Route path="/use-optimistic" element={<UseOptimisticDemo />} />
        <Route path="/refs-as-props" element={<RefsAsPropsDemo />} />
        <Route path="/use-with-promises" element={<UseWithPromisesDemo />} />
        <Route path="/use-with-context" element={<UseWithContextDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
