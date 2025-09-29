import z from "zod";

export const ToChucSchema = z.object({
  id: z.number().int(),
  tenToChuc: z.string(),
  moTa: z.string(),
  website: z.string(),
  nguoiDaiDien: z.string(),
});

export type ToChucType = z.infer<typeof ToChucSchema>;
