import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

const NavLinkComponent = ({ url, label }) => {
    return (
        <NavLink key={url} to={url}
        >
            {({ isActive }) => (
                <Typography
                    variant="button"
                    sx={{
                        display: "block",
                        paddingX: "0.3rem",
                    }}
                    color={isActive ? "lightgreen" : "#9C27B0"}
                >
                    {label}
                </Typography>)
            }

        </NavLink >
    )
}

export default NavLinkComponent;