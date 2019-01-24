<template>
  <table>
    <thead>
      <tr>
        <td v-for="label in weekdayLabels" :key="label">{{ label }}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(week, index) in days" :key="index">
        <td
          v-for="weekDay in week"
          :key="weekDay.day.getDate()"
          @click="onClickDate(weekDay.day)"
        >
          {{ weekDay.day.getDate() }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getStartOfMonth, getStartOfWeek } from './timeUtils.js'

export default {
  props: {
    monthLabels: {
      type: Array,
      required: true,
    },
    weekdayLabels: {
      type: Array,
      default: function () {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      }
    },
    displayDate: {
      type: Date,
      required: true
    },
    selectedDate: Date,
    afterDate: Date,
    beforeDate: Date
  },
  computed: {
    monthName() {
      return this.monthsLabels[this.displayDate];
    },
    days() {
      const firstDayOfMonth = getStartOfMonth(this.displayDate);
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
      } while (firstDayOfWeek.getMonth() === this.displayDate.getMonth())

      return days;
    }
  },
  methods: {
    onClickDate(date) {
      this.$emit('update:selectedDate', date);
    }
  }
}
</script>
