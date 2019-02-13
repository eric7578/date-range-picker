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
  const { onChange, hours, minutes, minuteIncrement, ...others } = props;

  const onChangeHours = hours => {
    onChange({
      hours,
      minutes
    });
  }

  const onChangeMinutes = minutes => {
    onChange({
      hours,
      minutes
    });
  }

  return (
    <div {...others}>
      <Hours value={hours} onChange={onChangeHours} />
      <Minutes value={minutes} onChange={onChangeMinutes} increment={minuteIncrement} />
    </div>
  );
}

TimePicker.propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number,
  minuteIncrement: PropTypes.number,
  onChange: PropTypes.func
};
