import { NavLink } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";

const NavLinkComponent = ({ url, label }) => {

    const theme = useTheme();

    return (
        <NavLink key={url} to={url}
        >
            {() => (
                <Typography
                    variant="button"
                    sx={{
                        display: "block",
                        paddingX: "0.1rem",
                        textTransform: 'none'
                    }}
                    color={theme.palette.primary.main}
                >
                    {label}
                </Typography>)
            }

        </NavLink >
    )
}

export default NavLinkComponent;