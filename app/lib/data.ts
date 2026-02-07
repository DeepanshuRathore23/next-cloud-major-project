import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { auth } from '@/auth';
import { Files } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/* =========================
   GET FILES
========================= */
export async function getFiles(userId: string): Promise<Files[]> {
    console.log("user id at getFiles: ", userId);
  try {
    const files = await sql<Files[]>`
      SELECT 
        id,
        user_id,
        name,
        file_path,
        file_size,
        uploaded_at
      FROM files
      WHERE user_id = ${userId}
      ORDER BY uploaded_at DESC
    `;
    return files;
  } catch (err) {
    console.error('Error at getFiles:', err);
    return [];
  }
}

/* =========================
   ADD FILE
========================= */
export async function addFile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;
  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('No file provided');
  }

  // Convert File → Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Storage path
  const uploadDir = path.join(process.cwd(), 'storage/files');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const originalName = file.name.replace(/\s+/g, '_');
  const storedName = `${randomUUID()}_${originalName}`;
  const absolutePath = path.join(uploadDir, storedName);
  const relativePath = `storage/files/${storedName}`;

  // Save file
  fs.writeFileSync(absolutePath, buffer);

  // Metadata
  const fileSize = buffer.length; // bytes

  // DB insert
  await sql`
    INSERT INTO files (user_id, name, file_path, file_size)
    VALUES (${userId}, ${originalName}, ${relativePath}, ${fileSize})
  `;

  return { success: true };
}


/* =========================
   DELETE FILE
========================= */
export async function deleteFile(id: string) {
  try{
    await sql`DELETE FROM files WHERE id = ${id}`;
  } catch(error) {
    console.error("Error deleting event: ", error);
  }
}