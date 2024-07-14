import {UserContext} from '../contexts/UserContext';
import logo from "../logo-24.svg";
import userImg from "../user.svg";
import {useContext, useState} from "react";
import NavItem from "./navItem";
import {CurrentOptionContext} from "../contexts/CurrentOptionContext";
import {Link} from "react-router-dom";
const logoStyle = {
    marginRight:5,
};
const barStyle = {
    backgroundColor: "#e3f2fd",
};

function NavBar() {
    const {user} = useContext(UserContext);
    const {currentOption} = useContext(CurrentOptionContext)


    const options = [
        {
            href: "/src/pages/login",
            label: "Login",
            className: ["nav-link"]
        },
        {
            href: "/src/pages/create-account",
            label: "Create Account",
            className: ["nav-link"]
        },
        {
            href: "/src/pages/deposit",
            label: "Deposit",
            className: "nav-link"
        },
        {
            href: "/src/pages/withdraw",
            label: "Withdraw",
            className: "nav-link"
        },
        {
            href: "/src/pages/all-data",
            label: "All Data",
            className: "nav-link"
        }
        ];


    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={barStyle}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" style={logoStyle}/>Bank Application
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {options.map((option, index) => {
                                let classNames = [];
                                classNames.push(option.className);
                                if (option.href === currentOption) {
                                    classNames.push("active");
                                }
                                return <NavItem classNames={classNames.join(" ")} label={option.label} href={option.href} key={index}/>
                            }
                        )}
                    </ul>
                </div>
                <span className="navbar-text ms-auto">
                    <img src={userImg} alt="logo" style={barStyle}/>
                    {user.name}
                </span>
            </div>
        </nav>);
}

export default NavBar;