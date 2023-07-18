import {
  Link,
  Route,
  Routes,
  Outlet,
  NavLink,
  useLocation,
} from "react-router-dom";
import { v4 } from "uuid";
import { Welcome } from "./page/Welcome";
import { Gacha } from "./page/Gacha";
import { Dontstop } from "./page/Dontstop";

function App() {
  const info = useLocation();

  return (
    <div>
      <Navbar />
      <div className="lg:m-10 m-5">
      {info.pathname === "/" ? <Welcome/> : null}
        <Routes>
          <Route path={"" || "/"} element={<Outlet/>}>
            <Route path="gacha" element={<Gacha/>} />
            <Route path="dontstop" element={<Dontstop/>} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  );
}

function Notfound() {
  return (
    <div className="m-10">
      <h1>404 Notfound</h1><br/>
    </div>
  );
}

function Navbar () {
  const NavLiElement = (text="顯示文字", path="path") => {
    return <NavLink to={path} key={v4()} className="basis-32"><li>{text}</li></NavLink>
  }
  const liArray = [
    ["回首頁", "/"],
    ["抽卡統計表", "/gacha"],
    ["古戰場戰貨計算", "/dontstop"]
  ]

  return (<div className="bg-blue-50 p-4 ">
    <ol className="flex-row flex">
      { liArray.map( v => NavLiElement(v[0],v[1])) }
    </ol>
  </div>)
}

export default App;
