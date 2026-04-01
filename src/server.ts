import 'dotenv/config'
import {createServer} from "node:http"
import { createApplication } from './App/app';
import ApiError from './App/auth/utils/api-error';

async function main() {
    try {
        const server = createServer(createApplication()); //server created by node but express will handle the routes
        const port = process.env.PORT || 8000
        server.listen(port,()=>{
            console.log(`server running on port ${port}`)
        })
    } catch (error) {
        throw ApiError.serverError("Error while starting http server")
    }
}

await main()