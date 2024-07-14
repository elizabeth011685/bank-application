import './App.css';
import NavBar from "./components/navbar";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Deposit from "./pages/deposit";
import Home from "./pages/home";
import CreateAccount from "./pages/create-account";
import Withdraw from "./pages/withdraw";
import AllData from "./pages/all-data";
import {UserContext} from "./contexts/UserContext";
import {useContext, useState, useMemo} from "react";
import Footer from "./components/footer";
import {CurrentOptionContext} from "./contexts/CurrentOptionContext";
import {ApiUrlContext} from "./contexts/Context";
import Login from "./pages/login";
import firebase from "./firebase";
/*
function useAuthState() {
    const [user, setUser] = useState(null);
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
            setUser({email: firebaseUser.email});
        } else {
            setUser(null);
        }
    });
    return [user, setUser];
}

*/

function App() {

    //const [user, setUser] = useAuthState();
    const [user, setUser] = useState(null);
    console.log(user);
    const [currentOption, setCurrentOption] = useState("/");
    const homeElem = useMemo(() => <Home />, []);
    const loginElem = useMemo(() => <Login />, []);
    const createAccountElem = useMemo(() => <CreateAccount />, []);
    const depositElem = useMemo(() => <Deposit />, []);
    const withdrawElement = useMemo(() => <Withdraw />, []);
    const allDataElement = useMemo(() => <AllData />, []);

    return (
            <BrowserRouter>
                <div className="App">
                    <ApiUrlContext.Provider value="http://localhost:8080">
                        <UserContext.Provider value={{user, setUser}}>
                            <CurrentOptionContext.Provider value={{currentOption, setCurrentOption}}>
                                <NavBar/>
                                <Routes>
                                    <Route path="/" element={homeElem} exact/>
                                    <Route path="/src/pages/login" element={loginElem} exact/>
                                    <Route path="/src/pages/create-account" element={createAccountElem} exact/>
                                    <Route path="/src/pages/deposit" element={depositElem} exact/>
                                    <Route path="/src/pages/withdraw" element={withdrawElement} exact/>
                                    <Route path="/src/pages/all-data" element={allDataElement} exact/>
                                </Routes>
                            </CurrentOptionContext.Provider>
                        </UserContext.Provider>
                    </ApiUrlContext.Provider>
                    <Footer/>
                </div>
            </BrowserRouter>
    );
}

export default App;
