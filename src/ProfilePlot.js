/**
 * Created by zilixiang on 4/25/17.
 */
// Copyright (c) 2016 - 2017 Uber Technologies, Inc.

import React from 'react';
import { LineMarkSeries } from 'react-vis';
import * as d3 from 'd3';

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
        d3.select("input[value=\"Prediction\"]").property("checked", true);
        var height = 236
        var width = 335
        var dataset = [0.1, -0.2, -0.7];
        var yScale = d3.scaleLinear().domain([-1.5, 0.5]).range([height, 0]);
        var xScale = [50, 150, 250];


        var svg = d3.select("#svg").attr("height", height).attr("width", width)
        dataVisualization();
        function dataVisualization() {
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


            var ticks = [0, -0.5, -0.8]

            var defs = svg.append("defs");

            var gradient = defs.append("linearGradient")
                .attr("id", "svgGradient1")
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
        }
        //line graph
        function lineGraph() {

            var lineData = [ { "x": 10, "y": 70},  { "x": 80, "y": 80},
                { "x": 160, "y": 40}, { "x": 240, "y": 110},
                { "x": 320, "y": 40},  ];
            var lineFunction = d3.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .curve(d3.curveCardinal)

            var defs = svg.append("defs");
            var gradient = defs.append("linearGradient")
                .attr("id", "svgGradient")
                .attr("x1", "0%")
                .attr("x2", "100%")
                .attr("y1", "0%")
                .attr("y2", "100%");

            gradient.append("stop")
            // .attr('class', 'start')
                .attr("offset", "0%")
                .attr("stop-color", "red")
                .attr("stop-opacity", 2);

            gradient.append("stop")
            // .attr('class', 'end')
                .attr("offset", "100%")
                .attr("stop-color", "yellow")
                .attr("stop-opacity", 2);

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
            var line = svg.append("path")
                .attr("d", lineFunction(lineData))
                .attr("stroke-width", 3)
                .attr("stroke", "url(#svgGradient)")
                .attr("fill", "none");
            svg.append("circle")
                .attr("cx", 10)
                .attr("cy", 70)
                .attr("r", 7)
                .style("fill", "green");

            svg.append("text")
                .text("May 5")
                .attr("x", 50)
                .attr("y", 110)
                .attr("font-family", "OpenSans-Light")
                .attr("font-weight", 100)
                .attr("font-size", 20)
                .attr("text-anchor", "middle")
                .attr("alignment-baselin", "middle")
                .attr("fill", "#4C4C4C");
        }

        d3.selectAll("input")
            .on("change", selectDataset);

        function selectDataset() {
            var value = this.value;
            if (value == "Prediction") {
                svg.selectAll("text").remove();
                svg.selectAll("circle").remove();
                svg.selectAll("path").remove();
                dataVisualization();
            } else if (value == "History") {
                svg.selectAll("text").remove();
                svg.selectAll("circle").remove();
                svg.selectAll("line").remove();
                lineGraph();

            }
        }

        //line graph

    }

    render() {
        return (

            <div>
                <svg id="svg"></svg>
                <form>
                    <label id = "label1"><input type="radio" name="dataset" id="dataset1" value="Prediction" defaultChecked /> Prediction</label>
                    <label id = "label2"><input type="radio" name="dataset" id="dataset2" value="History" defaultChecked /> History</label>
                </form>
            </div>

        );
    }
}

