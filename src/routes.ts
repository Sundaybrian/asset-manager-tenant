import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Reports from './pages/Dashboard/pages/Reports/index';
//icons
import DataUsageIcon from "@material-ui/icons/DataUsage";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";

export const defaultRoutes = [
  {
      path: "/register",
      exact: true,
      component: Register
  },
  // {
  //     path: "/forgot-password",
  //     exact: true,
  //     component: ForgotPasswordPage
  // },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
];

const dashboardRoutes = [
  {
      path: "reports",
      component: Reports,
      text: "reports",
      icon: DataUsageIcon,
      layout: "/company",
  },
  // {
  //     path: "merchants",
  //     component: Merchants,
  //     text: "merchants",
  //     icon: StorefrontIcon,
  //     layout: "/admin",
  // },
  // {
  //     path: "riders",
  //     component: Driver,
  //     text: "riders",
  //     icon: SportsMotorsportsIcon,
  //     layout: "/admin",
  // },
  // {
  //     path: "orders",
  //     component: Order,
  //     text: "orders",
  //     icon: ShoppingBasketIcon,
  //     layout: "/admin",
  // },
];

export default dashboardRoutes;
