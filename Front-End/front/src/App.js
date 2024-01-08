import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductsDash from "./components/ProductDash";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductsDash />} />
      </Routes>
    </div>
  );
}

export default App;
