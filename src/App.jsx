import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/e-commerce/" element={<Home />} />
        <Route path="/e-commerce/e-commerce/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
