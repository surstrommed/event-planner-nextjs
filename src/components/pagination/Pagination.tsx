"use client";

import { EVENTS_PER_PAGE } from "@consts/api";
import { PAGE_QUERY } from "@consts/common";
import { urlBuilder } from "@lib/utils";
import { IPagination } from "@models/pagination";
import { Pagination as AntdPagination, PaginationProps } from "antd";
import { usePagination } from "hooks/usePagination";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { styles } from ".";

const Pagination = ({ allCount, currentPage, show }: IPagination) => {
  const { push } = useRouter();

  const onPageChange = (page: number) => {
    const routeWithPage = urlBuilder(
      window.location.href,
      PAGE_QUERY,
      "add",
      `${page}`
    );
    push(routeWithPage);
  };

  const { page, setPage, resetPagination } = usePagination({
    contentPerPage: EVENTS_PER_PAGE,
    count: allCount,
    currentPage,
    onPageChange,
  });

  useEffect(() => {
    resetPagination(allCount);
  }, [allCount]);

  const onPaginationChange: PaginationProps["onChange"] = (page: number) => {
    setPage(page);
  };

  if (!show) {
    return null;
  }

  return (
    <div style={styles.container}>
      <AntdPagination
        onChange={onPaginationChange}
        current={page}
        total={allCount}
        pageSize={EVENTS_PER_PAGE}
      />
    </div>
  );
};

export default Pagination;
