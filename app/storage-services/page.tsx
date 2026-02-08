'use client';
import { useState, useEffect } from 'react';


type FileItem = {
  id: string;
  name: string;
  file_size: number;
  uploaded_at: string;
};

export default function page() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  

  async function fetchFiles() {
      const res = await fetch('/api/fetchFiles');
      if (!res.ok) {
        throw new Error('Failed to fetch files');
      }
      const data = await res.json();
      setFiles(data);
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  async function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);

      const res = await fetch('/api/addFile', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      alert('File uploaded successfully');
      fetchFiles();
      
      // later: re-fetch images from DB
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }

    
  }

  async function hangleFileDelete(id: string) {
    try{
      setDeletingId(id);
      const res = await fetch(`api/deleteFile/${id}`, {
        method: "DELETE"
      });

      if(res.ok) {
        alert("File Deleted Successfully");
      } else {
        console.error("Failed to delete the file");
      }
      setDeletingId(null);
      fetchFiles();
    } catch(err) {
      console.error("Failed to delete file: ", err);
    }
  }

  function isImage(name: string) {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(name);
  }

  return (
    <div className="min-h-screen bg-[#fdf8ef] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Upload Images */}
        <div className="mb-16 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            🖼️ File Storage
          </h2>

          <label className="block">
            <input
              type="file"
              // accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="inline-block cursor-pointer rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
              {uploading ? 'Uploading...' : 'Upload File'}
            </span>
          </label>
        </div>

        {/* Uploaded Images */}
        <div>
          <h3 className="mb-6 text-2xl font-semibold text-slate-900">
            Uploaded Files
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
              >
                {/* Preview */}
                <a
                  href={`/api/files/${file.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-3"
                >
                  {isImage(file.name) ? (
                    <img
                      src={`/api/files/${file.id}`}
                      alt={file.name}
                      className="h-40 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-lg bg-slate-100 text-4xl">
                      📄
                    </div>
                  )}
                </a>

                <p className="font-medium text-slate-800 truncate">
                  {file.name}
                </p>

                <p className="text-sm text-slate-500">
                  {(file.file_size / 1024).toFixed(1)} KB
                </p>

                <p className="text-xs text-slate-400 mb-3">
                  Uploaded: {new Date(file.uploaded_at).toLocaleDateString()}
                </p>

                {/* Download */}
                <a
                  href={`api/files/${file.id}`}
                  
                  className="inline-block rounded-lg bg-slate-100 px-4 py-2 text-sm text-black hover:bg-slate-200"
                >
                  Download
                </a>

                {/* Delete */}
                <button
                  onClick={() => hangleFileDelete(file.id)}
                  disabled = {deletingId == file.id}
                  className={`inline-block cursor-pointer rounded-lg ${deletingId == file.id ? "bg-red-500 cursor-not-allowed" : "bg-red-500"} px-4 py-2 text-sm text-black hover:bg-red-600 ml-5`}
                >
                  {deletingId == file.id ? "Deleting File..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
