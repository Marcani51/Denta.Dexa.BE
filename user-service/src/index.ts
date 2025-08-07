import http from 'http'

import { App } from './app'

const PORT=process.env.PORT || 5850

async function startServer(){
    http.createServer(App).listen(PORT,()=>{
        console.log("User-service starting")
        console.log(`Listen to PORT ${PORT} ....`)
    })
}

startServer()
