import {
  END_MONTH_FILTER,
  END_YEAR_FILTER,
  PAGE_QUERY,
  SEARCH_QUERY,
  START_MONTH_FILTER,
  START_YEAR_FILTER,
} from "@consts/common";
import { IUsePagination } from "@models/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const usePagination: IUsePagination = ({
  contentPerPage,
  count,
  currentPage,
  onPageChange,
}) => {
  const params = useSearchParams();
  const pageQuery = params.get(PAGE_QUERY);

  const searchQuery = params.get(SEARCH_QUERY);
  const startMonthQuery = params.get(START_MONTH_FILTER);
  const endMonthQuery = params.get(END_MONTH_FILTER);
  const startYearQuery = params.get(START_YEAR_FILTER);
  const endYearQuery = params.get(END_YEAR_FILTER);
  const filterQueries = [
    searchQuery,
    startMonthQuery,
    endMonthQuery,
    startYearQuery,
    endYearQuery,
  ];

  const [page, setPage] = useState<number>(currentPage);
  const [pageCount, setPageCount] = useState<number>(
    Math.ceil(count / contentPerPage)
  );

  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;

  const changePage = (direction: boolean) => {
    setPage((state) => {
      if (direction) {
        if (state === pageCount) {
          return state;
        }
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  const setPageSafe = (num: number) => {
    if (num > pageCount) {
      setPage(pageCount);
    } else if (num < 1 || pageCount === 0) {
      setPage(1);
    } else {
      setPage(num);
    }
  };

  useEffect(() => {
    onPageChange(page);
  }, [page]);

  useEffect(() => {
    if (
      pageQuery &&
      Number(pageQuery) !== 1 &&
      filterQueries.some((query) => !!query)
    ) {
      setPageSafe(1);
    }
  }, [...filterQueries]);

  const resetPagination = (contentCount: number) => {
    setPageCount(Math.ceil(contentCount / contentPerPage));
  };

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSafe,
    resetPagination,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};
