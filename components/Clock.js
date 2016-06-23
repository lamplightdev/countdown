import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

class Chart extends React.Component {
  render() {
    const period = 60000;
    const remaining = 432000;

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = 100 - margin.left - margin.right;
    const height = 100 - margin.top - margin.bottom;

    const time = { value: 60, size: 60, label: 's', update: date => date.getSeconds() };

    const arc = d3.svg.arc()
      .innerRadius(width / 6.5 - 60)
      .outerRadius(width / 6.5 - 5)
      .startAngle(1)
      .endAngle(d => (d.value / d.size) * 2 * Math.PI);

    const arcTween = val => {
      const interpolate = d3.interpolate({ value: val.previous }, val);
      return angle => arc(interpolate(angle));
    };

    const node = ReactFauxDOM.createElement('svg');
    const svg = d3.select(node)
      .attr('viewBox',
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

    const field = svg.selectAll('.field')
        .data([time])
        .enter()
        .append('g')
        .attr('transform', (d, i) => 'translate(' + (i * 2 + 1.25) / 6.5 * width + ',' + height / 2 + ')')
        .attr('class', 'field');

    field.append('path')
        .attr('class', 'path path--background')
        .attr('d', arc);

    const path = field.append('path')
        .attr('class', 'path path--foreground');

    const label = field.append('text')
        .attr('class', 'label')
        .attr('dy', '.35em');

    (function update() {
      const now = new Date('Thu Jun 23 2016 22:48:42 GMT+0100 (BST)');

      field.each(d => {
        d.previous = d.value;
        d.value = d.update(now);
      });

      path.transition()
          .ease('elastic')
          .duration(750)
          .attrTween('d', arcTween);

      // label
      //    .text(d => d.value + d.label);

      setTimeout(update, 1000 - (now % 1000));
    })();


    return node.toReact();
  }
}

export default Chart;
