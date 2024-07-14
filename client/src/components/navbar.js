import {UserContext} from '../contexts/UserContext';
import logo from "../logo-24.svg";
import firebase from "../firebase";
import {useContext, useState} from "react";
import NavItem from "./navItem";
import {CurrentOptionContext} from "../contexts/CurrentOptionContext";
import {Link, useNavigate} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
const logoStyle = {
    marginRight:5,
};
const barStyle = {
    backgroundColor: "#e3f2fd",
};

function NavBar() {
    const {user, setUser} = useContext(UserContext);
    const {currentOption} = useContext(CurrentOptionContext)
    let navigate = useNavigate();

    let logout= ()=>{
        firebase.auth().signOut();
        setUser(null);
        navigate("/src/pages/login");

    }


    const options = [
        {
            href: "/src/pages/login",
            label: "Login",
            className: ["nav-link"],
            loginRequired : false
        },
        {
            href: "/src/pages/create-account",
            label: "Create Account",
            className: ["nav-link"],
            loginRequired : false
        },
        {
            href: "/src/pages/deposit",
            label: "Deposit",
            className: "nav-link",
            loginRequired : true
        },
        {
            href: "/src/pages/withdraw",
            label: "Withdraw",
            className: "nav-link",
            loginRequired : true
        },
        {
            href: "/src/pages/all-data",
            label: "All Data",
            className: "nav-link",
            loginRequired : true
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
                                if ((option.loginRequired && user) || (!option.loginRequired && !user)) {
                                    let classNames = [];
                                    classNames.push(option.className);
                                    if (option.href === currentOption) {
                                        classNames.push("active");
                                    }
                                    return <NavItem classNames={classNames.join(" ")} label={option.label}
                                                    href={option.href} key={index}/>
                                }

                            }
                        )}

                    </ul>
                </div>

                {user && (
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                            {user.name} ({user.email})
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logout} >Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}

            </div>
        </nav>);
}

export default NavBar;