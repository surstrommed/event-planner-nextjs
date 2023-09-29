import { z } from "zod";

const UsePaginationProps = z.object({
  contentPerPage: z.number(),
  count: z.number(),
  currentPage: z.number(),
  onPageChange: z
    .function()
    .args(z.number({ description: "page" }))
    .returns(z.void()),
});

type IUsePaginationProps = z.infer<typeof UsePaginationProps>;

const UsePaginationReturn = z.object({
  page: z.number(),
  totalPages: z.number(),
  firstContentIndex: z.number(),
  lastContentIndex: z.number(),
  nextPage: z.function().args().returns(z.void()),
  prevPage: z.function().args().returns(z.void()),
  setPage: z
    .function()
    .args(z.number({ description: "page" }))
    .returns(z.void()),
  resetPagination: z.function().args(z.number()).returns(z.void()),
});
type IUsePaginationReturn = z.infer<typeof UsePaginationReturn>;

export type IUsePagination = (
  props: IUsePaginationProps
) => IUsePaginationReturn;
