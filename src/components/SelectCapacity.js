import React, { Component } from 'react';
import { ComfirmButton } from '../CSFComponents';
import 'flatpickr/dist/flatpickr.min.css'
import { Link } from 'react-router-dom'
import "../App.css";
import { connect } from 'react-redux'
import { updateLocation } from '../actions'
import MdNavigateBefore from 'react-icons/lib/md/navigate-before'
import { Button } from 'react-bootstrap'
import { updateSoilType, updateCropType, updateIrrigation } from '../actions'

class SelectCapacity extends Component{
    constructor(props){
        super(props)
        this.state = { sType : '' }
        this.onClick = props.onClick;
    }

    handleChange(e) {
        console.log(e)
        this.setState( { sType : e.target.value } )
    }

    render() {

        const onChangeHandler = (e) => {
            console.log(e.target)
            // console.log(e.target.value)
            this.setState({ sType : e.target.value })
        }

        const vals = [ {value: "Clay", text : "High (Clay)"}, {value: "Loam", text : "Medium (Loam)"}, {value: "Sand", text : "Low (Sand)"} ]

        const Input = (props) => (<div> <input type="radio" name="Location" 
                                               onChange= { onChangeHandler } 
                                               value={ props.value } 
                                               checked = { this.state.sType === props.value } /> { props.text } </div> )

        const inputs = vals.map( (val, index) => (<div key={index.toString()}> <Input value={ val.value } text={ val.text } /> <br/> </div>) )
//
        return (
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
                        { inputs }
                    </form>
                </div>
                <Link to="/croptype"> <Button bsSize="large" onClick={ () => { this.onClick(this.state)} } id="primaryButton" block active>Continue</Button> </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick(soilType){
            dispatch(
                updateSoilType(soilType)
            )
        }
    }
}
//
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectCapacity)