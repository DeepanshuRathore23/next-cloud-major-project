import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM major_project_users WHERE email=${email}`;
    // console.log(user);
    const users = await sql`SELECT * FROM major_project_users`
    console.log("Major Project Users : ", users);
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    if(error instanceof AggregateError) {
      console.error("Aggregate error: Multiple errors");
      error.errors.forEach((err, index) => {
        console.error(`Error ${index + 1}:`, err);
        console.error(`  Message: ${err.message}`);
        console.error(`  Stack: ${err.stack}`);
      })
    }
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
            
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        
        console.log("Invalid Credentials");
        return null;
      },
    }),
  ],
});