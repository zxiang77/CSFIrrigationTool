/**
 * Created by zilixiang on 3/16/17.
 */
import React, { Component } from 'react';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import {ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap'
import "App.css";
/**
 * TODO:
 * 1. finish global state connection
 * 2. finish display page
 * 3. finish router
 */

export const DisplayStatus = ()=>
    //Display date + water deficit status
    <div>

    </div>

export const DisplayFigure = ()=>
    <div>

    </div>

export const DisplayWeather = ()=>
    <div>

    </div>

export const DisplayProfile = ()=>
    <div>
        <table className="textcenter" style={{textAlign : "center"}}>
            <tbody>
            <tr>
                <th>Location:</th>
                <td>
                    <select
                        className="textcenter"
                        id="location">
                        <option
                            value="Ithaca, NY">Ithaca, NY</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Last Irrigation:</th>
                <td>
                    <Flatpickr
                        onChange={v => console.info(v)}
                        options={{dateFormat: 'd-m-Y',
                            enableTime:false}}/>
                </td>{/* a select needed */}
            </tr>
            </tbody>
        </table>
    </div>

export const DisplayInfo = ()=>
    <div>
        
    </div>