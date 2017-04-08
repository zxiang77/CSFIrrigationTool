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
            <Route exact path="/" component={StartPage} />
            <Route path="/location" component={SelectLocation} />
            <Route path="/croptype" component={SelectCropType} />
            <Route path="/capacity" component={SelectCapacity} />
            <Route path="/lastirrigation" component={SelectLastIrrigation} />
        </div>
    </Router>

    );
    }
}

export default App;

