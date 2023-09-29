import { z } from "zod";

const Pagination = z
  .object({
    allCount: z.number(),
    currentPage: z.number(),
    show: z.boolean(),
  })
  .required();

export type IPagination = z.infer<typeof Pagination>;
