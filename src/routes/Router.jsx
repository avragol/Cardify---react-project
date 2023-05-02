import { Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import FavoritesPage from "../pages/FavoritesPage";
import MyCardsPage from "../pages/MyCardsPage";
import SandboxPage from "../pages/SandboxPage";


const Router = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.FAV} element={<FavoritesPage />} />
            <Route path={ROUTES.MYCARDS} element={<MyCardsPage />} />
            <Route path={ROUTES.SANDBOX} element={<SandboxPage />}>
                <Route path={"nestedpage1"} element={<h1>1</h1>} />
                <Route path={"nestedpage2"} element={<h1>2</h1>} />
                <Route path={"nestedpage3"} element={<h1>3</h1>} />
                <Route path={"nestedpage4"} element={<h1>4</h1>} />
            </Route>
            <Route path="*" element={<span><h1>404</h1><p>Opsss... page not found</p></span>} />
        </Routes>
    )
}

export default Router;