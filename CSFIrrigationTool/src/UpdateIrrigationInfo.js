/**
 * Created by zilixiang on 3/12/17.
 */
import React, { Component } from 'react';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import {ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap'
var DatePicker = require('react-datepicker');

function createPercentageList() {
    var i;
    var ret = [];
    for (i = 0; i < 20; i++) {
         var tmp = {};
         tmp['value'] = 0.05 + 0.05 * i;
         tmp['label'] = String(5 + 5 * i) + "%";
         ret.push(tmp);
    }
    return ret;
}

var percentList = createPercentageList();

// a function for dropdown menu activation
function changePercentage() {

}

const ContinueButton = ()=>(
    <Button bsSize="large" id="primaryButton" active>Yes, continue</Button>
);

export const ButtonGroupInstance = ()=>(
    <ButtonGroup>
        <DropdownButton title="Please select" id="bg-nested-dropdown">
            {percentList.map((percent, i) =>
                <MenuItem key = {i} eventKey={ percent['value'] }> { percent['label'] } </MenuItem>
            )}
        </DropdownButton>
    </ButtonGroup>
);

class UpdateInfoTable extends Component{
    constructor(props) {
        super(props);
        this.state = {startDate: moment()};
    }

    render() {
        return (
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
                        </td>{/* a select needed */}
                    </tr>
                    <tr>
                        <th>Last Irrigation:</th>
                        <td>
                            <DatePicker
                                className="textcenter"
                                selected={ this.state.startDate }
                                onChange={ this.handleChange } />
                        </td>{/* a select needed */}
                    </tr>
                    <tr>
                        <th>Amount:</th>
                        <td>
                            <ButtonGroupInstance />
                        </td>
                    </tr>
                </tbody>
            </table>
        )

    }
}

export const UpdateInfo=() =>
    <div>
        <h3 id="header">Is this your last irrigation?</h3>
        <UpdateInfoTable />
        <ContinueButton/>
    </div>
