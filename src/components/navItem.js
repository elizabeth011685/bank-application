
function NavItem({href, classNames, label}) {

    return (
        <li className="nav-item">
            <a className={classNames} href={href} >{label}</a>
        </li>
    );
}

export default NavItem;