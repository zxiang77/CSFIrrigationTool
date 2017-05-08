
import React from 'react';
import * as d3 from 'd3';

export default class RecentStatus extends React.Component {
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

        var lineData = [ { "x": 1, "y": 20},  { "x": 80, "y": 80},
                         { "x": 160, "y": 40}, { "x": 240, "y": 160},
                         { "x": 320, "y": 20},  { "x": 400, "y": 240}];

                var lineFunction = d3.line()
                                 .x(function(d) { return d.x; })
                                 .y(function(d) { return d.y; })
                                 .curve(d3.curveCardinal)

                var svg = d3.select("#recentstatus").append("svg")
                                           .attr("width", 500)
                                           .attr("height", 200);

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
        return (<svg id="recentstatus"></svg>);
    }
}


