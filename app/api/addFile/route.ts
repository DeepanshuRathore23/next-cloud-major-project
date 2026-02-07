import postgres from "postgres";
import { addFile } from "@/app/lib/data";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});


export async function POST(req: Request) {
    const formData = await req.formData();
  
    try {
      await addFile(formData);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
      console.error('❌ Internal Error at POST request of adding image:', err); // Add this
      return new Response(JSON.stringify({ error: 'Failed to add image', details: (err as any).message }), { status: 500 });
    }
}