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
import { LineMarkSeries } from 'react-vis';
import * as d3 from 'd3';
// import { Chart } from 'react-d3-core';
// import { LineChart } from 'react-d3-basic';


/** react-d3 is no longer under any maintenance (last update about 1-2 years ago),
 * all the examples are written in jsx, instead of ES
 *
 * potential data visualization packages such as d3-vis don't have enough documentation
 * so data visualization part will be halted for the moment
 *  so our project will not use react
 */

export default class ProfilePlot extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.renderSVG();
  }

    componentDidUpdate() {
        this.renderSVG();
    }

    renderSVG() {
        var height = 236
        var width = 335
        var dataset = [0.1, -0.2, -0.7];
        var yScale = d3.scaleLinear().domain([-1.5, 0.5]).range([height, 0]);
        var xScale = [50, 150, 250];

        var color = function(dfnumber){
            var colorSet = ["#17C543", "#F7E53C", "#F67E23", "#FF4638"];
            if(dfnumber > - 1.5 && dfnumber < -0.8){
                return colorSet[3];
            } if (dfnumber >= - 0.8 && dfnumber < -0.5){
                return colorSet[2];
            } if (dfnumber >= - 0.5 && dfnumber < - 0){
                return colorSet[1];
            } if (dfnumber >= - 0&& dfnumber < 0.5){
                return colorSet[0];
            };
        }

        var svg = d3.select("#svg").attr("height", height).attr("width", width)
        var ticks = [0, -0.5, -0.8]

var defs = svg.append("defs");

    var gradient = defs.append("linearGradient")
       .attr("id", "svgGradient")
       .attr("x1", "0%")
       .attr("x2", "100%")
       .attr("y1", "0%")
       .attr("y2", "100%");

    gradient.append("stop")
       .attr('class', 'start')
       .attr("offset", "0%")
       .attr("stop-color", "red")
       .attr("stop-opacity", 1);

    gradient.append("stop")
       .attr('class', 'end')
       .attr("offset", "100%")
       .attr("stop-color", "blue")
       .attr("stop-opacity", 1);

        svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(0))
        .attr("x2", width)
        .attr("y2", yScale(0))
        .attr("stroke", "#f6f6f6")
        .attr("stroke-width", 1)

        svg.append("text")
        .text("No Deficit")
        .attr("x", width/2)
        .attr("y", yScale(0.2))
        .attr("font-family", "Open Sans")
        .attr("font-weight", 100)
        .attr("font-size", 22)
        .attr("text-anchor", "middle")
        .attr("alignment-baselin", "middle")
        .attr("fill", "#D4D4D4")

        svg.append("text")
        .text("Deficit, No Stress")
        .attr("x", width/2)
        .attr("y", yScale(-0.3))
        .attr("font-family", "Open Sans")
        .attr("font-weight", 100)
        .attr("font-size", 22)
        .attr("text-anchor", "middle")
        .attr("alignment-baselin", "middle")
        .attr("fill", "#D4D4D4")

        svg.append("text")
        .text("Deficit, Stress")
        .attr("x", width/2)
        .attr("y", yScale(-0.7))
        .attr("font-family", "Open Sans")
        .attr("font-weight", 100)
        .attr("font-size", 22)
        .attr("text-anchor", "middle")
        .attr("alignment-baselin", "middle")
        .attr("fill", "#D4D4D4")

        svg.append("text")
        .text("Severe Stress")
        .attr("x", width/2)
        .attr("y", yScale(-1.2))
        .attr("font-family", "Open Sans")
        .attr("font-weight", 100)
        .attr("font-size", 22)
        .attr("text-anchor", "middle")
        .attr("alignment-baselin", "middle")
        .attr("fill", "#D4D4D4")

        svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(-0.5))
        .attr("x2", width)
        .attr("y2", yScale(-0.5))
        .attr("stroke", "#f6f6f6")
        .attr("stroke-width", 1)

        svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(-0.8))
        .attr("x2", width)
        .attr("y2", yScale(-0.8))
        .attr("stroke", "#f6f6f6")
        .attr("stroke-width", 1)

        svg.append("line")
        .attr("x1", 50)
        .attr("y1", yScale(dataset[0]))
        .attr("x2", 150)
        .attr("y2", yScale(dataset[1]))
        .attr("stroke", "#979797")
        .attr("stroke-width", 3)

        svg.append("line")
        .attr("x1", 150)
        .attr("y1", yScale(dataset[1]))
        .attr("x2", 250)
        .attr("y2", yScale(dataset[2]))
        .attr("stroke", "#979797")
        .attr("stroke-width", 3)

        svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cy", function(d){
            return yScale(d);
        })
        .attr("cx", function(d,i){
            return width/6+i*100;
        })
        .attr("id", function(d,i){
            return "circle"+i;
        })
        .attr("r", 7.5)
        .attr("fill", "#fff")
        .attr("stroke-width", 5)
        .attr("stroke",function(d){
            return color(d);
        })
        .attr("class","circle")
        .on("click", function(d, i){
            d3.select(".number").remove();
            console.log(this);
            for(var j=0; j<3; j++){
                if(j==i){
                    d3.select("#circle"+j).transition().attr("stroke-width", 25);
                    svg.append("text").text(d)
                    .attr("class", "number")
                    .attr("y", yScale(d)+5)
                    .attr("x", function(d,j){
                            return width/6+i*100;
                        }).attr("fill","#343434");
                } else {
                    d3.select("#circle"+j).transition().attr("stroke-width", 5);
                }
            }
        });

        //line graph

        var lineData = [ { "x": 1, "y": 20},  { "x": 80, "y": 80},
                 { "x": 160, "y": 40}, { "x": 240, "y": 160},
                 { "x": 320, "y": 20},  { "x": 400, "y": 240}];

        var lineFunction = svg.selectAll(".gradientLine").data(lineData).enter()
                        .append("line")
                        .attr("class", ".gradientLine")
                        .x(function(d) { return d.x; })
                        .y(function(d) { return d.y; })
                        .interpolate("cardinal");

        var svg = d3.select("body").append("svg")
                                   .attr("width", 500)
                                   .attr("height", 300);

        var defs = svg.append("defs");
        var gradient = defs.append("linearGradient")
           .attr("id", "svgGradient")
           .attr("x1", "0%")
           .attr("x2", "100%")
           .attr("y1", "0%")
           .attr("y2", "100%");
        gradient.append("stop")
           .attr('class', 'start')
           .attr("offset", "0%")
           .attr("stop-color", "red")
           .attr("stop-opacity", 1);
        gradient.append("stop")
           .attr('class', 'end')
           .attr("offset", "100%")
           .attr("stop-color", "blue")
           .attr("stop-opacity", 1);

        var line = svg.append("path")
                      .attr("d", lineFunction(lineData))
                      .attr("stroke-width", 3)
                      .attr("stroke", "url(#svgGradient)")
                      .attr("fill", "none");
    }

    render() {
        return (<svg id="svg"></svg>);
    }
}

