/**
 * Created by zilixiang on 4/7/17.
 */
import React, { Component } from 'react';
import { ComfirmButton } from './CSFComponents';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css'
// import { observable } from 'mobx'
import { Link } from 'react-router-dom'
// import back from '../img/back.png';
import "./App.css";
import MdNavigateBefore from 'react-icons/lib/md/navigate-before'
// import { connect } from 'react-redux'
// import { createStore, applyMiddleware } from 'redux'
import { updateSoilType, updateCropType, updateIrrigation } from './actions'

// import { getDataForLocation, getClimDataForLocation } from '../irrigationtool/js/toolinit'
// https://facebook.github.io/react/docs/forms.html

export const SelectCapacity = ()=>(
    <div id="div2">
        <div >
            <Link to="/location"><div className="prev">
                <MdNavigateBefore width="30px" />
                {/*<img src={back} width="10px" />*/}
            </div></Link>
            <h2 className="Select-Header">Create a field - step 2</h2>
        </div>

        <div className="Select-Input">
            <h3>What is the soil water capacity of your field?</h3>
            <form id="form1">
                <input type="checkbox" name="Location" value="3" /> High (Clay) <br/><br/>
                <input type="checkbox" name="Location" value="2" /> Medium (Loam) <br/><br/>
                <input type="checkbox" name="Location" value="1" /> Sand (Sand)
            </form>

        </div>
        <Link to="/croptype"> <ComfirmButton onClick={updateSoilType("placeholder")} content="Continue"/> </Link>


    </div>
)

export const SelectCropType = ()=>(
    <div>
        <div>
            <Link to="/capacity"><div className="prev"><MdNavigateBefore /></div></Link>
            <h2 className="Select-Header">Create a field - step 3</h2>
        </div>

        <div className="Select-Input">
            <h3 id="id6">What is your crop?</h3>
            <form id="form2">
                <input type="checkbox" name="Crop" value="1" /> Grass <br/><br/>
                <input type="checkbox" name="Crop" value="2" /> Cereals <br/><br/>
                <input type="checkbox" name="Crop" value="3" /> Forages <br/><br/>
                <input type="checkbox" name="Crop" value="4" /> Grapes(Wine) <br/><br/>
                <input type="checkbox" name="Crop" value="5" /> Legumes <br/><br/>
                <input type="checkbox" name="Crop" value="6" /> Roots and Tubers <br/><br/>
                <input type="checkbox" name="Crop" value="7" /> Vegetables <br/>
            </form>

        </div>
        <Link to="/lastirrigation"> <ComfirmButton onClick={updateCropType("placeholder")} content="Continue"/> </Link>

    </div>
)

export const SelectLastIrrigation = ()=>(
    <div>
        <div>
            <Link to="/croptype"><div className="prev">
                <MdNavigateBefore />
            </div></Link>
            <h2 id="id7" className="Select-Header">Create a field - step 4</h2>
        </div>

        <div className="Select-Input">
            <h3>What was your last irrigation?</h3>
             <form>
                 <Flatpickr data-enable-time
                            onChange={v => console.info(v)} />
            </form>

        </div>
        <Link to="/main"> <ComfirmButton onClick={updateIrrigation("placeholder")} content="Create"/> </Link>

    </div>
)
