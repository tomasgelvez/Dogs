import { Route } from "react-router-dom";
import "./App.css";
import DogDetail from "./components/DogDetail/DogDetail.js";
import { BrowserRouter, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/home/:id" component={DogDetail} />
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
