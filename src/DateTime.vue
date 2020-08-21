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
import moment from 'moment';

export default {
  name: "DateTime",
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
      defaultTimeRange: [
        moment().subtract(1, 'months').format( 'YYYY-MM-DD 00:00:00'),
        moment().format( 'YYYY-MM-DD 00:00:00'),
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick: this.formatWeekPicker
          },
          {
            text: '最近一个月',
            onClick: this.formatMonthPicker
          },
          {
            text: '最近三个月',
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
      immediate: true,
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
