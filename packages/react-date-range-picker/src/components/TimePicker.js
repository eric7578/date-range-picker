import React from 'react';
import PropTypes from 'prop-types';

function Hours(props) {
  const { onChange, ...others } = props;
  const hours = [];
  for (let h = 0; h < 24; h++) {
    hours.push(<option key={h} value={h}>{h}</option>);
  }

  return <select {...others} onChange={e => onChange(e.target.value)}>{hours}</select>;
}

function Minutes(props) {
  const { onChange, ...others } = props;
  const minutes = [];
  for (let m = 0; m < 60; m += props.increment) {
    const minute = m < 10 ? '0' + m : m.toString();
    minutes.push(<option key={m} value={m}>{minute}</option>);
  }

  return <select {...others} onChange={e => onChange(e.target.value)}>{minutes}</select>;
}

export default function TimePicker(props) {
  const { selection, minuteIncrement, ...others } = props;

  const onChangeHours = hours => {
    const date = new Date(selection);
    date.setHours(hours);
    props.onChange(date);
  }

  const onChangeMinutes = minutes => {
    const date = new Date(selection);
    date.setMinutes(minutes);
    props.onChange(date);
  }

  return (
    <div {...others}>
      <Hours value={selection.getHours()} onChange={onChangeHours} />
      <Minutes value={selection.getMinutes()} onChange={onChangeMinutes} increment={minuteIncrement} />
    </div>
  );
}

TimePicker.propTypes = {
  selection: PropTypes.instanceOf(Date),
  minuteIncrement: PropTypes.number,
  onChange: PropTypes.func
};
