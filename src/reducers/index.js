/**
 * Created by zilixiang on 5/1/17.
 */
import * as types from '../constants/ActionTypes';

const lastIrrigation = (state, action) => {
    switch (action.type) {
        case types.EDIT_LAST_IRRIGATION:
            return {
                ...state,
                lastIrrigation : action.updateIrrigation
            }
        default:
            return state
    }
}

const changeSetting = (state, action) => {
    /**
     * action = {type : ACTION_TYPE, updateIrrigation : null/data, updateSoilType : null/data}
     *
     */
    switch (action.type) {
        case types.EDIT_LOCATION:
            return {
                ...state,
                lastIrrigation : action.updateIrrigation
            }

        case types.EDIT_SOIL_TYPE:
            return {
                ...state,
                soilType : action.updateSoilType
            }
        default:
            return state
    }
}

// export const EDIT_LOCATION = 'EDIT_LOCATION'
// export const EDIT_LAST_IRRIGATION = 'EDIT_LAST_IRRIGATION'
// export const EDIT_SOIL_TYPE = 'EDIT_SOIL_TYPE'
// export const EDIT_PROFILES = 'EDIT_PROFILES'