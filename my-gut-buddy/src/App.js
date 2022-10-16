import './Assets/Styles/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from './Pages/CreateAccount';
import LogIn from './Pages/LogIn';
import Home from './Pages/Home';
import Scan from './Pages/Scan';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route exact path="/createaccount" element={<CreateAccount />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/scan" element={<Scan />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
