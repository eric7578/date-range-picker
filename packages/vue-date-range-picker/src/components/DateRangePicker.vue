<template>
  <div>
    <div>{{ formatDisplay }}</div>

    <div class="calendarWrapper">
      <div>
        <date-picker
          :month-labels="monthLabels"
          :weekday-labels="weekLabels"
          :date="d0"
          @change-month="onChangeMonth0"
          @change-date="onChangeDate"
        >
        </date-picker>
        <time-picker
          v-if="timePicker"
          :increment="timePickerIncrement"
          :date.sync="selection[0]"
        >
        </time-picker>
      </div>

      <div v-if="!singleDatePicker">
        <date-picker
          :month-labels="monthLabels"
          :weekday-labels="weekLabels"
          :date="d1"
          @change-month="onChangeMonth1"
          @change-date="onChangeDate"
        >
        </date-picker>
        <time-picker
          v-if="timePicker"
          :increment="timePickerIncrement"
          :date.sync="selection[1]"
        >
        </time-picker>
      </div>

      <div>
        <input type="button" value="Cancel" @click="onClickCancel">
        <input type="button" value="Apply" @click="onClickApply">
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from './DatePicker.vue';
import TimePicker from './TimePicker.vue';
import { getStartOfDay } from '../utils/timeUtils.js';

export default {
  components: {
    DatePicker,
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
    weekLabels: {
      type: Array,
      default() {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      }
    },
    singleDatePicker: Boolean,
    linkedCalendars: {
      type: Boolean,
      default: true
    },
    timePicker: Boolean,
    timePickerIncrement: {
      type: Number,
      default: 5
    }
  },
  data() {
    const selection = [this.date];
    if (this.dateEnd) {
      selection.push(this.dateEnd);
    }

    const d0 = new Date(this.date);
    const d1 = new Date(this.date);
    d1.setMonth(d1.getMonth() + 1);

    return {
      selection,
      d0,
      d1
    };
  },
  computed: {
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
      const date = this.timePicker
        ? new Date(this.selection[0])
        : getStartOfDay(this.selection[0]);

      if (this.selection[1]) {
        const dateEnd = this.timePicker
          ? new Date(this.selection[1])
          : getStartOfDay(this.selection[1]);

        if (date.getTime() > dateEnd.getTime()) {
          this.$emit('update:date', dateEnd);
          this.$emit('update:dateEnd', date);
        } else {
          this.$emit('update:date', date);
          this.$emit('update:dateEnd', dateEnd);
        }
      } else {
        this.$emit('update:date', date);
      }
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
    },
    onChangeMonth0(date) {
      this.d0 = date;

      if (this.linkedCalendars || this.d0.getTime() > this.d1.getTime()) {
        const d1 = new Date(date);
        d1.setMonth(d1.getMonth() + 1);
        this.d1 = d1;
      }
    },
    onChangeMonth1(date) {
      this.d1 = date;

      if (this.linkedCalendars || this.d0.getTime() > this.d1.getTime()) {
        const d0 = new Date(date);
        d0.setMonth(d0.getMonth() - 1);
        this.d0 = d0;
      }
    },
    onChangeDate(date) {
      this.selection.shift();
      this.selection.push(date);
    }
  }
};
</script>

<style scoped>
.calendarWrapper {
  display: flex;
}
</style>
