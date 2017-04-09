/**
 * Created by zilixiang on 4/7/17.
 */
import React, { Component } from 'react';
import { ComfirmButton } from './CSFComponents';
import Flatpickr from 'react-flatpickr'
import { observable } from 'mobx'
import { Link } from 'react-router-dom'
import back from '../img/back.png';
import "App.css";
// TODO: update by onChange event function

// TODO: (optional)More about form in React; need to update later
// https://facebook.github.io/react/docs/forms.html
export const SelectLocation = ()=>(
    <div>
        <div className="Select-Header">
            <h2 className="Select-Header">Create a field - step 1</h2>
        </div>
        <div className="Select-Input">
            <h3>Where is your field?</h3>
            <input type="text" name="LocationInput" placeholder="Ithaca, NY" />
        </div>
        <Link to="/capacity"> <ComfirmButton content="Continue"/> </Link>
    </div>
)

export const SelectCapacity = ()=>(
    <div>
        <div className="Select-Header">
            <Link to="/irrigation"><div className="prev"><img src={back} width="10px" /></div></Link>
            <h2 className="Select-Header">Create a field - step 2</h2>
        </div>

        <div className="Select-Input">
            <h3>Where is the soil water capacity of your field?</h3>
            <form>
                <input type="radio" name="Location" value="3" />High (Clay) <br/>
                <input type="radio" name="Location" value="2" /> Medium (Loam) <br/>
                <input type="radio" name="Location" value="1" /> Sand (Sand)
            </form>

        </div>
        <Link to="/croptype"> <ComfirmButton content="Continue"/> </Link>


    </div>
)

export const SelectCropType = ()=>(
    <div>
        <div className="Select-Header">
            <Link to="/capacity"><div className="prev"><img src={back} width="10px" /></div></Link>
            <h2 className="Select-Header">Create a field - step 3</h2>
        </div>

        <div className="Select-Input">
            <h3>What is your crop?</h3>
            <form>
                <input type="radio" name="Crop" value="1" />Grass <br/>
                <input type="radio" name="Crop" value="2" />Cereals <br/>
                <input type="radio" name="Crop" value="3" />Forages <br/>
                <input type="radio" name="Crop" value="4" />Grapes(Wine) <br/>
                <input type="radio" name="Crop" value="5" />Legumes <br/>
                <input type="radio" name="Crop" value="6" />Roots and Tubers <br/>
                <input type="radio" name="Crop" value="7" />Vegetables <br/>
            </form>

        </div>
        <Link to="/lastirrigation"> <ComfirmButton content="Continue"/> </Link>

    </div>
)

export const SelectLastIrrigation = ()=>(
    <div>
        <div className="Select-Header">
            <Link to="/croptype"><div className="prev"><img src={back} width="10px" /></div></Link>
            <h2 className="Select-Header">Create a field - step 4</h2>
        </div>

        <div className="Select-Input">
            <h3>What was your last irrigation?</h3>
            <form>
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