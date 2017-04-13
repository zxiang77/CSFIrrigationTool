/**
 * Created by zilixiang on 4/7/17.
 */
import React, { Component } from 'react';
import { ComfirmButton } from './CSFComponents';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import logo from '../irrigationtool/images/csf-logo-darker.png';
import "./App.css";

// @inject("store")
// @observer
export const StartPage = (props)=>(
    <div>
        <h2 id = "id1" >Welcome to CSF Wate Deficit Calculator!</h2>
        <img id = "image1" src={logo} width="80%" />
        <Link to="/location"> <ComfirmButton content="Start Creating a Field"/> </Link>
    </div>
)