import 'dotenv/config'
import app from './app'
const port = process.env.PORT;
const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log("server started on port: ", port);
        })
    }catch(error){
        console.log("Error Starting the Server: ", error)
    }
}

startServer();

