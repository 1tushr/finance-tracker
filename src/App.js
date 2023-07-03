import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Router>
        <Routes>
          <Route path="/" element={<Signup></Signup>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/header" element={<Header></Header>}></Route>
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
