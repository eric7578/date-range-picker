import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import style from './DateRangePicker.module.css';

export default function DateRangerPicker(props) {
  const [d0, setDisplay0] = useState(() => {
    return props.singleDatePicker
      ? new Date(props.selection)
      : new Date(props.selections[0]);
  });
  const [d1, setDisplay1] = useState(() => {
    return props.singleDatePicker
      ? null
      : new Date(d0.getFullYear(), d0.getMonth() + 1);
  });

  const onChangeDisplay0 = nextD0 => {
    setDisplay0(nextD0);

    if (props.linkedCalendars || nextD0.getTime() > d1.getTime()) {
      const d1 = new Date(nextD0.getFullYear(), nextD0.getMonth() + 1);
      setDisplay1(d1);
    }
  }

  const onChangeDisplay1 = nextD1 => {
    setDisplay1(nextD1);

    if (props.linkedCalendars || d0.getTime() > nextD1.getTime()) {
      const d0 = new Date(nextD1.getFullYear(), nextD1.getMonth() - 1);
      setDisplay0(d0);
    }
  }

  const onChangeSelection = date => {
  }

  return (
    <div className={style.calendarWrapper}>
      <div>
        <DatePicker
          displayYear={d0.getFullYear()}
          displayMonth={d0.getMonth()}
          monthLabels={props.monthLabels}
          weekdayLabels={props.weekdayLabels}
          onChangeDisplay={onChangeDisplay0}
          onChange={onChangeSelection}
        />
        <TimePicker
          minuteIncrement={props.minuteIncrement}
          selection={props.selection || props.selections[0]}
          onChange={onChangeSelection}
        />
      </div>
      {!props.singleDatePicker &&
        <div>
          <DatePicker
            displayYear={d1.getFullYear()}
            displayMonth={d1.getMonth()}
            monthLabels={props.monthLabels}
            weekdayLabels={props.weekdayLabels}
            onChangeDisplay={onChangeDisplay1}
            onChange={onChangeSelection}
          />
          <TimePicker
            minuteIncrement={props.minuteIncrement}
            selection={props.selections[1]}
            onChange={onChangeSelection}
          />
        </div>
      }
    </div>
  );
}

DateRangerPicker.propTypes = {
  singleDatePicker: PropTypes.bool,
  linkedCalendars: PropTypes.bool,
  monthLabels: PropTypes.arrayOf(PropTypes.string),
  weekdayLabels: PropTypes.arrayOf(PropTypes.string),
  selection: PropTypes.instanceOf(Date),
  selections: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  minuteIncrement: PropTypes.number,
  onChange: PropTypes.func
};

DateRangerPicker.defaultProps = {
  singleDatePicker: false,
  linkedCalendars: false,
  monthLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  weekdayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  minuteIncrement: 1
};
