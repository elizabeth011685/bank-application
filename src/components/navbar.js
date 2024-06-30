import {UserContext} from '../contexts/UserContext';
import logo from "../logo-24.svg";
import userImg from "../user.svg";
import {useContext} from "react";
const logoStyle = {
    marginRight:5,
};
const barStyle = {
    backgroundColor: "#e3f2fd",
};

const nameStyle = {
    display: "flex",
    justifyContent: "flex-end",
    width: "50%",
};


function NavBar() {
    const { user } = useContext(UserContext);

    return(
        <nav className="navbar navbar-expand-lg navbar-light" style={barStyle}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="logo" style={logoStyle}/>
                    Bad Bank</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/src/pages/create-account">Create Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/src/pages/deposit">Deposit</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/src/pages/withdraw">Withdraw</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/src/pages/all-data">All Data</a>
                        </li>

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