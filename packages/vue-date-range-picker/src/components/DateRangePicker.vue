<template>
  <div>
    <div>{{ formatDisplay }}</div>

    <div class="calendarWrapper">
      <div>
        <div>
          <input type="button" value="Prev" @click="gotoPrevMonth">
          <month-picker :month-labels="monthLabels" :date.sync="displayStart"></month-picker>
          <input type="button" value="Next" @click="gotoNextMonth" v-if="singleDatePicker">
        </div>
        <calendar :month-labels="monthLabels" :selected-date.sync="selection[0]" :display-date="displayStart"></calendar>
        <time-picker :date.sync="selection[0]"></time-picker>
      </div>

      <div v-if="!singleDatePicker">
        <div>
          <month-picker :month-labels="monthLabels" :date.sync="displayEnd"></month-picker>
          <input type="button" value="Next" @click="gotoNextMonth">
        </div>
        <calendar :month-labels="monthLabels" :selected-date.sync="selection[1]" :display-date="displayEnd"></calendar>
        <time-picker :date.sync="selection[1]"></time-picker>
      </div>

      <div>
        <input type="button" value="Cancel" @click="onClickCancel">
        <input type="button" value="Apply" @click="onClickApply">
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from './Calendar.vue';
import MonthPicker from './MonthPicker.vue';
import TimePicker from './TimePicker.vue';

export default {
  components: {
    Calendar,
    MonthPicker,
    TimePicker
  },
  props: {
    date: {
      type: Date,
      required: true
    },
    dateEnd: Date,
    monthLabels: {
      type: Array,
      default() {
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      }
    },
    singleDatePicker: Boolean
  },
  data() {
    const data = {};
    data.selection = [this.date];
    if (this.dateEnd) {
      data.selection.push(this.dateEnd);
    }

    data.displayStart = new Date(this.date);

    return data;
  },
  computed: {
    displayEnd: {
      get() {
        if (this.singleDatePicker) {
          return false;
        }
        const displayEnd = new Date(this.displayStart);
        displayEnd.setMonth(displayEnd.getMonth() + 1);
        return displayEnd;
      },
      set(displayEnd) {
        const displayStart = new Date(displayEnd);
        displayStart.setMonth(displayEnd.getMonth() - 1);
        this.displayStart = displayStart;
      }
    },
    formatDisplay() {
      if (this.dateEnd) {
        return `${this.getFormatDisplay(this.date)} - ${this.getFormatDisplay(this.dateEnd)}`;
      }
      return this.getFormatDisplay(this.date);
    }
  },
  methods: {
    onClickCancel() {
    },
    onClickApply() {
      this.$emit('update:date', this.selection[0]);
      if (this.selection[1]) {
        this.$emit('update:dateEnd', this.selection[1]);
      }
    },
    formatSelectionDisplay(date) {
      const month = this.monthLabels[date.getMonth()];
      return `${month} ${date.getDate()}, ${date.getFullYear()}`;
    },
    formatMonthDisplay(date) {
      const month = this.monthLabels[date.getMonth()];
      return `${month} ${date.getFullYear()}`;
    },
    gotoPrevMonth() {
      const nextDisplayDate = new Date(this.displayStart);
      nextDisplayDate.setMonth(nextDisplayDate.getMonth() - 1);
      this.displayStart = nextDisplayDate;
    },
    gotoNextMonth() {
      const nextDisplayDate = new Date(this.displayStart);
      nextDisplayDate.setMonth(nextDisplayDate.getMonth() + 1);
      this.displayStart = nextDisplayDate;
    },
    getFormatDisplay(date) {
      const month = this.monthLabels[date.getMonth()];

      let dd = date.getDate();
      dd = dd > 9 ? dd : '0' + dd;

      let display = `${month} ${dd}, ${date.getFullYear()}`;

      if (this.timePicker) {
        let hh = date.getHours();
        hh = hh > 9 ? hh : '0' + hh;

        let mm = date.getMinutes();
        mm = mm > 9 ? mm : '0' + mm;

        display = `${display} ${hh}:${mm}`;
      }
      return display;
    }
  }
};
</script>

<style scoped>
.calendarWrapper {
  display: flex;
}
</style>
