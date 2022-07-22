import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
// dayjs默认不支持utc时间格式的转化，所以对dayjs进行拓展
dayjs.extend(utc)
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export default function formatUtcString(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
