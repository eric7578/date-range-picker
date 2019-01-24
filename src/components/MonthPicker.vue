<template>
  <span>
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
  </span>
</template>

<script>
export default {
  props: {
    monthLabels: {
      type: Array,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  computed: {
    year: {
      get() {
        return this.date.getFullYear();
      },
      set(year) {
        const date = new Date(this.date);
        date.setFullYear(year);
        this.$emit('update:date', date);
      }
    },
    month: {
      get() {
        return this.date.getMonth();
      },
      set(month) {
        const date = new Date(this.date);
        date.setMonth(month);
        this.$emit('update:date', date);
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
    }
  }
};
</script>