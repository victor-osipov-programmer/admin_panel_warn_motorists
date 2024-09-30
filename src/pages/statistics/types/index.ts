export interface IStatistic {
    time: string,
    count: number
}
export interface IFetchStatistics {
    total_users: number,
    total_buys: number,

    buys: IStatistic[] | null,
    new_users: IStatistic[] | null,
}