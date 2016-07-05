import { connect } from 'react-redux';
import { removeCountdown, updateNow } from '../actions';
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
    onUpdateNow: (now) => dispatch(updateNow(now)),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountdownList);
