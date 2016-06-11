import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addCountdown, setUIState } from '../actions';

class AddCountdown extends React.Component {
  constructor(props) {
    super(props);

    this.input = null;
  }

  render() {
    return (<div>
      <div
        style={{
          display: this.props.ui.invalid ? '' : 'none',
        }}
      >
        Too small
      </div>
      <form
        method="post"
        action=""
        onSubmit={event => {
          event.preventDefault();

          const valueInt = parseInt(this.input.value, 10);
          if (valueInt > 9) {
            this.props.dispatch(addCountdown(valueInt));
            this.props.dispatch(setUIState('invalid', false));
            this.input.value = '';
          } else {
            this.props.dispatch(setUIState('invalid', true));
          }
        }}
      >
        <div
          className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
        >
          <input
            className="mdl-textfield__input"
            type="number"
            name="time"
            min={1}
            ref={node => {
              this.input = node;
            }}
          />
          <label
            className="mdl-textfield__label"
            htmlFor="time"
          >
            Time
          </label>
        </div>
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          type="Submit"
        >
          Add Countdown
        </button>
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          type="button"
          onClick={() => {
            this.props.dispatch(addCountdown(24 * 60 * 60));
          }}
        >
          Add 1 day
        </button>
      </form>
    </div>);
  }
}

AddCountdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    invalid: PropTypes.bool,
  }),
};

export default connect()(AddCountdown);
