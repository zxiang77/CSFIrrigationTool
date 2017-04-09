/**
 * Created by zilixiang on 4/7/17.
 */

import React, { Component } from 'react';
import { ComfirmButton } from './CSFComponents';
import "App.css";
const DisplayProfile = (props)=>(
    <div>

    </div>
);

const DisplayWeather = (props)=>(
    <div>

    </div>
);

const SinceLastIrrigate = (props)=>(
    <div>

    </div>
);

class MainPage extends Component {
    render() {
        return (
            <div>
                <div className="Select-Header">
                    {/* Put a Hamburger Icon here */}
                    <div className="Hamburger"></div>
                    <div id="displayLocation" className="Location">Ithaca, NY</div>
                    {/* Put a Setting Icon here */}
                    <div className="Setting"></div>
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

        )
    }
}

export default  MainPage;