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
import Footer from "./components/footer";
import {CurrentOptionContext} from "./contexts/CurrentOptionContext";

function App() {
    const [user, setUser] = useState({
        name: 'Elizabeth Martinez Solano',
        email: 'elizabeth@hotmail.com',
        password: 'secret',
        balance: 1200
    });

    const [currentOption, setCurrentOption] = useState("/")

    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <UserContext.Provider value={{user, setUser}}>
                        <CurrentOptionContext.Provider value={{currentOption, setCurrentOption}} >
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<Home/>} exact/>
                            <Route path="/src/pages/create-account" element={<CreateAccount/>} exact/>
                            <Route path="/src/pages/deposit" element={<Deposit/>} exact/>
                            <Route path="/src/pages/withdraw" element={<Withdraw/>} exact/>
                            <Route path="/src/pages/all-data" element={<AllData/>} exact/>
                        </Routes>
                        </CurrentOptionContext.Provider>
                    </UserContext.Provider>
                    <Footer />
                </div>
            </BrowserRouter>
        </>

    );
}

export default App;
