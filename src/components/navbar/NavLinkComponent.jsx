import { NavLink } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";

const NavLinkComponent = ({ url, label }) => {

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    return (
        <NavLink key={url} to={url}
        >
            {() => (
                <Typography
                    variant="button"
                    sx={{
                        display: "block",
                        paddingX: "0.1rem",
                        textTransform: 'none',
                        textDecoration: "none",
                        fontWeight: isDarkMode ? "400" : "500"
                    }}
                    color={"white"}
                >
                    {label}
                </Typography>)
            }

        </NavLink >
    )
}

export default NavLinkComponent;