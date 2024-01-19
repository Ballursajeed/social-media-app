import './App.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./component/Header/Header"
import Login from "./component/Login/Login"
import { useEffect } from "react";
import { loadUser } from "./Actions/User"
import { useDispatch } from "react-redux";

function App() {

 const dispatch = useDispatch();

 useEffect(() => {
      dispatch(loadUser());
 },[])

  return (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
  );
}

export default App;
