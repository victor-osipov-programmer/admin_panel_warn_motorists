export interface IStatistic {
    date: string,
    count: number,
    total_earnings: number
}
export interface IFetchStatistics {
    total_count: number,
    total_earnings: number,
    daily_stats: IStatistic[]
}