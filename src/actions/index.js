import * as types from '../constants/ActionTypes'

// const initialState = {
//     location: {},
//     lastIrrigation: "",
//     cropType: "",
//     soilType: ""
// }

const receiveLocation = location => ({
  type: types.EDIT_LOCATION,
  newLocation: location
})

const receiveSoilType = soilType => ({
  type: types.EDIT_SOIL_TYPE,
  newSoilType: soilType
})

const receiveCropType = cropType => ({
  type: types.EDIT_CROP_TYPE,
  newCropType: cropType
})

const receiveIrrigation = irrigation => ({
  type: types.EDIT_LAST_IRRIGATION,
  newIrrigation: irrigation
})
// store.dispatch(getAllProducts())
// export const getAllProducts = () => dispatch => {
//     shop.getProducts(products => {
//         dispatch(receiveProducts(products))
//     })
// }

export const updateLocation = location => (dispatch, getState) => {
    console.log("sssssss");
  	// const { curState } = getState();
    dispatch(receiveLocation(location))
}

export const updateSoilType = soilType => (dispatch, getState) => {
	  // const { curState } = getState();
    dispatch(receiveSoilType(soilType))
}

export const updateCropType = cropType => (dispatch, getState) => {
	  // const { curState } = getState();
    dispatch(receiveCropType(cropType))
}

export const updateIrrigation = irrigation => (dispatch, getState) => {
	  // const { curState } = getState();
    dispatch(receiveIrrigation(irrigation))
}