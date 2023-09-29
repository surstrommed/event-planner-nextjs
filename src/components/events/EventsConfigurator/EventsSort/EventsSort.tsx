"use client";

import { useEffect } from "react";
import {
  CREATE_DATE_SORT,
  TITLE_SORT,
  SORT_OPTIONS,
  SORT_FORM_PARAMETER,
  ALL_SORT_PARAMS,
} from "@consts/common";
import { IEventSort, IEventSortFormData } from "@models/events";
import { Form, Select } from "antd";
import { useSearchParams } from "next/navigation";
import { getFormattedSortParameter, parseSortParameter } from "@lib/utils";
import Title from "@components/ui/Title/Title";

type FormFields = IEventSortFormData;

const EventsSort = ({ handleSortChange }: IEventSort) => {
  const [form] = Form.useForm<FormFields>();
  const sortParam = Form.useWatch(SORT_FORM_PARAMETER, form);
  const params = useSearchParams();

  const titleQuery = params.get(TITLE_SORT) || undefined;
  const createDateQuery = params.get(CREATE_DATE_SORT) || undefined;
  const sortParameterQuery = getFormattedSortParameter({
    title: titleQuery,
    createDate: createDateQuery,
  });
  const sortParameterFormValue = Form.useWatch(SORT_FORM_PARAMETER, form);

  useEffect(() => {
    if (
      !titleQuery &&
      !createDateQuery &&
      form.getFieldValue(SORT_FORM_PARAMETER)
    ) {
      form.setFieldValue(SORT_FORM_PARAMETER, undefined);
    }
  }, [createDateQuery, titleQuery]);

  useEffect(() => {
    const changeObject: { [key: string]: string | undefined } = {};

    if (sortParameterFormValue) {
      const splittedParam = sortParameterFormValue.split(",");
      if (splittedParam.length > 1) {
        const paramKey = splittedParam[0];
        const paramValue = splittedParam[1];
        const searchedSortParam = ALL_SORT_PARAMS.find(
          (sortParam) => paramKey === sortParam
        );

        if (searchedSortParam) {
          changeObject[searchedSortParam] = paramValue;
        }
      }
    }

    handleSortChange(changeObject);
  }, [sortParameterFormValue]);

  return (
    <Form
      form={form}
      id="eventsSortForm"
      layout="vertical"
      initialValues={{ sortParameter: sortParameterQuery }}
    >
      <Title level={3}>Sorting</Title>
      <Form.Item<FormFields>
        name={SORT_FORM_PARAMETER}
        label={parseSortParameter(sortParam || "")}
      >
        <Select
          placeholder="Choose sort parameter"
          onChange={handleSortChange}
          options={SORT_OPTIONS}
          allowClear
        />
      </Form.Item>
    </Form>
  );
};

export default EventsSort;
