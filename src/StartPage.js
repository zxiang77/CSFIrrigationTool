/**
 * Created by zilixiang on 4/7/17.
 */
import React, { Component } from 'react';
import { ComfirmButton } from './CSFComponents';
import { Link } from 'react-router-dom';
import logo from './img/logo.png';
import "./App.css";

export default class StartPage extends Component{
    // add constructor

    render() {
        return (
            <div id = "welcomePage">
                <h2 id = "welcome">Welcome to CSF Wate Deficit Calculator!</h2>
                <img id = "image1" src={ logo } width="80%" alt = "logo" />
                <Link to="/location"> <ComfirmButton content="Start Creating a Field"/> </Link>
            </div>
            )
    }
}