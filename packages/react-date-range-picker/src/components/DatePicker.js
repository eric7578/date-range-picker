import React from 'react';
import PropTypes from 'prop-types';

function getStartOfWeek(date) {
  const dateOfMonday = date.getDate() - date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(dateOfMonday);
  return startOfWeek;
}

function getDatesOfMonth(year, month) {
  const firstDayOfMonth = new Date(year, month);
  let firstDayOfWeek = getStartOfWeek(firstDayOfMonth);
  let iterDay = new Date(firstDayOfWeek);
  const days = [];

  do {
    const week = [];
    days.push(week);
    for (let day = 0; day <= 6; day++) {
      week.push(new Date(iterDay));
      iterDay.setDate(iterDay.getDate() + 1);
    }
    firstDayOfWeek = iterDay;
  } while (firstDayOfWeek.getMonth() === month)

  return days;
}

function Months(props) {
  const { monthLabels, onChange, ...others } = props;
  const months = [];
  for (let m = 0; m < 12; m++) {
    months.push(<option key={m} value={m}>{monthLabels[m]}</option>);
  }

  return <select onChange={e => onChange(e.target.value)} {...others}>{months}</select>;
}

function Years(props) {
  const { onChange, startYear, endYear, ...others } = props;
  const years = [];
  for (let yyyy = startYear; yyyy <= endYear; yyyy++) {
    years.push(<option key={yyyy} value={yyyy}>{yyyy}</option>);
  }

  return <select onChange={e => onChange(e.target.value)} {...others}>{years}</select>;
}

function Days(props) {
  const datesOfMonth = getDatesOfMonth(props.year, props.month);

  return (
    <table>
      <thead>
        <tr>
          {props.weekdayLabels.map(label => <td key={label}>{label}</td>)}
        </tr>
      </thead>
      <tbody>
        {datesOfMonth.map((week, index) =>
          <tr key={index}>
            {week.map(weekDay =>
              <td
                key={weekDay.getDate()}
              >
                {weekDay.getDate()}
              </td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default function DatePicker(props) {
  const startYear = props.displayYear - 100;
  const endYear = props.displayYear + 100;

  const onChangeYear = year => {
    const date = new Date(year, props.displayMonth);
    props.onChangeDisplay(date);
  }

  const onChangeMonth = month => {
    const date = new Date(props.displayYear, month);
    props.onChangeDisplay(date);
  }

  const gotoPrevMonth = e => {
    const date = new Date(props.displayYear, props.displayMonth - 1);
    props.onChangeDisplay(date);
  }

  const gotoNextMonth = e => {
    const date = new Date(props.displayYear, props.displayMonth + 1);
    props.onChangeDisplay(date);
  }

  return (
    <div>
      <div>
        <input
          type='button'
          disabled={props.displayYear === startYear && props.displayMonth === 0}
          value='Prev'
          onClick={gotoPrevMonth}
        />
        <Years
          startYear={startYear}
          endYear={endYear}
          value={props.displayYear}
          onChange={onChangeYear}
        />
        <Months
          monthLabels={props.monthLabels}
          value={props.displayMonth}
          onChange={onChangeMonth}
        />
        <input
          type='button'
          disabled={props.displayYear === endYear && props.displayMonth === 11}
          value='Next'
          onClick={gotoNextMonth}
        />
      </div>
      <Days
        year={props.displayYear}
        month={props.displayMonth}
        weekdayLabels={props.weekdayLabels}
      />
    </div>
  );
}

DatePicker.propTypes = {
  displayYear: PropTypes.number,
  displayMonth: PropTypes.number,
  monthLabels: PropTypes.arrayOf(PropTypes.string),
  weekdayLabels: PropTypes.arrayOf(PropTypes.string),
  selections: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onChangeDisplay: PropTypes.func
};
