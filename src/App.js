import logo from './logo.svg';
import './App.css';
import NavBar from "./components/navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Deposit from "./pages/deposit";
import Home from "./pages/home";
import CreateAccount from "./pages/create-account";
import Withdraw from "./pages/withdraw";
import AllData from "./pages/all-data";


function App() {
  return (
      <>
      <BrowserRouter>
          <div className="App">
              <NavBar/>

                  <Routes>
                      <Route path="/" element={<Home />} exact />
                      <Route path="/src/pages/create-account" element={<CreateAccount />} exact />
                      <Route path="/src/pages/deposit" element={<Deposit />} exact />
                      <Route path="/src/pages/withdraw" element={<Withdraw />} exact />
                      <Route path="/src/pages/all-data" element={<AllData />} exact />
                  </Routes>
          </div>
      </BrowserRouter>
      </>

  );
}

export default App;
