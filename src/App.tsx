import "./App.css";
import { BlogPage } from "./components/blog/blog";
import Navbar from "./components/layout/Navbar";
import Home from "./components/sections/home";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <BlogPage/>
    </>
  );
}

export default App;
