import "./header.css";
import { useDispatch } from 'react-redux';
import { setMap } from "../../store/mapSlice";

function Header () {
    const dispatch = useDispatch();
    return (<>
        <div className={"header"}>
            <h1 onClick={() => {dispatch(setMap(undefined))}}>Roborally Map Editor</h1>
        </div>
    </>)
}

export default Header;