import { Navigate, useRoutes } from 'react-router-dom';
import { AuthenticatedTemplate,UnauthenticatedTemplate } from "@azure/msal-react";
// layouts
import DashboardLayout from './layouts/dashboard';
//
import User from './pages/User';
import NotFound from './pages/Page404';
// import Register from './pages/Register2';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import { Protected } from "./pages/Protected";
import Resturants from "./pages/Resturants";
import {Menu} from './pages/Menu';
// ----------------------------------------------------------------------
import { Home } from './pages/Home';
import { RestaurantView } from './pages/RestaurantsComponents/RestaurantView';


export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <><AuthenticatedTemplate><DashboardLayout /></AuthenticatedTemplate><UnauthenticatedTemplate><Navigate to="/"/></UnauthenticatedTemplate></>,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'resturants', element: <Resturants/> },
        { path: 'menu', element: <Menu/> },
        { path: 'view/:id', element: <RestaurantView/> },
       
      ],
    },
    {
      path: '/',
      element: <Home/>,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        
      ],
    },
    {
      path: '/',
      element: <Protected />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
