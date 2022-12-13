import axios from "axios";
import dayjs from "dayjs";

export declare module Tick {
	export interface Diff {
		f2: number;
		f3: number;
		f4: number;
		f5: number;
		f6: number;
		f7: number;
		f8: number;
		f9: number;
		f10: number;
		f11: number;
		f12: string;
		f13: number;
		f14: string;
		f15: number;
		f16: number;
		f17: number;
		f18: number;
		f62: number;
		f63: number;
		f64: number;
		f65: number;
		f66: number;
		f67: number;
		f68: number;
		f69: number;
		f70: number;
		f71: number;
		f72: number;
		f73: number;
		f74: number;
		f75: number;
		f76: number;
		f77: number;
		f78: number;
		f79: number;
		f80: number;
		f81: number;
		f82: number;
		f83: number;
		f84: number;
		f85: number;
		f86: number;
		f87: number;
		f100: string;
		f102: string;
		f103: string;
		f104: number;
		f105: number;
		f124: number;
		f125: number;
		f126: number;
		f127: number;
		f128: string;
		f140: string;
		f141: number;
		f136: number;
		f265: string;
		f297: number;
	}

	export interface Data {
		total: number;
		diff: Diff[];
	}

	export interface RootObject {
		rc: number;
		rt: number;
		svr: number;
		lt: number;
		full: number;
		dlmkts: string;
		data: Data;
	}
}
// 获取stockTick
export const TickUrl = (...codes: string[]) =>
	`https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&secids=${codes.join(
		","
	)}&fields=f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15,f16,f17,f18,f62,f63,f64,f65,f66,f67,f68,f69,f70,f71,f72,f73,f74,f75,f76,f77,f78,f79,f80,f81,f82,f83,f84,f85,f86,f87,f100,f102,f103,f104,f105,f124,f128,f136,f140,f265,f297`;

export const BKTickFetcher = async () => {
	const res = await axios
		.get<Tick.RootObject>(
			`https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=500&po=1&np=1&fields=f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15,f16,f17,f18,f62,f63,f64,f65,f66,f67,f68,f69,f70,f71,f72,f73,f74,f75,f76,f77,f78,f79,f80,f81,f82,f83,f84,f85,f86,f87,f100,f102,f103,f104,f105,f124,f128,f136,f140,f265,f297&fid=f62&fs=m:90+t:2&ut=b2884a393a59ad64002292a3e90d46a5`,
			{
				headers: { "Accept-Encoding": "gzip,deflate,compress" },
			}
		)
		.catch((e) => console.log(e));
	return res?.data.data.diff;
};

export declare module BkList {
	export interface Diff {
		f12: string;
		f14: string;
	}

	export interface Data {
		total: number;
		diff: Diff[];
	}

	export interface RootObject {
		rc: number;
		rt: number;
		svr: number;
		lt: number;
		full: number;
		dlmkts: string;
		data: Data;
	}
}
// 获取行业板块List
export const BkListUrl = () =>
	`https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=500&po=1&np=1&fid=f62&ut=b2884a393a59ad64002292a3e90d46a5&fields=f12,f14&fs=m:90+t:2`;

export const BkListFetcher = async () => {
	console.log("BkListFetcher");
	const res = await axios.get<BkList.RootObject>(BkListUrl());
	return res.data.data.diff;
};
