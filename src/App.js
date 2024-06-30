import logo from './logo.svg';
import './App.css';
import NavBar from "./components/navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Deposit from "./components/deposit";
import Home from "./components/home";
import CreateAccount from "./components/create-account";
import Withdraw from "./components/withdraw";
import AllData from "./components/all-data";

function App() {
  return (
      <>
      <BrowserRouter>
          <div className="App">
              <NavBar/>
              <br />
                  <Routes>
                      <Route path="/" element={<Home />} exact />
                      <Route path="/create-account" element={<CreateAccount />} exact />
                      <Route path="/deposit" element={<Deposit />} exact />
                      <Route path="/withdraw" element={<Withdraw />} exact />
                      <Route path="/all-data" element={<AllData />} exact />
                  </Routes>
          </div>
      </BrowserRouter>
      </>

  );
}

export default App;
