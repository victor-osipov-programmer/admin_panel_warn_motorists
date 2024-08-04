import { addZero } from "@/shared/libs"
import { IStatistic } from "../types"
import { Ref } from "vue"

export function useStatisticsGenerator(statistics: Ref<IStatistic[]>) {
    return (label: string, property: 'total_earnings' | 'count') => {
        const labels: string[] = []
        const data: number[] = []

        statistics.value.forEach(el => {
            labels.push(format(new Date(el.date)))
            data.push(el[property])
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
}

export function format(date: Date) {
    const day: string = addZero(date.getDate())
    const month: string = addZero(date.getMonth() + 1)

    return `${day}.${month}`
}