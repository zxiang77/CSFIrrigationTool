/**
 * Created by zilixiang on 5/1/17.
 */
import * as types from '../constants/ActionTypes';
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {

    let result

    console.groupCollapsed(`dispatching action => ${action.type}`)
    result = next(action)
    let { changeLocation } = store.getState()

    console.log(`

		changeLocation: ${changeLocation}

	`)

    console.groupEnd()

    return result

}

export default (initialState={}) => {
    return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState)
}
