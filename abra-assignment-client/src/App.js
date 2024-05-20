import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import PetList from "./pages/PetList";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path="/petlist" element={<PetList/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
