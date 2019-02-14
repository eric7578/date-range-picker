import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SinglePicker from './SinglePicker';
import RangePicker from './RangePicker';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value
  });
  return ref.current;
}

function getDefaultSelection(defaultvalue, singleDatePicker) {
  if (defaultvalue) {
    return defaultvalue;
  }

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  if (singleDatePicker) {
    return start;
  }

  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  return [start, end];
}

export default function DateRangerPicker(props) {
  const [popup, setPopup] = useState(false);
  const prevPopup = usePrevious(popup);
  const [selection, setSelection] = useState(() => getDefaultSelection(props.value, props.singleDatePicker));

  useEffect(() => {
    if (!prevPopup && popup) {
      const nextSelection = getDefaultSelection(props.value, props.singleDatePicker);
      setSelection(nextSelection);
    }
  });

  const onApply = e => {
    setPopup(false);
    props.onChange(selection);
  }

  const onCancel = e => {
    setPopup(false);
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

  return (
    <div>
      <input
        type='text'
        value={props.singleDatePicker
          ? formatSelection(props.value)
          : `${formatSelection(props.value[0])} - ${formatSelection(props.value[1])}`
        }
        onChange={e => e.preventDefault()}
        onClick={e => setPopup(true)}
      />
      {popup &&
        <div>
          {props.singleDatePicker
            ? (
              <SinglePicker
                monthLabels={props.monthLabels}
                weekdayLabels={props.weekdayLabels}
                minuteIncrement={props.minuteIncrement}
                timePicker={props.timePicker}
                selection={selection}
                onChangeSelection={setSelection}
              />
            )
            : (
              <RangePicker
                monthLabels={props.monthLabels}
                weekdayLabels={props.weekdayLabels}
                minuteIncrement={props.minuteIncrement}
                timePicker={props.timePicker}
                linkedCalendars={props.linkedCalendars}
                selection={selection}
                onChangeSelection={setSelection}
              />
            )
          }
          <div>
            <input
              type='button'
              value='Apply'
              disabled={!props.singleDatePicker && selection.length < 2}
              onClick={onApply}
            />
            <input
              type='button'
              value='Cancel'
              onClick={onCancel}
            />
          </div>
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
  timePicker: PropTypes.bool,
  minuteIncrement: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date))
  ]),
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
