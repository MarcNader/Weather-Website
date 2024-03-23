import {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const LineChart = ({data, width, height}) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || !data.length) return;

    // Define margins and dimensions
    const margin = {top: 40, right: 40, bottom: 70, left: 80};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const max = parseInt(d3.max(data, d => d.temp));
    const min = parseInt(d3.min(data, d => d.temp));

    // Create SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, 21])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([min, max])
      .range([innerHeight, 0]);

    const line = d3.line()
    .x(d => xScale(d.time)) // Access the 'time' property for x-coordinate
    .y(d => yScale(d.temp)) // Access the 'temp' property for y-coordinate
    .curve(d3.curveMonotoneX); // Use monotone interpolation for smooth curves


    // Draw line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .attr('d', line)
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add axes
    const xAxis = d3.axisBottom(xScale).tickValues([0,3, 6, 9, 12, 15, 18, 21]);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${innerHeight + margin.top})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-size', '18px');

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis)
      .selectAll('text')
      .style('font-size', '18px');

      //Grid
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left}, ${innerHeight + margin.top})`)
      .call(d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat(''))
      .selectAll('.tick line')
      .attr('stroke-dasharray', '1, 1')
      .attr('stroke', 'gray')
      .attr('stroke-width', 0.5)
      .attr('shape-rendering', 'crispEdges');
      svg.selectAll('.grid line')
      .style('stroke-dasharray', '1 1') 
      
      svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(''))
      .selectAll('.tick line')
      .attr('stroke-dasharray', '1, 1')
      .attr('stroke', 'gray')
      .attr('stroke-width', 0.5)
      .attr('shape-rendering', 'crispEdges');

      // Adding points
      svg.selectAll('.point')
      .data(data)
      .enter().append('circle')
      .attr('class', 'point')
      .attr('cx', d => xScale(d.time) + margin.left)
      .attr('cy', d => yScale(d.temp) + margin.top)
      .attr('r', 3)
      .attr('fill', 'steelblue');

      // Adding x-axis label
      svg.append('text')
      .attr('class', 'x-label')
      .attr('transform', `translate(${width / 2}, ${height - 10})`)
      .style('text-anchor', 'middle')
      .style('fill', 'white') 
      .style('font-size', '24px')
      .text('Time (hr)');

    // Adding y-axis label
    svg.append('text')
      .attr('class', 'y-label')
      .attr('transform', `translate(${margin.left / 2 - 10}, ${height / 2}) rotate(-90)`)
      .style('text-anchor', 'middle')
      .style('fill', 'white') 
      .style('font-size', '24px')
      .text('Temperature (°C)');
  }, [data, width, height]);

  return <svg ref={svgRef} style={{backgroundColor:'#312E74', borderRadius:'15px'}}/>;
};

export default LineChart;
