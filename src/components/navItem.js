import {Link} from "react-router-dom";

function NavItem({href, classNames, label}) {

    return (
        <li className="nav-item">
            <Link to={href} className={classNames}>{label}</Link>
        </li>
    );
}

export default NavItem;