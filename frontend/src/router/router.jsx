import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/minipage/About";
import PrivacyPolicy from "../pages/minipage/privacyPolicy";
import Contactus from "../pages/minipage/contactus";

const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/about-us",
                element:<About/>,
            },
            {
                path:"/privacy-policy",
                element:<PrivacyPolicy/>,
            },
            {
                path:"/contact-us",
                element:<Contactus/>,
            },
            

        ]
    },
])

export default router;