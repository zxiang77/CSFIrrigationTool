import React, { Component } from 'react';
import './App.css';
import { UpdateInfo } from "./UpdateIrrigationInfo"
import { StartPage } from './StartPage'
import { SelectLocation, SelectCapacity, SelectCropType, SelectLastIrrigation } from './CreateField'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

class App extends Component {
    render() {
    return (
    <Router>
        <div>
            {/*<div className="App">*/}
                {/*<SelectLocation/>*/}
            {/*</div>*/}
            <Route exact path="/" component={SelectLocation}></Route>
            <Route path="/croptype" component={SelectCropType}></Route>
            <Route path="/capacity" component={SelectCapacity}></Route>
            <Route path="/lastirrigation" component={SelectLastIrrigation}></Route>
        </div>

    </Router>

    );
    }
}

export default App;

