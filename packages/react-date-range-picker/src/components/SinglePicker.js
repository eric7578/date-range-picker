import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

export default function SinglePicker(props) {
  const [display, setDisplay] = useState(props.selection);

  const onChangeDateSelection = d => {
    const nextSelection = new Date(props.selection);
    nextSelection.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
    props.onChangeSelection(nextSelection);
  }

  const onChangeTimeSelection = d => {
    const nextSelection = new Date(props.selection);
    nextSelection.setHours(d.getHours(), d.getMinutes());
    props.onChangeSelection(nextSelection);
  }

  return (
    <div>
      <DatePicker
        displayYear={display.getFullYear()}
        displayMonth={display.getMonth()}
        onChangeDisplay={setDisplay}
        monthLabels={props.monthLabels}
        weekdayLabels={props.weekdayLabels}
        onChange={onChangeDateSelection}
      />
      {props.timePicker &&
        <TimePicker
          value={props.selection}
          minuteIncrement={props.minuteIncrement}
          onChange={onChangeTimeSelection}
        />
      }
    </div>
  );
}

SinglePicker.propTypes = {
  monthLabels: PropTypes.arrayOf(PropTypes.string),
  weekdayLabels: PropTypes.arrayOf(PropTypes.string),
  timePicker: PropTypes.bool,
  minuteIncrement: PropTypes.number,
  selection: PropTypes.instanceOf(Date).isRequired,
  onChangeSelection: PropTypes.func.isRequired
};
