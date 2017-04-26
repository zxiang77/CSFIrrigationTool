import React, { Component } from 'react';
import './App.css';
// import { UpdateInfo } from "./UpdateIrrigationInfo"
import { StartPage } from './StartPage';
import { SelectLocation, SelectCapacity, SelectCropType, SelectLastIrrigation } from './CreateField';
import MainPage from './Main';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

// TODO: next-> adding mobx stored global variables -- April 12th

class App extends Component {

    render() {
        // const MainPg = ()=>(
        //     <div>
        //         <MainPage />
        //     </div>
        //
        // );

        // console.log(MainPage);
        // console.log(StartPage);
        // console.log(MainPg)
        // const MainPg =  MainPage;
    return (
    <Router>
        <div>
            <div className="App">
                {/*<MainPage/>*/}
            </div>
            <Route exact path="/" component={StartPage} />
            <Route path="/location" component={SelectLocation} />
            <Route path="/croptype" component={SelectCropType} />
            <Route path="/capacity" component={SelectCapacity} />
            <Route path="/lastirrigation" component={SelectLastIrrigation} />
            <Route path="/main" component={MainPage} />
        </div>
    </Router>

    );
    }
}

export default App;

