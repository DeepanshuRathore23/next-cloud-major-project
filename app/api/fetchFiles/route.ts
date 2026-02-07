import { NextResponse } from 'next/server';
import { getFiles } from "@/app/lib/data";
import { auth } from "@/auth";

export async function GET(){
    const session = await auth();
     if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
    try{
        const files = await getFiles(session.user.id);
        return  NextResponse.json(files);
    } catch(err) {
        console.error('❌ Internal Error at GET request of fetching files:', err); // Add this
        return new Response(JSON.stringify({ error: 'Failed to fetch files', details: (err as any).message }), { status: 500 });
    }
}