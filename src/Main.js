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
import { connect } from 'react-redux'
import RecentStatus from './RecentStatus';
// import { updateLocation, updateSoilType, updateCropType, updateIrrigation } from './actions'
import ProfilePlot from './ProfilePlot'
const DisplayProfile = (props)=>(
    <div id="profile">
        {/*<ProfilePlot />*/}
    </div>
);

const DisplayWeather = (props)=>(
    <div id="weather">
        <table className="table">
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

// const SinceLastIrrigate = (props)=>(
//     <div id="recentstatus">

//     </div>
// );

export class MainPage extends Component {
    constructor(props){
        super(props)
        this.location = props.location
        console.log(this.location)
}

    render() {
        const height10 = {
            height : "20px"
        }
        return (
            <div id = "mainPage">
                <div>
                    {/* Put a Hamburger Icon here */}
                    <div className="Hamburger"> <MdSort /> </div>
                    <div className="location">{this.location.city}, {this.location.regionName}</div>
                    {/* Put a Setting Icon here */}
                    <div className="Setting"> <MdSetting /> </div>
                </div>
                <ul>
                    <li>
                        <p id = "futureDays">Future 3 days</p>
                        <div id = "date1"> May 8 </div> 
                        <div id = "date2"> May 9 </div> 
                        <div id = "date3"> May 10 </div>
                        <div id = "line"> </div> 
                        <div id = "line2"> </div> 
    
                        <ProfilePlot />
                    </li>
                    <div style={height10}></div>
                    <li>
                        <p className = "displace">Weather Forecast</p>
                        <DisplayWeather />
                    </li>

                </ul>
                <ComfirmButton content="I watered!"/>
            </div>

        );
    }
}

const mapStateToProps = state => (
    {location : state.changeLocation}
)

export default connect(mapStateToProps)(MainPage);