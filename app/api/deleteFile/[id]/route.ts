import postgres from "postgres";
import { deleteFile } from "@/app/lib/data";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});


export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const {id} = await context.params;
  
    try {
      await deleteFile(id);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
      console.error('❌ Internal Error at DELETE request of deleting file:', err); // Add this
      return new Response(JSON.stringify({ error: 'Failed to delete file', details: (err as any).message }), { status: 500 });
    }
}