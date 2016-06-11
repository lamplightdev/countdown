import { connect } from 'react-redux';
import { removeCountdown } from '../actions';
import CountdownList from '../components/CountdownList';


const mapStateToProps = (state) => (
  {
    countdowns: state.countdowns,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onCountdownClick: (id) => dispatch(removeCountdown(id)),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountdownList);
