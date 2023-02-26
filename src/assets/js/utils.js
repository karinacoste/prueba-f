import { intervalToDuration } from 'date-fns'
export function timeInterval(startDate, endDate) {
  const end = endDate ? new Date(endDate) : new Date()
  try {
    const workedTime = intervalToDuration({
      start: new Date(startDate),
      end,
    })
    const hours =
      workedTime.hours < 10 ? '0' + workedTime.hours : workedTime.hours
    const minutes =
      workedTime.minutes < 10 ? '0' + workedTime.minutes : workedTime.minutes
    const seconds =
      workedTime.seconds < 10 ? '0' + workedTime.seconds : workedTime.seconds
    return hours + ':' + minutes + ':' + seconds
  } catch (error) {
    console.log(error)
  }
}
