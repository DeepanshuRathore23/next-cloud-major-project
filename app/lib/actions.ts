'use server';
 
import { signIn, signOut } from '@/auth';
import postgres from 'postgres';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import credentials from 'next-auth/providers/credentials';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});
 
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const res = await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut({redirectTo: '/'});
}

export async function signUp(prevState: string | undefined, formData: FormData) {
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const dob  = formData.get("dob") as string;
  const phone = formData.get("phone") as string;


  if(!firstName || !email || !password) {
    console.log("All feilds are required");
    return "All fields are required";
  }

  // console.log(name, email);

    ///check if user pre exists
    const existing = await sql`SELECT * FROM major_project_users WHERE email = ${email}`;
    if(existing.count > 0) {
      return "User already exists.";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //insert users
    await sql`
      INSERT INTO major_project_users (first_name, last_name, email, password, dob, phone_number)
      VALUES (${firstName},${lastName} , ${email}, ${hashedPassword}, ${dob}, ${phone});
    `;

    //auto signIn
    const logDone = await signIn("credentials", {email, password, redirectTo: '/dashboard'});
   

    return "success";
  
}