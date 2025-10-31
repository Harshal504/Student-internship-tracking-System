import {createConnection} from 'mysql2/promise';


let conn = null;
export async function connectDB(){
   try{
    conn = await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'cdac@073',
            port: 3306,
            database: 'internship_portal'
        });

    console.log(conn);

   } catch(error){
    console.log("Db not connected");
   }
}

