import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Registration from "./Registernew";
import Home from './home';
function App() {
  return (
    <div className="App">
      <div id="google_translate_element"></div>
      <Router>
        <Route path="/registration" component={Registration}></Route>
        <Route path="/home" component={Home}></Route>
      </Router>
    </div>
  );
}

export default App;
