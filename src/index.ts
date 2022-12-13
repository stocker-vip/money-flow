import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs';
import {  Subject } from 'rxjs';
import {WebSocket, WebSocketServer} from 'ws'
import { BkList, BkListFetcher, Tick, BKTickFetcher } from './fn';
import { createObserval$ } from './pipe/create';

const prisma = new PrismaClient()

const updateTime = 10;
const connections :Set<WebSocket> = new Set();
// let  BkListArray:BkList.Diff[] = [];
// let  today = dayjs().format("YYYY-MM-DD");

async function main() {

    const server = new WebSocketServer({port:8989});
    server.on("connection",socket=>{
        connections.add(socket);
        socket.on("close",()=>{
            console.log("close")
            connections.delete(socket);
            console.log(connections.size)
        })
    })

    // const getBkList = async ()=>{
    //     const BkListValue = await BkListFetcher().catch(e=>null);
    //     if(BkListValue){
    //         BkListArray = BkListValue;
    //         return true
    //     }
    //     return false
    // }

    const subject = new Subject<Tick.Diff[]>();

    createObserval$(true)(updateTime).subscribe(async (time)=>{
        // if(time.split(" ")[0]!==today){
        //     if(await getBkList()){
        //         today = time.split(" ")[0];
        //     }
        // }
        // if(BkListArray.length===0){
        //     if(await getBkList()){
        //         today = time.split(" ")[0];
        //     }
        // }
        const tickValue = await BKTickFetcher().catch(e=>null);
        if(tickValue){
            subject.next(tickValue);
        }
    })
    subject.subscribe(tick=>{
        connections.forEach(socket=>{
            socket.send(JSON.stringify(tick));
        })
    })
    subject.subscribe(async tick=>{
        const data = await prisma.stockTick.createMany({
            data:tick
        })
        console.log(data)
    })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })