import { Fragment, useState, useMemo } from "react";

const UseMemo = () => {
    const [number, setNumber] = useState(0);
    const [txt, setTxt] = useState("");
    const calaNumber = useMemo(() => {
        let count = 0;
        for (let i = 0; i < 1000000000; i++) {
            count += number
        }
        return count;
    }, [number])
    const handleBtnClick = () => {
        setNumber(number + 1);
    }
    const handleInputChange = (ev) => {
        setTxt(ev.target.value);
    }
    return (
        <Fragment>
            <h1>{calaNumber}</h1>
            <button onClick={handleBtnClick}>Add a litle bit value</button>
            <input type="text" value={txt} onChange={handleInputChange}></input>
        </Fragment>
    )
}
export default UseMemo;