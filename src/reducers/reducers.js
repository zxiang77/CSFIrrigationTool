/**
 * Created by zilixiang on 6/15/17.
 */
/**
 * Created by zilixiang on 5/1/17.
 */
import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux'

// {
//   "profiles" : [
//     {"location" : null, // object
//     "lastIrrigation": null, // string
//     "cropType" : null,
//     "soilType" : null
//     }
//   ]
// }

// initial state of a field
const initialState = {
    location: {},
    lastIrrigation: "",
    cropType: "",
    soilType: ""
}

/**
 *  only need to have reducers for each attribute and combine  them together with combinereducer
 *
 */

export const getAttrStr = (state, attr) =>
state[attr] || ""

export const getAttrObj = (state, attr) =>
state.location || {}

const changeLocation = (state = initialState.location, action) => {
    if (action.type === types.EDIT_LOCATION) {
        return action.newLocation;
    } else {
        return state;
    }
}

const changeSoilType = (state = initialState.soilType, action) => {
    if (action.type === types.EDIT_SOIL_TYPE) {
        return action.newSoilType;
    } else {
        return state;
    }

}

const changeCropType = (state = initialState.cropType, action) => {
    if (action.type === types.EDIT_CROP_TYPE) {
        return action.newCropType;
    } else {
        return state;
    }
}

const lastIrrigation = (state = initialState.lastIrrigation, action) => {
    if (action.type === types.EDIT_LAST_IRRIGATION) {
        return action.newIrrigation;
    } else {
        return state;
    }
}

// TODO: add a function looking profiles by Id

export default combineReducers({
    changeLocation,
    changeSoilType,
    changeCropType,
    lastIrrigation
})
