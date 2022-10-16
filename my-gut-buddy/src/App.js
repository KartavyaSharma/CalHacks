import './Assets/Styles/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from './Pages/CreateAccount';
import LogIn from './Pages/LogIn';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route exact path="/createaccount" element={<CreateAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
