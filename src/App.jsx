import Login from "./pages/login";
import MenuPage from "./pages/MenuPage";
import { Route, Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom"
import Register from "./pages/register";
import DetailDestinasi from "./component/MenuDestinasi/DetailDestinasi";
import User from "./pages/User";
import PageDestinasi from "./component/MenuDestinasi/PageDestinasi";
import Promo from "./component/Promo";
import UserList from "./component/Userlist";
import DetailPromo from "./component/Promo/DetailPromo";
import Activity from "./component/Activity";
import DetailActivity from "./component/Activity/DetailActivity";
import Cart from "./component/Carts";
import Baner from "./component/Baner";



import AdminDashboard from "./pages/Admin/AdminDashboard";
import ListBaner from "./pages/Admin/BanerAdmin";
import Header from "./pages/Admin/HeaderAdmin";
import Sidebar from "./pages/Admin/Slider";
import ActivityAdmin from "./pages/Admin/ActivityAdmin";
import CategoryAdmin from "./pages/Admin/CategoryAdmin";
import PromoAdmin from "./pages/Admin/PromoAdmin";
import PaymentMethod from "./component/Pyment";
import ProfilePage from "./component/Profil";
import DetailBanner from "./component/Baner/DetailBaner";






export function App () {
  return(
    <>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<MenuPage/>}/>
        <Route path="/destinasi-detail/:id" element={<DetailDestinasi/>}/>
        <Route path="/page-destinasi" element={<PageDestinasi/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/userlist" element={<UserList/>}/>
        <Route path="/promo" element={<Promo/>}/>
        <Route path="/detail-promo/:id" element={<DetailPromo/>}/>
        <Route path="/User" element={<User/>}/>
        <Route path="/activity" element={<Activity/>}/>
        <Route path="/detail-activity/:id" element={<DetailActivity/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/paymen" element={<PaymentMethod/>}/>
        <Route path="/baner" element={<Baner/>}/>
        <Route path="/detail-baner/:id" element={<DetailBanner/>}/>


        {/* Dashboard */}
        <Route path="/header-admin" element={<Header/>}/>
        <Route path="/slider-admin" element={<Sidebar/>}/>
        <Route path="/activity-admin" element={<ActivityAdmin/>}/>
        <Route path="/category-admin" element={<CategoryAdmin/>}/>
        <Route path="/listBaner-admin" element={<ListBaner/>}/>
        <Route path="/promo-admin" element={<PromoAdmin/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

 
