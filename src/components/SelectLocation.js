/**
 * Created by zilixiang on 5/7/17.
 */
import React, { Component } from 'react';
import { ComfirmButton } from '../CSFComponents';

import "../App.css";
import MdNavigateBefore from 'react-icons/lib/md/navigate-before'
import { updateLocation } from '../actions'
import { getAttrObj } from '../reducers'
import { connect } from 'react-redux'
import jsonp from 'jsonp'
import { Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'

class SelectLocation extends Component {
    constructor(props) {
        super(props);

        this.onClick = props.onClick;

        this.state={
            coords : null,
            timestamp : null,
            longitude : null,
            latitude : null,
            countryName : null,
            regionName: null,
            city : null,
            zipCode : null,
            HDF5 : null,
            clim : null
        }
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
                        this.setState({HDF : data});
                    }
                })

                jsonp('http://tools.climatesmartfarming.org/irrigationtool/clim/', {
                    data : {
                        lat: this.state.latitude.toString(),
                        lon: this.state.longitude.toString(),
                        format: 'json'
                    }
                }, (err, data)=> {
                    if (err) console.error(err);
                    else {
                        console.log(data);
                        this.setState({clim : data});
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
        var a = this.getData();
    }
    // componentWillUnmount = () => {
    //     navigator.geolocation.clearWatch(this.watchID);
    // }

    render () {
        return (
            <div id="div1">
                <div className="Select-Header">
                    <h2 className="Select-Header">Create a field - step 1</h2>
                </div>
                <div className="Select-Input">
                    <h3 id="id3">Where is your field?</h3>
                    <input type="text" name="LocationInput" placeholder={ "lon: " + this.state.longitude + ", lat: " + this.state.latitude } />
                </div>
                <Link to="/capacity"> <Button bsSize="large" onClick={ this.onClick } id="primaryButton" block active>Continue</Button> </Link>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({location:state.location})
const mapDispatchToProps = (dispatch) => ({onClick:updateLocation})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectLocation)
