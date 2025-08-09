import http from 'http'

import { App } from './app'

const PORT=process.env.PORT
const SERVICE = process.env.USERSERVICE
async function startServer(){
    http.createServer(App).listen(PORT,()=>{
        console.log(`${SERVICE} starting`)
        console.log(`Listen to PORT ${PORT} ....`)
    })
}

startServer()