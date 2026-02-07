export type User = {
    id: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    dob: string, 
    phone: string
}

export type Files = {
  id: string;
  user_id: string;
  name: string;
  file_path: string;
  file_size: number;     // bytes
  uploaded_at: Date;
};
