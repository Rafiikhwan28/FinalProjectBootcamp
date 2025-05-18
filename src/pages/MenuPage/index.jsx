import { Button } from "@mui/material";
import Footer from "../../component/Footer";
import HomePage from "../../component/homepage1";
import PageDestinasi from "../../component/MenuDestinasi/PageDestinasi";
import Navbar from "../../component/Navbar";
import Promo from "../../component/Promo";
import { Link } from "react-router-dom";
import Activity from "../../component/Activity";
import Baner from "../../component/Baner";


const MenuPage = () =>{


    return(
        <div>
            <Navbar/>
            <HomePage/>
            <div className="items-center justify-center">
                <Promo/>
                <Link to="/promo">
                    <Button variant="contained" className="absolute">All</Button>
                </Link>
            </div>
            <div className="items-center justify-center">
                <PageDestinasi/>
                <Link to="/page-destinasi">
                    <Button variant="contained" className="absolute">All</Button>
                </Link>
            </div>
            <div className="items-center justify-center">
                <Activity/>
                <Link to="/activity">
                    <Button variant="contained" className="absolute">All</Button>
                </Link>
            </div>
            <div className="items-center justify-center">
                <Baner/>
                <Link to="/baner">
                    <Button variant="contained" className="absolute">All</Button>
                </Link>
            </div>
            <Footer/>
        </div>
    )
}
export default MenuPage;