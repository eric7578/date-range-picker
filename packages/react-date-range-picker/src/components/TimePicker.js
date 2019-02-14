import React from 'react';
import PropTypes from 'prop-types';

function Hours(props) {
  const { onChange, ...others } = props;
  const hours = [];
  for (let h = 0; h < 24; h++) {
    hours.push(<option key={h} value={h}>{h}</option>);
  }

  const onChangeHours = e => {
    onChange(parseInt(e.target.value));
  }

  return <select {...others} onChange={onChangeHours}>{hours}</select>;
}

function Minutes(props) {
  const { onChange, ...others } = props;
  const minutes = [];
  for (let m = 0; m < 60; m += props.increment) {
    const minute = m < 10 ? '0' + m : m.toString();
    minutes.push(<option key={m} value={m}>{minute}</option>);
  }

  const onChangeMinutes = e => {
    onChange(parseInt(e.target.value));
  }

  return <select {...others} onChange={onChangeMinutes}>{minutes}</select>;
}

export default function TimePicker(props) {
  const { onChange, value, minuteIncrement, ...others } = props;

  const onChangeHours = hours => {
    const d = new Date(value);
    d.setHours(hours);
    onChange(d);
  }

  const onChangeMinutes = minutes => {
    const d = new Date(value);
    d.setMinutes(minutes);
    onChange(d);
  }

  return (
    <div {...others}>
      <Hours
        value={value.getHours()}
        onChange={onChangeHours}
      />
      <Minutes
        value={value.getMinutes()}
        onChange={onChangeMinutes}
        increment={minuteIncrement}
      />
    </div>
  );
}

TimePicker.propTypes = {
  minuteIncrement: PropTypes.number,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func
};
