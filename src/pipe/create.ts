import dayjs from "dayjs";
import { filter, interval, map, Observable } from "rxjs";

export const createUnixTime$ = (updateTime: number) =>
	interval(updateTime * 1000).pipe(map(() => dayjs().unix()));

export const FilterWeekend$ = (obser: Observable<number>) =>
	obser.pipe(
		filter((unixTime) => {
			const day = dayjs.unix(unixTime).day();
			return !(day === 0 || day === 6);
		})
	);
export const FilterTradingTim$ = (obser: Observable<number>) =>
	obser.pipe(
		filter((unixTime) => {
			const now = dayjs.unix(unixTime).format("HH:mm:ss");
			return (
				(now >= "09:30:00" && now <= "11:30:00") ||
				(now >= "13:00:00" && now <= "15:00:00")
			);
		})
	);


export const ToTime$ = (obser: Observable<number>) =>
    obser.pipe(map((unixTime) => dayjs.unix(unixTime).format("YYYY-MM-DD HH:mm:ss")));


export const Production$ =(updateTime:number)=>ToTime$(FilterTradingTim$(FilterWeekend$(createUnixTime$(updateTime))));

export const Dev$ = (updateTime:number)=>ToTime$(createUnixTime$(updateTime))

export const createObserval$ = (isProd:boolean)=> isProd ? Production$ : Dev$;