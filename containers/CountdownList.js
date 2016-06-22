import { connect } from 'react-redux';
import { removeCountdown } from '../actions';
import CountdownList from '../components/CountdownList';


const mapStateToProps = (state) => (
  {
    countdowns: state.countdowns,
    now: state.now,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onCountdownRemove: (id) => dispatch(removeCountdown(id)),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountdownList);
