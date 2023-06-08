import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./container/Home";
import Detail from "./container/Detail";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddForm />} />
          <Route path="/show/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<EditForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
