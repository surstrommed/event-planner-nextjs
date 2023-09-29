"use client";

import { useState } from "react";
import {
  IEventFilterData,
  IEventSortData,
  IEventsConfigurator,
} from "@models/events";
import Button from "@components/ui/Button/Button";
import EventsFilter from "./EventsFilter/EventsFilter";
import EventsSort from "./EventsSort/EventsSort";
import { Modal } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import useSnackBar from "@components/snackbar/Snackbar";
import { SELECT_OPTION_FILTER_SORT } from "@consts/messages";
import { urlBuilder } from "@lib/utils";
import {
  ALL_FILTER_SORT_PARAMS,
  CREATE_DATE_SORT,
  END_MONTH_FILTER,
  END_YEAR_FILTER,
  START_MONTH_FILTER,
  START_YEAR_FILTER,
  TITLE_SORT,
} from "@consts/common";

const EventsConfigurator = ({ eventsYears }: IEventsConfigurator) => {
  const { push } = useRouter();
  const { showSnackbar } = useSnackBar();
  const params = useSearchParams();

  const startMonthQuery = params.get(START_MONTH_FILTER);
  const endMonthQuery = params.get(END_MONTH_FILTER);
  const startYearQuery = params.get(START_YEAR_FILTER);
  const endYearQuery = params.get(END_YEAR_FILTER);
  const titleQuery = params.get(TITLE_SORT);
  const createDateQuery = params.get(CREATE_DATE_SORT);
  const allConfigurationParams = [
    startMonthQuery,
    endMonthQuery,
    startYearQuery,
    endYearQuery,
    titleQuery,
    createDateQuery,
  ];

  const [open, setOpen] = useState(false);
  const [filterParams, setFilterParams] = useState<IEventFilterData>({});
  const [sortParams, setSortParams] = useState<IEventSortData>({});

  const handleModalSubmit = () => {
    const allParams = { ...filterParams, ...sortParams };
    const allKeys = Object.keys(allParams) as Array<keyof typeof allParams>;

    const isFieldsEmpty = !!allKeys.length
      ? allKeys.every((key) => !allParams[key])
      : true;

    if (isFieldsEmpty) {
      showSnackbar({ message: SELECT_OPTION_FILTER_SORT, variant: "error" });
      return;
    }

    let filterSortPath = window.location.href;

    filterSortPath = urlBuilder(
      filterSortPath,
      ALL_FILTER_SORT_PARAMS,
      "remove"
    );

    allKeys.forEach((key) => {
      const queryKey = ALL_FILTER_SORT_PARAMS.find((param) => param === key);
      if (allParams[key] && queryKey) {
        filterSortPath = urlBuilder(
          filterSortPath,
          queryKey,
          "add",
          allParams[key]
        );
      }
    });

    push(filterSortPath);

    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleModalClear = () => {
    let clearedPath = window.location.href;

    clearedPath = urlBuilder(clearedPath, ALL_FILTER_SORT_PARAMS, "remove");

    push(clearedPath);
  };

  const handleFilterChange = (filterParams: IEventFilterData) => {
    setFilterParams(filterParams);
  };

  const handleSortChange = (sortParams: IEventSortData) => {
    setSortParams(sortParams);
  };

  const isClearBtnDisabled = allConfigurationParams.every((param) => !param);

  return (
    <>
      <Button onClick={showModal}>Filters/Sort</Button>
      <Modal
        title="Filters/Sort for events"
        open={open}
        onCancel={handleCancel}
        footer={
          <>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleModalClear} disabled={isClearBtnDisabled}>
              Clear all
            </Button>
            <Button
              key="submit"
              htmlType="submit"
              onClick={handleModalSubmit}
              type="primary"
            >
              Submit
            </Button>
          </>
        }
      >
        <EventsFilter
          eventsYears={eventsYears}
          handleFilterChange={handleFilterChange}
        />
        <EventsSort handleSortChange={handleSortChange} />
      </Modal>
    </>
  );
};

export default EventsConfigurator;
