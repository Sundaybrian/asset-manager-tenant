import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

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
  // {
  //     path: "reports",
  //     component: Reports,
  //     text: "reports",
  //     icon: DataUsageIcon,
  //     layout: "/company",
  // },
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
