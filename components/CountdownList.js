import React, { PropTypes } from 'react';
import Countdown from './Countdown';

class CountdownList extends React.Component {
  constructor(props) {
    super(props);

    this.interval = null;
    this.lastTimestamp = 0;

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.tick();
  }

  componentWillReceiveProps() {
    this.tick();
  }

  componentWillUnmount() {
    this.interval = cancelAnimationFrame(this.interval);
  }

  tick() {
    const nowTimestamp = new Date().getTime();

    const numActiveCountdowns = this.props.countdowns.filter(countdown => {
      return new Date(countdown.id).getTime() > nowTimestamp;
    }).length;

    if (numActiveCountdowns) {
      if (nowTimestamp - this.lastTimestamp >= 16) {
        this.props.onUpdateNow(nowTimestamp);
        this.lastTimestamp = nowTimestamp;
      }
    } else {
      this.interval = cancelAnimationFrame(this.interval);
    }

    this.interval = requestAnimationFrame(this.tick);
  }

  render() {
    return (
      <ul
        className="mdl-list"
      >
        {this.props.countdowns.map(countdown => (
          <Countdown
            key={countdown.id}
            {...countdown}
            now={this.props.now}
            onRemove={() => this.props.onCountdownRemove(countdown.id)}
          />
        ))}
      </ul>
    );
  }
}


CountdownList.propTypes = {
  countdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  now: PropTypes.number.isRequired,
  onCountdownRemove: PropTypes.func.isRequired,
  onUpdateNow: PropTypes.func.isRequired,
};

export default CountdownList;
