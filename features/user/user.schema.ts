import z, { email } from "zod";

export const UserSchema = z.object({
  firebase: z.string(),
  hoTen: z.string(),
  email: z.string(),
  sdt: z.string(),
  ngaySinh: z.coerce.date(),
  diaChi: z.string(),
  vaiTro: z.enum(["TinhNguyenVien", "ToChuc", "Admin"]),
});

export type UserType = z.infer<typeof UserSchema>;
