import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import style from './DateRangePicker.module.css';

export default function DateRangerPicker(props) {
  const [d0, setDisplay0] = useState(() => {
    return props.singleDatePicker
      ? new Date(props.value)
      : new Date(props.value[0]);
  });
  const [d1, setDisplay1] = useState(() => {
    return props.singleDatePicker
      ? null
      : new Date(d0.getFullYear(), d0.getMonth() + 1);
  });

  const onChangeDisplay0 = nextD0 => {
    setDisplay0(nextD0);

    if (!props.singleDatePicker) {
      if (props.linkedCalendars || nextD0.getTime() > d1.getTime()) {
        const d1 = new Date(nextD0.getFullYear(), nextD0.getMonth() + 1);
        setDisplay1(d1);
      }
    }
  }

  const onChangeDisplay1 = nextD1 => {
    setDisplay1(nextD1);

    if (!props.singleDatePicker) {
      if (props.linkedCalendars || d0.getTime() > nextD1.getTime()) {
        const d0 = new Date(nextD1.getFullYear(), nextD1.getMonth() - 1);
        setDisplay0(d0);
      }
    }
  }

  const [selectStartDate, setSelectStartDate] = useState(false);
  const [selectEndDate, setSelectEndDate] = useState(false);
  const [selection, setSelection] = useState(() => {
    if (props.singleDatePicker) {
      return new Date(props.value);
    } else {
      return props.value.map(date => new Date(date));
    }
  });

  const onChangeDateSelection = d => {
    if (props.singleDatePicker) {
      const nextSelection = new Date(selection);
      nextSelection.setFullYear(d.getFullYear());
      nextSelection.setMonth(d.getMonth());
      nextSelection.setDate(d.getDate());
      setSelection(nextSelection);
    } else {
      if (!selectStartDate && !selectEndDate) {
        const nextSelection = new Date(selection[0]);
        nextSelection.setFullYear(d.getFullYear());
        nextSelection.setMonth(d.getMonth());
        nextSelection.setDate(d.getDate());

        setSelectStartDate(true);
        setSelection([nextSelection, selection[1]]);
      } else if (selectStartDate && selectEndDate) {
        const nextSelection = new Date(selection[0]);
        nextSelection.setFullYear(d.getFullYear());
        nextSelection.setMonth(d.getMonth());
        nextSelection.setDate(d.getDate());

        setSelectEndDate(false);
        setSelection([nextSelection, selection[1]]);
      } else if (selectStartDate) {
        const nextSelection = new Date(selection[1]);
        nextSelection.setFullYear(d.getFullYear());
        nextSelection.setMonth(d.getMonth());
        nextSelection.setDate(d.getDate());

        setSelectEndDate(true);
        setSelection([selection[0], nextSelection]);
      }
    }
  }

  const onChangeTimeSelection0 = ({ hours, minutes }) => {
    if (props.singleDatePicker) {
      const nextSelection = new Date(selection);
      nextSelection.setHours(hours);
      nextSelection.setMinutes(minutes);
      setSelection(nextSelection);
    } else {
      const d = new Date(selection[0]);
      d.setHours(hours);
      d.setMinutes(minutes);
      setSelection([ d, new Date(selection[1]) ]);
    }
  }

  const onChangeTimeSelection1 = ({ hours, minutes }) => {
    const d = new Date(selection[1]);
    d.setHours(hours);
    d.setMinutes(minutes);
    setSelection([ new Date(selection[0]), d ]);
  }

  const formatSelection = date => {
    const month = props.monthLabels[date.getMonth()];

    let dd = date.getDate();
    dd = dd > 9 ? dd : '0' + dd;

    let display = `${month} ${dd}, ${date.getFullYear()}`;

    if (props.timePicker) {
      let hh = date.getHours();
      hh = hh > 9 ? hh : '0' + hh;

      let mm = date.getMinutes();
      mm = mm > 9 ? mm : '0' + mm;

      display = `${display} ${hh}:${mm}`;
    }

    return display;
  }

  const onApply = e => {
    props.onChange(selection);
  }

  const onCancel = e => {
    if (props.singleDatePicker) {
      setSelection(new Date(props.value));
    } else {
      setSelectStartDate(false);
      setSelectEndDate(false);
      setSelection(props.value.map(date => new Date(date)));
    }
  }

  return (
    <div>
      <div>
        {props.singleDatePicker
          ? formatSelection(props.value)
          : `${formatSelection(props.value[0])} - ${formatSelection(props.value[1])}`
        }
      </div>
      <div className={style.calendarWrapper}>
        <div>
          <DatePicker
            displayYear={d0.getFullYear()}
            displayMonth={d0.getMonth()}
            monthLabels={props.monthLabels}
            weekdayLabels={props.weekdayLabels}
            onChangeDisplay={onChangeDisplay0}
            onChange={onChangeDateSelection}
          />
          {props.timePicker &&
            <TimePicker
              hours={props.singleDatePicker
                ? selection.getHours()
                : selection[0].getHours()
              }
              minutes={props.singleDatePicker
                ? selection.getMinutes()
                : selection[0].getMinutes()
              }
              minuteIncrement={props.minuteIncrement}
              onChange={onChangeTimeSelection0}
            />
          }
        </div>
        {!props.singleDatePicker &&
          <div>
            <DatePicker
              displayYear={d1.getFullYear()}
              displayMonth={d1.getMonth()}
              monthLabels={props.monthLabels}
              weekdayLabels={props.weekdayLabels}
              onChangeDisplay={onChangeDisplay1}
              onChange={onChangeDateSelection}
            />
            {props.timePicker &&
              <TimePicker
                hours={selection[1].getHours()}
                minutes={selection[1].getMinutes()}
                minuteIncrement={props.minuteIncrement}
                onChange={onChangeTimeSelection1}
              />
            }
          </div>
        }
      </div>
      <div>
        <input
          type='button'
          value='Apply'
          disabled={!props.singleDatePicker && (!selectStartDate || !selectEndDate)}
          onClick={onApply}
        />
        <input
          type='button'
          value='Cancel'
          onClick={onCancel}
        />
      </div>
    </div>
  );
}

DateRangerPicker.propTypes = {
  singleDatePicker: PropTypes.bool,
  linkedCalendars: PropTypes.bool,
  monthLabels: PropTypes.arrayOf(PropTypes.string),
  weekdayLabels: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date))
  ]),
  timePicker: PropTypes.bool,
  minuteIncrement: PropTypes.number,
  onChange: PropTypes.func
};

DateRangerPicker.defaultProps = {
  singleDatePicker: false,
  linkedCalendars: false,
  monthLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  weekdayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  minuteIncrement: 1,
  timePicker: false
};
