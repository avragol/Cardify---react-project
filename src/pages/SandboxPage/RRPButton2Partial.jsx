import { memo } from "react";

const RRPButton2Partial = ({ children, onClick }) => {
    //console.log("btn2");
    return (<button onClick={onClick}>
        {children}
    </button>)
}
export default memo(RRPButton2Partial);