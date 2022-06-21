import { Route } from "react-router-dom";
import "./App.css";
import DogDetail from "./components/DogDetail/DogDetail.js";
import { BrowserRouter, Switch } from "react-router-dom";
import LadingPage from "./components/Lading-Page/LadingPage.js";
import Home from "./components/Home/Home.js";
import About from "./components/About/About";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LadingPage} />
          <Route exact path='/home' component = {Home}/>
          <Route exact path="/home/:id" component={DogDetail} />
          <Route exact path='/about' component={About}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
