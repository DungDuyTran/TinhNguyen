import z from "zod";

export const UserSchema = z.object({
  firebaseUid: z.string(),
  hoTen: z.string(),
  email: z.string().optional(),
  sdt: z.string(),
  ngaySinh: z.coerce.date(),
  diaChi: z.string(),
  vaiTro: z.enum(["TinhNguyenVien", "ToChuc", "Admin"]),
});

export type UserType = z.infer<typeof UserSchema>;
