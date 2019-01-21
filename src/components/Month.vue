<template>
  <table>
    <thead>
      <tr>
        <td v-for="label in weekdayLabels" :key="label">{{label}}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(week, index) in days" :key="index">
        <td v-for="day in week" :key="day.date" @click="$emit('click-day', day)">{{day.date}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
function getStartOfMonth(time) {
  const date = new Date(time);
  date.setDate(1);
  return date;
}

function getStartOfWeek(time) {
  const dateOfMonday = time.getDate() - time.getDay();
  const startOfWeek = new Date(time);
  startOfWeek.setDate(dateOfMonday);
  return startOfWeek;
}

export default {
  props: {
    monthsLabels: {
      type: Array,
      default: function () {
        return []
      }
    },
    weekdayLabels: {
      type: Array,
      default: function () {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      }
    },
    date: {
      type: Date,
      default: function () {
        return new Date();
      }
    },
    after: Date,
    before: Date
  },
  data: function () {
    return {
      days: []
    };
  },
  mounted() {
    this.initMonth();
  },
  methods: {
    initMonth() {
      // const monthName = monthsLabels[time.getMonth()];
      const firstDayOfMonth = getStartOfMonth(this.date);
      let firstDayOfWeek = getStartOfWeek(firstDayOfMonth);
      let iterDay = new Date(firstDayOfWeek);
      this.days = [];

      do {
        const week = [];
        this.days.push(week);
        for (let day = 0; day <= 6; day++) {
          week.push({
            month: iterDay.getMonth(),
            date: iterDay.getDate(),
            isAfter: this.after && iterDay.getTime() > this.after.getTime(),
            isBefore: this.before && iterDay.getTime() < this.before.getTime()
          });
          iterDay.setDate(iterDay.getDate() + 1);
        }
        firstDayOfWeek = iterDay;
      } while (firstDayOfWeek.getMonth() === this.date.getMonth())
    }
  }
}
</script>

<style scoped>
</style>
