/**
 * Created by zilixiang on 4/7/17.
 */

import React, { Component } from "react";
import { ComfirmButton } from './CSFComponents';
import "./App.css";
import MdNavigateBefore from 'react-icons/lib/md/navigate-before';
import MdSort from 'react-icons/lib/md/sort';
import MdSetting from 'react-icons/lib/md/settings';

const DisplayProfile = (props)=>(
    <div id="profile">

    </div>
);

const DisplayWeather = (props)=>(
    <div id="weather">

    </div>
);

const SinceLastIrrigate = (props)=>(
    <div id="recentstatus">

    </div>
);

export class MainPage extends Component {
    render() {
        return (
            <div>
                <div className="Select-Header">
                    {/* Put a Hamburger Icon here */}
                    <div className="Hamburger"> <MdSort /> </div>
                    <div id="displayLocation" className="Location">Ithaca, NY</div>
                    {/* Put a Setting Icon here */}
                    <div className="Setting"> <MdSetting /> </div>
                </div>
                <ul>
                    <li>
                        <p>Future 3 days</p>
                        <DisplayProfile />
                    </li>
                    <li>
                        <p>Weather Forcast</p>
                        <DisplayWeather />
                    </li>
                    <li>
                        <p>Since last irrigation</p>
                        <SinceLastIrrigate />
                    </li>
                </ul>
                <ComfirmButton content="I watered!"/>
            </div>

        );
    }
}

export default MainPage;