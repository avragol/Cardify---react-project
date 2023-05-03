import { Fragment, useState } from "react";
import RRPButtonPartial from "./RRPButtonPartial";
import RRPButton2Partial from "./RRPButton2Partial";

const ReRenderPage = () => {
    const [isActive, setIsActive] = useState(true);

    const handleToggleClick = () => {
        setIsActive(!isActive);
    }
    const handleBtn2Click = () => {
        //console.log("btn 2 clicked");
    }
    return (
        <Fragment>
            <h1>Re Render Page</h1>
            <button onClick={handleToggleClick}>{isActive ? "active" : "not active"}</button>
            <RRPButtonPartial isActive={isActive} />
            <RRPButton2Partial onClick={handleBtn2Click}>Click me to activate something</RRPButton2Partial>
        </Fragment>
    )
}
export default ReRenderPage;