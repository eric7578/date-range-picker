import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import document from 'global/document';
import window from 'global/window';
import SinglePicker from './SinglePicker';
import RangePicker from './RangePicker';
import style from './DateRangePicker.module.css';

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

  const refPicker = useRef(null);
  const refInput = useRef(null);
  const [popupOffset, setPopupOffset] = useState();

  useEffect(() => {
    if (!prevPopup && popup) {
      const nextSelection = getDefaultSelection(props.value, props.singleDatePicker);
      setSelection(nextSelection);
      window.addEventListener('click', checkIfClickOutside);
    }

    return () => {
      window.removeEventListener('click', checkIfClickOutside);
    }
  }, [popup]);

  const onApply = e => {
    setPopup(false);
    props.onChange(selection);
  }

  const onCancel = e => {
    setPopup(false);
  }

  const onPopup = e => {
    const rect = refInput.current.getBoundingClientRect();
    setPopupOffset({
      left: rect.left,
      top: rect.bottom
    });
    setPopup(true);
  }

  const checkIfClickOutside = e => {
    let el = e.target;
    let clickInside = false;
    do {
      if (el === refPicker.current || el === refInput.current) {
        clickInside = true;
        break;
      }
      el = el.parentElement;
    } while (el && el !== document.body)

    if (!clickInside) {
      onCancel();
    }
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
    <div className={style.dateRangePickerWrapper}>
      <input
        type='text'
        ref={refInput}
        value={props.singleDatePicker
          ? formatSelection(props.value)
          : `${formatSelection(props.value[0])} - ${formatSelection(props.value[1])}`
        }
        onChange={e => e.preventDefault()}
        onClick={onPopup}
      />
      {popup &&
        ReactDOM.createPortal(
          <div
            ref={refPicker}
            style={{
              position: 'absolute',
              ...popupOffset
            }}
          >
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
          </div>,
          document.body
        )}
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
