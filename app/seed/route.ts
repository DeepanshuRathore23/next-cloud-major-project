import {users} from '../lib/placeholder-data'
import postgres from 'postgres'
import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

async function seedUser(){
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`CREATE TABLE IF NOT EXISTS major_project_users(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        dob DATE,
        phone_number VARCHAR(20)
    )`;

    for (const user of users) {
        const [day, month, year] = user.dob.split('-');
        const formattedDob = `${year}-${month}-${day}`;

        const hashedPass = await bcrypt.hash(user.password, 10);

        await sql`
            INSERT INTO major_project_users(email, password, first_name, last_name, dob, phone_number)
            VALUES(${user.email}, ${hashedPass}, ${user.first_name}, ${user.last_name}, ${formattedDob}, ${user.phone})
            ;
        `;
    }
}


async function seedFiles() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`CREATE TABLE IF NOT EXISTS files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,

    name VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,

    file_path TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES major_project_users(id) ON DELETE CASCADE
);
`
}



export async function GET() {
    try{
        await sql.begin(async (tx) => {
            await seedFiles();
        });

        return Response.json({ message: 'files table created successfully' });
    } catch (error) {
        if(error instanceof AggregateError) {
            error.errors.forEach((err, index) => {
                console.log("Error ", index);
                console.log("Message: ", err.message);
                console.log("Stack: ", error.stack);
                console.log("Cause: ", error.cause);
            })
        }
        return Response.json({ error: String(error) });
    }
}