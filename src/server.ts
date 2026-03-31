import 'dotenv/config'
import {createServer} from "node:http"
import { createApplication } from './App/app';

async function main() {
    try {
        const server = createServer(createApplication()); //server created by node but express will handle the routes
        const port = process.env.PORT || 8000
        server.listen(port,()=>{
            console.log(`server running on port ${port}`)
        })
    } catch (error) {
        console.log(`Error while starting http server`)
        throw error
    }
}

await main()