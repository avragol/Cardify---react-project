import { Navigate, Route, Routes } from "react-router-dom";

import ROUTES from "./ROUTES";
import PayloadProtectedRoute from "./PayloadProtectedRoute";
import LoggedProtectedRoute from "./LoggedProtectedRoute";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import FavoritesPage from "../pages/FavoritesPage";
import MyCardsPage from "../pages/MyCardsPage";
import SandboxPage from "../pages/SandboxPage/SandboxPage";
import HarryPotterPage from "../pages/SandboxPage/HarryPotterPage";
import UseMemo from "../pages/SandboxPage/UseMemo";
import ReRenderPage from "../pages/SandboxPage/ReRenderPage";
import AboutPage from "../pages/AboutPage";
import CRMPage from "../pages/CRMPage";


const Router = () => {
    return (
        <Routes>
            {/* pages for all */}
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.CRM} element={<CRMPage />} />
            {/* pages for users only */}
            <Route path={ROUTES.PROFILE} element={
                <LoggedProtectedRoute element={<ProfilePage />} />} />
            <Route path={ROUTES.FAV} element={
                <LoggedProtectedRoute element={<FavoritesPage />} />} />
            {/* pages for biz users only */}
            <Route path={ROUTES.MYCARDS} element={
                <PayloadProtectedRoute
                    isBiz={true} isAdmin={false} element={<MyCardsPage />} />} />
            {/* pages for admins only */}
            <Route path={ROUTES.SANDBOX} element={
                <PayloadProtectedRoute
                    isBiz={false} isAdmin={true} element={<SandboxPage />} />}>
                <Route path={"harrypotter"} element={<HarryPotterPage />} />
                <Route path={"usememo"} element={<UseMemo />} />
                <Route path={"rerender"} element={<ReRenderPage />} />
            </Route>
            {/* 404 page */}
            <Route path="*" element={<span><h1>404</h1><p>Opsss... page not found</p></span>} />
        </Routes>
    )
}

export default Router;