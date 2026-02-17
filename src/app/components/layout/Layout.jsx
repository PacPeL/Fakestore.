import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Drawer from "../drawer/Drawer";
import "./layout.scss";

const Layout = () => {
  return (
    <div className="appShell">
      <Drawer />
      <Header />

      <main className="appShell__content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
