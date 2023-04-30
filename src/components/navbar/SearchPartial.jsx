import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import ROUTES from '../../routes/ROUTES'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
        marginLeft: theme.spacing(2),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up("xs")]: {
            width: "0ch",
            "&:focus": {
                width: "15ch",
            },
        },
        [theme.breakpoints.up('md')]: {
            width: '20ch',
            "&:focus": {
                width: "30ch",
            },
        },

    },
}));

const SearchPartial = () => {
    //const [currentUrl, setCurrentUrl] = React.useState(window.location.href);
    const [searchInput, setSearchInput] = React.useState("");
    const navigate = useNavigate();
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);

    };
    React.useEffect(() => {

    }, [])
    React.useEffect(() => {
        let currentUrl = window.location.href;
        if (currentUrl.includes(ROUTES.FAV)) {
            currentUrl = ROUTES.FAV;
        } else if (currentUrl.includes(ROUTES.MYCARDS)) {
            currentUrl = ROUTES.MYCARDS;
        } else {
            currentUrl = ROUTES.HOME;
        }
        navigate(`${currentUrl}?filter=${searchInput}`);
    }, [searchInput]);


    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
                value={searchInput}
            />
        </Search>
    )
}
export default SearchPartial;