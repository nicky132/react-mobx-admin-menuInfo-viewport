import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
export default function Layout(props) {
  console.log(props.children, "1");
  return (
    <div>
      {/* <BottomNav></BottomNav> */}
      {/* <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/life" element={<LifeService />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes> */}
      {/* <PrivateRoute path="/" /> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}
