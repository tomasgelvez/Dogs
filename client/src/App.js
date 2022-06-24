import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/Lading-Page/LadingPage.js'
import Home from './components/Home/Home.js';
import PostDog from './components/PostDog/PostDog.js';
import About from './components/About/About.js';
import DogDetail from './components/DogDetail/DogDetail.js'
import Filters from './components/Filters/Filters';
// import DogsCards from './components/Card/Card.js'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
    <Route exact path='/' component = {LandingPage}/>
    <Route exact path='/home' component = {Home}/>
    <Route exact path='/post' component = {PostDog}/>
    <Route exact path= '/home/:id' component = {DogDetail}/>
    <Route exact path='/about' component={About}/>
    <Route exact path='/filters' component={Filters}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
