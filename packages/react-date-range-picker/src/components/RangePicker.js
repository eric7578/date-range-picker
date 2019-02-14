import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import style from './RangePicker.module.css';

export default function RangerPicker(props) {
  const [d0, setDisplay0] = useState(() => new Date(props.selection[0]));
  const [d1, setDisplay1] = useState(() => new Date(d0.getFullYear(), d0.getMonth() + 1));

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

  const [range, setRange] = useState([]);

  const onChangeDateSelection = d => {
    const [begin, end] = range;
    const nextRange = !begin === !end ? [d] : [begin, d];
    nextRange.sort((d1, d2) => d1.getTime() - d2.getTime());
    setRange(nextRange);

    if (nextRange.length === 2) {
      props.onChangeSelection(nextRange);
    }
  }

  const onChangeStartTime = d => {
    const start = new Date(props.selection[0]);
    const end = new Date(props.selection[1]);
    start.setHours(d.getHours());
    start.setMinutes(d.getMinutes());
    props.onChangeSelection([start, end]);
  }

  const onChangeEndTime = d => {
    const start = new Date(props.selection[0]);
    const end = new Date(props.selection[1]);
    end.setHours(d.getHours());
    end.setMinutes(d.getMinutes());
    props.onChangeSelection([start, end]);
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
          value={props.selection[0]}
          onChange={onChangeDateSelection}
        />
        {props.timePicker &&
          <TimePicker
            minuteIncrement={props.minuteIncrement}
            value={props.selection[0]}
            onChange={onChangeStartTime}
          />
        }
      </div>
      <div>
        <DatePicker
          displayYear={d1.getFullYear()}
          displayMonth={d1.getMonth()}
          monthLabels={props.monthLabels}
          weekdayLabels={props.weekdayLabels}
          onChangeDisplay={onChangeDisplay1}
          value={props.selection[1]}
          onChange={onChangeDateSelection}
        />
        {props.timePicker &&
          <TimePicker
            minuteIncrement={props.minuteIncrement}
            value={props.selection[1]}
            onChange={onChangeEndTime}
          />
        }
      </div>
    </div>
  );
}

RangerPicker.propTypes = {
  linkedCalendars: PropTypes.bool,
  monthLabels: PropTypes.arrayOf(PropTypes.string),
  weekdayLabels: PropTypes.arrayOf(PropTypes.string),
  timePicker: PropTypes.bool,
  minuteIncrement: PropTypes.number,
  selection: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  onChangeSelection: PropTypes.func.isRequired
};

RangerPicker.defaultProps = {
  linkedCalendars: false
};