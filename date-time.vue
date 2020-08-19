/**
*   date-time 日期时间组件，从['00:00:00', '23:59:59']，默认最近一个月
*
**/
<template>
  <div>
    <el-date-picker
      v-model="dateRange"
      :type="type"
      value-format="yyyy-MM-dd HH:mm:ss"
      :clearable="false"
      :picker-options="pickerOptions"
      popper-class="wms-date-popper"
      size="small"
      :default-time="['00:00:00', '23:59:59']"
      unlink-panels
      :start-placeholder="$t('time.startTime')"
      :end-placeholder="$t('time.endTime')"
      :range-separator="$t('time.to')"
      @change="handleDateChange">
    </el-date-picker>
  </div>
</template>

<script>
import Vue from 'vue'
import func from './index.js'
Vue.use(func)
export default {
  name: "date-time",
  props: {
    value: {},
    type: {
      type: String,
      default: 'datetimerange'
    },
    showRecentYear: {//显示最近1年选项
      type: Boolean,
      default: false
    },
    showDefaultTime: {//默认显示最近一个月的时间
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dateRange: [],
      defaultTimeRange:[
        this.wmsOtherTime(new Date(), {month: -1, format: 'YYYY-MM-DD 00:00:00'}),
        this.wmsOtherTime(new Date(), {format: 'YYYY-MM-DD 23:59:59'})
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t('time.recentWeek'),
            onClick: this.formatWeekPicker
          },
          {
            text: this.$t('time.recentMonth'),
            onClick: this.formatMonthPicker
          },
          {
            text: this.$t('time.recentThreeMonth'),
            onClick: this.formatThreeWeekPicker
          },
          this.showRecentYear ? {
            text: this.$t('time.recentYear'),
            onClick: this.formatYearWeekPicker
          } : ''
        ]
      }
    }
  },
  watch: {
    value: {
      immediate:true,
      handler(value) {
        this.dateRange = value;
      }
    }
  },
  mounted() {
    //如果显示默认时间，需要将时间传递给父组件
    if (this.showDefaultTime) {
      this.$emit('input', this.defaultTimeRange);
    }
  },
  methods: {
    //最近一周
    formatWeekPicker(picker) {
      this.formatPicker(picker, 7);
    },
    //最近一个月
    formatMonthPicker(picker) {
      this.formatPicker(picker, 30);
    },
    //最近三个月
    formatThreeWeekPicker(picker) {
      this.formatPicker(picker, 90);
    },
    //最近一年
    formatYearWeekPicker(picker) {
      this.formatPicker(picker, 365);
    },
    //设置时间-公用方法
    formatPicker(picker, num) {
      const end = new Date(new Date().setHours(23, 59, 59, 0))
      const start = new Date()
      start.setTime(start.setHours(0, 0, 0, 0)-3600 * 1000 * 24 * num)
      picker.$emit('pick', [start, end])
    },
    handleDateChange(val) {
      this.$emit('input', val);
    }
  }
}
</script>
