import React, { PropTypes } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.node = null;
    this.arc = null;
    this.field = null;
    this.path = null;
  }

  componentWillMount() {
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // const now = new Date(this.props.now);
    const time = { value: this.props.time, size: this.props.length };

    this.arc = d3.svg.arc()
      .innerRadius(width / 6.5 - 60)
      .outerRadius(width / 6.5 - 5)
      .startAngle(0)
      .endAngle(d => (d.value / d.size) * 2 * Math.PI);

    this.node = ReactFauxDOM.createElement('svg');
    const svg = d3.select(this.node)
      .attr('viewBox',
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

    this.field = svg.selectAll('.field')
      .data([time])
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${(i * 2 + 1.25) / 6.5 * width},${height / 2})`)
      .attr('class', 'field');

    this.path = this.field.append('path')
      .attr('class', 'path path--foreground')
      .attr('d', this.arc);
  }

  componentWillReceiveProps(newProps) {
    this.field.each(d => {
      d.value = newProps.time;
    });

    this.path.attr('d', this.arc);
  }

  render() {
    return this.node.toReact();
  }
}

Clock.propTypes = {
  time: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
};

export default Clock;
