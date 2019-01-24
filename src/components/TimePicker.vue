<template>
  <div>
    <select v-model="hour">
      <option
        v-for="option in availableHours"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <select v-model="minute">
      <option
        v-for="option in availableMinutes"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  computed: {
    hour: {
      get() {
        return this.date.getHours();
      },
      set(hh) {
        const date = new Date(this.date);
        date.setHours(hh);
        this.$emit('update:date', date);
      }
    },
    minute: {
      get() {
        return this.date.getMinutes();
      },
      set(mm) {
        const date = new Date(this.date);
        date.setMinutes(mm);
        this.$emit('update:date', date);
      }
    },
    availableHours() {
      const hours = [];
      for (let h = 0; h < 24; h++) {
        hours.push({
          label: h,
          value: h
        });
      }
      return hours;
    },
    availableMinutes() {
      const minutes = [];
      for (let m = 0; m < 60; m++) {
        let minute = m.toString();
        if (minute.length < 2) {
          minute = '0' + minute;
        }
        minutes.push({
          label: minute,
          value: m
        });
      }
      return minutes;
    }
  }
};
</script>