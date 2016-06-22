import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

class Chart extends React.Component {
  render() {
    const data = [{
      date: '1-Apr-12',
      close: 10,
    }, {
      date: '2-Apr-12',
      close: 2,
    }, {
      date: '3-Apr-12',
      close: 20,
    }, {
      date: '4-Apr-12',
      close: 2,
    }, {
      date: '5-Apr-12',
      close: 3,
    }, {
      date: '6-Apr-12',
      close: 4,
    }];

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const parseDate = d3.time.format('%d-%b-%y').parse;

    const x = d3.time.scale()
      .range([0, width]);

    const y = d3.scale.linear()
      .range([height, 0]);

    const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    const line = d3.svg.line()
      .x(d => x(d.date))
      .y(d => y(d.close));

    const node = ReactFauxDOM.createElement('svg');
    const svg = d3.select(node)
      .attr('viewBox',
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    data.forEach(d => {
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

    x.domain(d3.extent(data, d => d.date));
    y.domain(d3.extent(data, d => d.close));

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);

    return node.toReact();
  }
}

export default Chart;
