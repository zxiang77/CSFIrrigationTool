/**
 * Created by zilixiang on 4/25/17.
 */
// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import d3 from 'd3';
import { Chart } from 'react-d3-core';
import { LineChart } from 'react-d3-basic';

export default class ProfilePlot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            generalChartData : [
                {deficit : .2, date : 1},
                {deficit : .3, date : 2},
                {deficit : .1, date : 3}
            ],
            chartSeries : {
                field : 'deficit',
                name : 'Deficit',
                color: '#ff7f0e'
            },
            x : (d) => d.index,
            xDomain : d3.extent(this.state.generalChartData, this.state.x),
            xLabel : "Index",
            y : (d) => d,
            yDomain : d3.extent(this.state.generalChartData, (d) => {return d.deficit;}),
            yLabel : "Deficit",
            yLabelPosition : 'right'

        }
    }

    render() {
        return (
            <Chart>
                <LineChart
                    data= {this.state.generalChartData}
                    chartSeries= {this.state.chartSeries}
                    x= {this.state.x}
                    xDomain= {this.state.xDomain}
                    xLabel = {this.state.xLabel}
                    y= {this.state.y}
                    yDomain= {this.state.yDomain}
                    yLabel = {this.state.yLabel}
                    yLabelPosition = {this.state.yLabelPosition}
                />
            </Chart>
        );
    }
}
