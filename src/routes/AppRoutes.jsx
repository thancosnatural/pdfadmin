import { Routes, Route } from "react-router-dom";

import PdfUpload from "../pages/PdfUploader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotFound from "../pages/Notfound";

const AppRoutes = () => (
 <>
 <Header />
  <Routes>
    <Route path="/" element={<PdfUpload />} />
     <Route path="*" element={<NotFound />} />
  </Routes>
  <Footer />
 </>
);

export default AppRoutes;
