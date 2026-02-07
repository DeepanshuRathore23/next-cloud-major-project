import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(
    
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params; // ✅ unwrap params
    

  const session = await auth();
  console.log("User Id:", session?.user?.id )
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const file = await sql<{
    file_path: string;
    name: string;
  }[]>`
    SELECT file_path, name
    FROM files
    WHERE id = ${id}
    AND user_id = ${session.user.id}
  `;

  if (!file.length) {
    return new NextResponse('File not found', { status: 404 });
  }

  const absolutePath = path.join(process.cwd(), file[0].file_path);

  if (!fs.existsSync(absolutePath)) {
    return new NextResponse('File missing on server', { status: 404 });
  }

  const buffer = fs.readFileSync(absolutePath);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `inline; filename="${file[0].name}"`,
    },
  });
}
