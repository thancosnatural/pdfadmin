import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// const mainbg = import.meta.env.MAIN_BG;
const MAIN_BG = 'https://thancos.s3.ap-southeast-2.amazonaws.com/background.png'

const MainLayout = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-fixed bg-white bg-center"
      // style={{ backgroundImage: `url(${MAIN_BG})` }}
    >
      <div className="bg-gradient-to-tr from-white via-yellow-50 to-yellow-100 min-h-screen">
        <Header />
        <main className="min-h-screen ">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
