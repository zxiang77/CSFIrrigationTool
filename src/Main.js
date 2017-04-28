/**
 * Created by zilixiang on 4/7/17.
 */

import React, { Component } from "react";
import { ComfirmButton } from './CSFComponents';
import "./App.css";
import MdNavigateBefore from 'react-icons/lib/md/navigate-before';
import MdSort from 'react-icons/lib/md/sort';
import MdSetting from 'react-icons/lib/md/settings';
import MdCloudQueue from 'react-icons/lib/md/cloud-queue';
import MdWbSunny from 'react-icons/lib/md/wb-sunny';

// import { VictoryLine, VictoryBrushContainer } from 'victory';
// import { MarkSeries, LineSeries, HorizontalGridLines, XYPlot, XAxis, YAxis, LineMarkSeries, VerticalGridLines } from 'react-vis';
import ProfilePlot from './ProfilePlot'
const DisplayProfile = (props)=>(
    <div id="profile">
        {/*<ProfilePlot />*/}
    </div>
);

const DisplayWeather = (props)=>(
    <div id="weather">
        <table className="">
            <tbody>
                <tr>
                    <td>Today</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td>14</td>
                    <td>15</td>
                    <td>16</td>

                </tr>
                <tr>
                    <td><MdCloudQueue /></td>
                    <td><MdWbSunny /></td>
                    <td><MdWbSunny /></td>
                    <td><MdWbSunny /></td>
                    <td><MdCloudQueue /></td>
                    <td><MdCloudQueue /></td>
                    <td><MdCloudQueue /></td>
                </tr>
                <tr>
                    <td>30%</td>
                    <td>80%</td>
                    <td>30%</td>
                    <td>10%</td>
                    <td>30%</td>
                    <td>20%</td>
                    <td>30%</td>
                </tr>
            </tbody>
        </table>
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