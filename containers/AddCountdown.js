import { connect } from 'react-redux';
import AddCountdown from '../components/AddCountdown';

const mapStateToProps = (state) => (
  {
    now: state.now,
    ui: state.ui,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    // onCountdownClick: (id) => dispatch(removeCountdown(id)),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCountdown);
