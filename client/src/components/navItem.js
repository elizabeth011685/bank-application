import {Link} from "react-router-dom";
import {useContext} from "react";
import {CurrentOptionContext} from "../contexts/CurrentOptionContext";

function NavItem({href, classNames, label}) {
    const {setCurrentOption} = useContext(CurrentOptionContext)
    const handleClick = (e)=>{
        let str = e.target.href;
        let index = str.indexOf('/src');

        let currentOption = str.substring(index, str.length);
        setCurrentOption(currentOption)
    }
    return (
        <li className="nav-item">
            <Link to={href} className={classNames} onClick={handleClick}>{label}</Link>
        </li>
    );
}

export default NavItem;