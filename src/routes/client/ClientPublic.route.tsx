import { ClientLayout } from "@/layouts";
import AboutPage from "@/pages/About.page";
import ContactPage from "@/pages/Contact.page";
import HomePage from "@/pages/Home.page";
import { Route } from "react-router-dom";
import { ROUTER_URL } from "../router.const";

export const ClientPublicRoutes = (
  <Route element={<ClientLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path={ROUTER_URL.ABOUT} element={<AboutPage />} />
    <Route path={ROUTER_URL.CONTACT} element={<ContactPage />} />
  </Route>
);
