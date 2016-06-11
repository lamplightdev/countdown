import { connect } from 'react-redux';
import DataList from '../components/DataList';

const mapStateToProps = (state) => (
  {
    data: state.data,
  }
);

export default connect(
  mapStateToProps
)(DataList);
