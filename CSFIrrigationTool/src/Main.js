/**
 * Created by zilixiang on 4/7/17.
 */

import React, { Component } from 'react';
import { ComfirmButton } from './CSFComponents';

class MainPage extends Component {
    render() {
        return (
            <div>
                <div className="Select-Header">
                    {/* Put a Hamburger Icon here */}
                    <div className="Hamburger"></div>
                    <div id="displayLocation" className="Location">Ithaca, NY</div>
                    {/* Put a Setting Icon here */}
                    <div className="Setting"></div>
                </div>

                <ul><li></li></ul>
                <ComfirmButton content="I watered!"/>
            </div>

        )
    }
}

export default  MainPage;