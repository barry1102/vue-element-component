/* eslint-disable camelcase */
import moment from 'moment'

export default {
    install(Vue) {
        Vue.prototype.wmsOtherTime = function (v, option) {
            option = Object.assign({
                year: 0,
                month: 0,
                day: 0,
                format: 'YYYY-MM-DD HH:mm:ss',
                isMillisecond: false
            }, option)
            if (v && (v instanceof Date || typeof (v) === 'number')) {
                if (typeof (v) === 'number') {
                    v = new Date(v)
                }
                v = option.year ? new Date(v.setFullYear(v.getFullYear()+option.year)) : v
                v = option.month ? new Date(v.setMonth(v.getMonth()+option.month)) : v
                v = option.day ? new Date(v.setDate(v.getDate()+option.day)) : v
                v = option.hour ? new Date(v.setHours(v.getHours()+option.hour)) : v
                return (moment.unix(v.getTime() / 1000).utc().local().format(option.format))+(option.isMillisecond ? v.getMilliseconds() : '')
            } else {
                console.error('时间格式不正确')
                return ''
            }
        }

    }
}
