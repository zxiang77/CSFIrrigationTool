import React, { Component } from 'react';
import './App.css';
// import { UpdateInfo } from "./UpdateIrrigationInfo"
import { StartPage } from './StartPage';
import { SelectCapacity, SelectCropType, SelectLastIrrigation } from './CreateField';
import SelectLocation from './components/SelectLocation';
import MainPage from './Main';
// import { createStore } from 'redux'
import { updateLocation } from './actions'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

// TODO: next-> adding mobx stored global variables -- April 12th

class App extends Component {
    constructor(props){
        super(props)
        this.location=props.location
    }

    render() {
        const SelectLocationVar = ()=>(
            <SelectLocation onClick={()=>updateLocation(this.state)} />
        )

        const mainPageVar = (location)=>(
            <MainPage location={this.location} />
        )

        return (
        <Router>
            <div>
                <div className="App">
                    {/*<MainPage/>*/}
                </div>
                <Route exact path="/" component={StartPage} />
                <Route path="/location" component={SelectLocationVar} />
                <Route path="/croptype" component={SelectCropType} />
                <Route path="/capacity" component={SelectCapacity} />
                <Route path="/lastirrigation" component={SelectLastIrrigation} />
                <Route path="/main" component={mainPageVar} />
            </div>
        </Router>

        );
    }
}

export default App;

