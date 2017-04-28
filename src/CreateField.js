/**
 * Created by zilixiang on 4/7/17.
 */
import React, { Component } from 'react';
import { ComfirmButton } from './CSFComponents';
import Flatpickr from 'react-flatpickr'
import { observable } from 'mobx'
import { Link } from 'react-router-dom'
import back from '../img/back.png';
import "./App.css";
import MdNavigateBefore from 'react-icons/lib/md/navigate-before'
import jsonp from 'jsonp'
// import { getDataForLocation, getClimDataForLocation } from '../irrigationtool/js/toolinit'

// TODO: update by onChange event function

// TODO: adding redux, Call API after @longitude and @latitude are set
// https://facebook.github.io/react/docs/forms.html



export default class SelectLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords : null,
            timestamp : null,
            longitude : null,
            latitude : null,
            countryName : null,
            regionName: null,
            city : null,
            zipCode : null,
            HDF5 : null
        }
        // var watchID = (null: ?number);
    }


    async getData() {
        await navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({coords : position,
                    longitude : position.coords.longitude,
                    latitude : position.coords.latitude});

                // ERROR : API is not receiving param passed and returns a default response
                jsonp('http://tools.climatesmartfarming.org/irrigationtool/datahdf5/', {
                    lat : this.state.latitude.toString(),
                    lon : this.state.longitude.toString(),
                    year : '2017',
                    format : 'json'
                }, (err, data)=> {
                    if (err) console.error(err);
                    else {
                        console.log(data);
                        console.log(err);
                        this.setState({HDF : data});
                    }
                })

                jsonp('http://tools.climatesmartfarming.org/irrigationtool/clim/', {
                    lat : this.state.latitude.toString(),
                    lon : this.state.longitude.toString(),
                    format : 'json'
                }, (err, data)=> {
                    if (err) console.error(err);
                    else {
                        console.log(data);
                        console.log(err);
                        this.setState(data);
                    }
                })


            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // var lastPosition = JSON.stringify(position);
            this.setState(position);
        });

        // get location related state param
        var url = 'https://freegeoip.net/json/';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                this.setState({
                    countryName: responseJson.country_name,
                    regionName: responseJson.region_name,
                    city : responseJson.city,
                    zipCode : responseJson.zip_code
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount = () => {

        this.getData();

        // http://tools.climatesmartfarming.org/irrigationtool/clim/?callback=jQuery1124006531113705645974_1493253074520&lat=43.217628&lon=-77.550749&format=json&_=1493253074521



    }
    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render () {
        return (
            <div id="div1">
                <div className="Select-Header">
                    <h2 id = "id2" className="Select-Header">Create a field - step 1</h2>
                </div>
                <div className="Select-Input">
                    <h3 id="id3">Where is your field?</h3>
                    <input id = "input1" type="text" name="LocationInput" placeholder={ "lon: " + this.state.longitude + ", lat: " + this.state.latitude } />
                </div>
                <Link to="/capacity"> <ComfirmButton content="Continue"/> </Link>
            </div>
        )
    }
}

// export const SelectLocation = ()=>(
//
// )

export const SelectCapacity = ()=>(
    <div id="div2">
        <div className="Select-Header">
            <Link to="/location"><div className="prev">
                <MdNavigateBefore width="30px" />
                {/*<img src={back} width="10px" />*/}
            </div></Link>
            <h2 id = "id4" className="Select-Header">Create a field - step 2</h2>
        </div>

        <div className="Select-Input">
            <h3 id="id5">What is the soil water capacity of your field?</h3>
            <form id="form1">
                <input type="radio" name="Location" value="3" /> High (Clay) <br/><br/>
                <input type="radio" name="Location" value="2" /> Medium (Loam) <br/><br/>
                <input type="radio" name="Location" value="1" /> Sand (Sand)
            </form>

        </div>
        <Link to="/croptype"> <ComfirmButton content="Continue"/> </Link>


    </div>
)

export const SelectCropType = ()=>(
    <div id="div3" className="Select-Header">
        <div className="Select-Header">
            <Link to="/capacity"><div className="prev"><MdNavigateBefore /></div></Link>
            <h2 className="Select-Header">Create a field - step 3</h2>
        </div>

        <div className="Select-Input">
            <h3 id="id6">What is your crop?</h3>
            <form id = "form2">
                <input type="radio" name="Crop" value="1" /> Grass <br/>
                <input type="radio" name="Crop" value="2" /> Cereals <br/>
                <input type="radio" name="Crop" value="3" /> Forages <br/>
                <input type="radio" name="Crop" value="4" /> Grapes(Wine) <br/>
                <input type="radio" name="Crop" value="5" /> Legumes <br/>
                <input type="radio" name="Crop" value="6" /> Roots and Tubers <br/>
                <input type="radio" name="Crop" value="7" /> Vegetables <br/>
            </form>

        </div>
        <Link to="/lastirrigation"> <ComfirmButton content="Continue"/> </Link>

    </div>
)

export const SelectLastIrrigation = ()=>(
    <div>
        <div className="Select-Header">
            <Link to="/croptype"><div className="prev">
                {/*<img src={back} width="10px" />*/}
                <MdNavigateBefore />
            </div></Link>
            <h2 id="id7" className="Select-Header">Create a field - step 4</h2>
        </div>

        <div className="Select-Input">
            <h3 id="id8">What was your last irrigation?</h3>
             <form id="form3">
                <Flatpickr
                    name="time"
                    onChange={v => console.info(v)}
                    options={{dateFormat: 'd-m-Y',
                        enableTime:false}}/>
            </form>

        </div>
        <Link to="/main"> <ComfirmButton content="Create"/> </Link>

    </div>
)