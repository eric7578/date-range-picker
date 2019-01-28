<template>
  <div>
    <div>
      <input type="button" value="Prev" @click="gotoPrevMonth">
      <select v-model="month">
        <option
          v-for="option in availableMonths"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <select v-model="year">
        <option
          v-for="option in availableYears"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <input type="button" value="Next" @click="gotoNextMonth">
    </div>
    <table>
      <thead>
        <tr>
          <td v-for="label in weekdayLabels" :key="label">{{ label }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in daysInMonth" :key="index">
          <td
            v-for="weekDay in week"
            :key="weekDay.day.getDate()"
            @click="$emit('change-date', weekDay.day)"
          >
            {{ weekDay.day.getDate() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getStartOfMonth, getStartOfWeek } from '../utils/timeUtils.js'

export default {
  props: {
    monthLabels: {
      type: Array,
      required: true
    },
    weekdayLabels: {
      type: Array,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    monthIncrement: {
      type: Number,
      default: 1
    },
    afterDate: Date,
    beforeDate: Date
  },
  computed: {
    year: {
      get() {
        return this.date.getFullYear();
      },
      set(year) {
        const date = new Date(this.date);
        date.setFullYear(year);
        this.$emit('change-month', date);
      }
    },
    month: {
      get() {
        return this.date.getMonth();
      },
      set(month) {
        const date = new Date(this.date);
        date.setMonth(month);
        this.$emit('change-month', date);
      }
    },
    availableYears() {
      const years = [];
      const startYear = this.year - 100;
      const endYear = this.year + 100;
      for (let yyyy = startYear; yyyy <= endYear; yyyy++) {
        years.push({
          label: yyyy,
          value: yyyy
        });
      }
      return years;
    },
    availableMonths() {
      const months = [];
      for (let m = 0; m < 12; m++) {
        months.push({
          label: this.monthLabels[m],
          value: m
        });
      }
      return months;
    },
    daysInMonth() {
      const firstDayOfMonth = getStartOfMonth(this.date);
      let firstDayOfWeek = getStartOfWeek(firstDayOfMonth);
      let iterDay = new Date(firstDayOfWeek);
      const days = [];

      do {
        const week = [];
        days.push(week);
        for (let day = 0; day <= 6; day++) {
          week.push({
            day: new Date(iterDay),
            isAfter: this.after && iterDay.getTime() > this.after.getTime(),
            isBefore: this.before && iterDay.getTime() < this.before.getTime()
          });
          iterDay.setDate(iterDay.getDate() + 1);
        }
        firstDayOfWeek = iterDay;
      } while (firstDayOfWeek.getMonth() === this.date.getMonth())

      return days;
    }
  },
  methods: {
    gotoPrevMonth() {
      const date = new Date(this.date);
      date.setMonth(date.getMonth() - this.monthIncrement);
      this.$emit('change-month', date);
    },
    gotoNextMonth() {
      const date = new Date(this.date);
      date.setMonth(date.getMonth() + this.monthIncrement);
      this.$emit('change-month', date);
    }
  }
}
</script>
