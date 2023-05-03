import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const HarryPotterPage = () => {
    const [spellsState, setSpellsState] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let spellsData = (await axios.get("https://hp-api.onrender.com/api/spells")).data;
                if (spellsData) {
                    setSpellsState(spellsData);
                }
            }
            catch (err) {
                console.log(err);
            }
        })()
    }, [])

    return (
        <Fragment>
            <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Spell</StyledTableCell>
                            <StyledTableCell>Description</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {spellsState && spellsState.map((spell) => (
                            <StyledTableRow key={spell.name}>
                                <StyledTableCell component="th" scope="row">
                                    {spell.name}
                                </StyledTableCell>
                                <StyledTableCell>{spell.description}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}
export default HarryPotterPage