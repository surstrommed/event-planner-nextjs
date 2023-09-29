"use client";

import { useEffect } from "react";
import {
  END_MONTH_FILTER,
  END_YEAR_FILTER,
  START_MONTH_FILTER,
  START_YEAR_FILTER,
  MONTHS,
} from "@consts/common";
import { IEventFilterData, IEventsFilter } from "@models/events";
import { Form, Select } from "antd";
import { useSearchParams } from "next/navigation";
import useSnackBar from "@components/snackbar/Snackbar";
import { SELECT_CORRECT_YEARS_FILTER } from "@consts/messages";
import Title from "@components/ui/Title/Title";

type FormFields = IEventFilterData;

const EventsFilter = ({ eventsYears, handleFilterChange }: IEventsFilter) => {
  const [form] = Form.useForm<FormFields>();
  const params = useSearchParams();
  const { showSnackbar } = useSnackBar();

  const startMonthQuery = params.get(START_MONTH_FILTER) || undefined;
  const endMonthQuery = params.get(END_MONTH_FILTER) || undefined;
  const startYearQuery = params.get(START_YEAR_FILTER) || undefined;
  const endYearQuery = params.get(END_YEAR_FILTER) || undefined;

  const startMonthFormValue = Form.useWatch(START_MONTH_FILTER, form);
  const endMonthFormValue = Form.useWatch(END_MONTH_FILTER, form);
  const startYearFormValue = Form.useWatch(START_YEAR_FILTER, form);
  const endYearFormValue = Form.useWatch(END_YEAR_FILTER, form);

  useEffect(() => {
    if (!startMonthQuery && form.getFieldValue(START_MONTH_FILTER)) {
      form.setFieldValue(START_MONTH_FILTER, undefined);
    }
    if (!endMonthQuery && form.getFieldValue(END_MONTH_FILTER)) {
      form.setFieldValue(END_MONTH_FILTER, undefined);
    }
    if (!startYearQuery && form.getFieldValue(START_YEAR_FILTER)) {
      form.setFieldValue(START_YEAR_FILTER, undefined);
    }
    if (!endYearQuery && form.getFieldValue(END_YEAR_FILTER)) {
      form.setFieldValue(END_YEAR_FILTER, undefined);
    }
  }, [startMonthQuery, endMonthQuery, startYearQuery, endYearQuery]);

  useEffect(() => {
    if (
      Number(startYearFormValue) &&
      Number(endYearFormValue) &&
      Number(endYearFormValue) < Number(startYearFormValue)
    ) {
      showSnackbar({ message: SELECT_CORRECT_YEARS_FILTER, variant: "error" });
      form.setFieldValue(END_YEAR_FILTER, startYearFormValue);
      return;
    }

    handleFilterChange({
      startMonth: startMonthFormValue,
      endMonth: endMonthFormValue,
      startYear: startYearFormValue,
      endYear: endYearFormValue,
    });
  }, [
    startMonthFormValue,
    endMonthFormValue,
    startYearFormValue,
    endYearFormValue,
  ]);

  return (
    <Form
      form={form}
      id="eventsFilterForm"
      initialValues={{
        [START_MONTH_FILTER]: startMonthQuery,
        [END_MONTH_FILTER]: endMonthQuery,
        [START_YEAR_FILTER]: startYearQuery,
        [END_YEAR_FILTER]: endYearQuery,
      }}
      layout="vertical"
    >
      <Title level={3}>Filtering</Title>
      <Form.Item<FormFields> name={START_MONTH_FILTER} label="Start month">
        <Select placeholder="Event start month" allowClear>
          {MONTHS.map((month) => (
            <Select.Option value={month.value} key={month.value}>
              {month.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item<FormFields> name={END_MONTH_FILTER} label="End month">
        <Select placeholder="Event end month" allowClear>
          {MONTHS.map((month) => (
            <Select.Option value={month.value} key={month.value}>
              {month.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item<FormFields> name={START_YEAR_FILTER} label="Start year">
        <Select placeholder="Event start year" allowClear>
          {eventsYears.map((year) => (
            <Select.Option value={year} key={year}>
              {year}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item<FormFields> name={END_YEAR_FILTER} label="End year">
        <Select placeholder="Event end year" allowClear>
          {eventsYears.map((year) => (
            <Select.Option value={year} key={year}>
              {year}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default EventsFilter;
