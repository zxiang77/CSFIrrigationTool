/**
 * Created by zilixiang on 4/7/17.
 */
import React, { Component } from 'react';
import { ComfirmButton } from './CSFComponents';
import { inject, observer } from 'mobx-react'

// @inject("store")
// @observer
export const StartPage = (props)=>(
    <div>
        <h2>Welcome to CSF Wate Deficit Calculator!</h2>
        <img src="irrigationtool/images/csf-logo-darker.png" />
        <ComfirmButton content="Start Creating a Field"/>
    </div>
)