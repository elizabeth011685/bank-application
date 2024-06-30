import './App.css';
import NavBar from "./components/navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Deposit from "./pages/deposit";
import Home from "./pages/home";
import CreateAccount from "./pages/create-account";
import Withdraw from "./pages/withdraw";
import AllData from "./pages/all-data";
import {UserContext} from "./contexts/UserContext";
import {useState} from "react";

function App() {
    const [user, setUser] = useState({
        name: 'Guest',
        email: '',
        password: '',
        balance: 0
    });

    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <UserContext.Provider value={{user, setUser}}>
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<Home/>} exact/>
                            <Route path="/src/pages/create-account" element={<CreateAccount/>} exact/>
                            <Route path="/src/pages/deposit" element={<Deposit/>} exact/>
                            <Route path="/src/pages/withdraw" element={<Withdraw/>} exact/>
                            <Route path="/src/pages/all-data" element={<AllData/>} exact/>
                        </Routes>
                    </UserContext.Provider>
                </div>
            </BrowserRouter>
        </>

    );
}

export default App;
