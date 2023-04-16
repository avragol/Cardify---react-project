import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

const NavLinkComponent = ({ url, label }) => {
    return (
        <NavLink key={url} to={url}
        >
            {() => (
                <Typography
                    variant="button"
                    sx={{
                        display: "block",
                        paddingX: "0.1rem",
                    }}
                >
                    {label}
                </Typography>)
            }

        </NavLink >
    )
}

export default NavLinkComponent;