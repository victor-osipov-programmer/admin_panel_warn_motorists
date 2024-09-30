import { addZero } from "@/shared/libs"
import { IStatistic } from "../types"
import { Ref } from "vue"

// export function useStatisticsGenerator(statistics: Ref<IStatistic[]>) {
//     return (label: string, property: 'total_earnings' | 'count') => {
//         const labels: string[] = []
//         const data: number[] = []

//         statistics.value.forEach(el => {
//             labels.push(format(new Date(el.date)))
//             data.push(el[property])
//         })

//         return {
//             labels,
//             datasets: [
//                 {
//                     label,
//                     data,
//                 }
//             ]
//         }
//     }
// }

export function statisticsGenerator(label: string, statistics: Ref<IStatistic[]>, date_format = false) {
    const labels: string[] = []
    const data: number[] = []

    statistics.value.forEach(el => {
        if (date_format) {
            const res = el.time.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/i)

            if (res) {
                labels.push(res[0])
            } else {
                labels.push(el.time)
            }
        } else {
            labels.push(el.time)
        }
        data.push(el.count)
    })

    return {
        labels,
        datasets: [
            {
                label,
                data,
            }
        ]
    }
}

export function format(date: Date) {
    const day: string = addZero(date.getDate())
    const month: string = addZero(date.getMonth() + 1)

    return `${day}.${month}`
}