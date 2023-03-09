import Home from "./Home";
import ViewNote from "./ViewNote";
import EditNote from "./EditNote";
import {Routes, Route, BrowserRouter as Router, BrowserRouter} from "react-router-dom";
import EmptyNote from "./EmptyNote";


export default function App() {
  // localStorage.clear();
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="/base/" element={<EmptyNote/>} />
          <Route path="/view/:id" element={<ViewNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}