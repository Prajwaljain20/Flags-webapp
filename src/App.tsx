import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./components/home/home";
import { Details } from "./components/details/details";
import { useEffect } from "react";
import { Navbar } from "./components/navbar/navbar";

function App() {
  useEffect(() => {
    console.log("🙏Thanks for Using🙏\nCoded By: Prajwal Jain");
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="card/:id" element={<Details />}></Route>
        <Route path="/*" element={<Redirect />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return <></>;
};

export default App;
