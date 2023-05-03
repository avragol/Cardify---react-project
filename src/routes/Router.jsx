import { Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
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


const Router = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.FAV} element={<FavoritesPage />} />
            <Route path={ROUTES.MYCARDS} element={<MyCardsPage />} />
            <Route path={ROUTES.SANDBOX} element={<SandboxPage />}>
                <Route path={"harrypotter"} element={<HarryPotterPage />} />
                <Route path={"usememo"} element={<UseMemo />} />
                <Route path={"rerender"} element={<ReRenderPage />} />
            </Route>
            <Route path="*" element={<span><h1>404</h1><p>Opsss... page not found</p></span>} />
        </Routes>
    )
}

export default Router;