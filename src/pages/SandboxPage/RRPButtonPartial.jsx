const RRPButtonPartial = ({ isActive }) => {
    return (
        <button style={{ background: `${isActive ? "red" : "blue"}` }}>
            Click
        </button>
    )
}
export default RRPButtonPartial;