"use client";

import React, { FormEvent, useState } from "react";
import { DatePicker, Form, Input } from "antd";
import { styles } from ".";
import useSnackBar from "@components/snackbar/Snackbar";
import {
  FAILED_CREATE_EVENT,
  FAILED_EDIT_EVENT,
  SUCCESS_CREATE_EVENT,
  SUCCESS_EDIT_EVENT,
  SUCCESS_PHOTO_UPLOAD,
} from "@consts/messages";
import dayjs, { Dayjs } from "dayjs";
import { UploadFileResponse } from "uploadthing/client";
import UploadButton from "@components/ui/UploadButton/UploadButton";
import { useSession } from "next-auth/react";
import Button from "@components/ui/Button/Button";
import { createEvent, editEvent } from "@/requests";
import { IEventManageForm } from "@models/events";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ROUTES } from "@consts/api";

const { RangePicker } = DatePicker;

type FormFields = {
  title: string;
  description: string;
  location: string;
  dates: Dayjs[];
};

const EventManageForm = ({ type, event }: IEventManageForm) => {
  const [form] = Form.useForm<FormFields>();
  const { showSnackbar } = useSnackBar();
  const { data } = useSession();
  const { push } = useRouter();
  const email = data?.user?.email || "";

  const title = Form.useWatch("title", form);
  const description = Form.useWatch("description", form);
  const location = Form.useWatch("location", form);
  const dates = Form.useWatch("dates", form);

  const initialUploadedFiles =
    event && event.image
      ? [
          {
            key: event.id,
            url: event.image,
            name: event.title,
            size: 0,
            fileKey: event.id,
            fileUrl: event.image,
            fileName: event.title,
            fileSize: 0,
          },
        ]
      : [];

  const [uploadedFiles, setUploadedFiles] =
    useState<UploadFileResponse[]>(initialUploadedFiles);

  const { TextArea } = Input;

  const handleImageRemove = () => {
    setUploadedFiles([]);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!data?.user) {
        throw new Error();
      }

      const values = await form.validateFields();
      const {
        title,
        description,
        location,
        dates: [startDate, endDate],
      } = values;

      const image = uploadedFiles.length ? uploadedFiles[0].url : "";

      if (type === "create") {
        await createEvent(
          {
            title,
            description,
            location,
            startDate: startDate as unknown as Date,
            endDate: endDate as unknown as Date,
            image,
          },
          email
        );

        showSnackbar({
          message: SUCCESS_CREATE_EVENT,
        });
      } else if (event) {
        await editEvent(
          {
            title,
            description,
            location,
            startDate: startDate as unknown as Date,
            endDate: endDate as unknown as Date,
            image,
          },
          email,
          event.id
        );

        showSnackbar({
          message: SUCCESS_EDIT_EVENT,
        });

        push(`${ROUTES.events}/${event.id}`);
        return;
      }

      form.resetFields();
      handleImageRemove();
    } catch {
      showSnackbar({
        message: type === "create" ? FAILED_CREATE_EVENT : FAILED_EDIT_EVENT,
        variant: "error",
      });
    }
  };

  const dateFormat = "YYYY-MM-DD HH:mm:ss";

  const startDate = event?.startDate
    ? dayjs(moment(new Date(event.startDate)).format(dateFormat), dateFormat)
    : undefined;

  const endDate = event?.endDate
    ? dayjs(
        moment(new Date(event.endDate as string)).format(dateFormat),
        dateFormat
      )
    : undefined;

  const formInitialValues = {
    title: event?.title,
    description: event?.description,
    location: event?.location,
    dates: [startDate, endDate],
  };

  const isManageBtnDisabled =
    type === "edit" &&
    title === event?.title &&
    description === event?.description &&
    location === event?.location &&
    (uploadedFiles?.[0]?.url || "") === event?.image &&
    dates?.[0].toDate().toString() ===
      new Date(event?.startDate as string).toString() &&
    dates?.[1].toDate().toString() ===
      new Date(event?.endDate as string).toString();

  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      style={styles.form}
      form={form}
      id="eventManageForm"
      initialValues={formInitialValues}
    >
      <Form.Item<FormFields>
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please, fill Event title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FormFields>
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please, fill Event description!" }]}
      >
        <TextArea rows={4} style={styles.descriptionTextarea} />
      </Form.Item>
      <Form.Item<FormFields>
        name="location"
        label="Location"
        rules={[{ required: true, message: "Please, fill Event location!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FormFields>
        name="dates"
        label="Dates"
        rules={[{ required: true, message: "Please, fill Event dates!" }]}
      >
        <RangePicker showTime />
      </Form.Item>
      <div style={styles.imageUploadContainer}>
        <UploadButton
          files={uploadedFiles}
          endpoint="strictImageAttachment"
          onClientUploadComplete={(res) => {
            if (res) {
              setUploadedFiles(res);
              showSnackbar({ message: SUCCESS_PHOTO_UPLOAD });
            }
          }}
          onUploadError={(error) => {
            showSnackbar({ message: error.message, variant: "error" });
          }}
        />
        {!!uploadedFiles.length && (
          <div style={styles.removeImageBtnContainer}>
            <Button onClick={handleImageRemove}>Remove image</Button>
          </div>
        )}
      </div>
      <Form.Item>
        <Button
          form="eventManageForm"
          key="submit"
          htmlType="submit"
          onClick={submitHandler}
          style={styles.manageEventBtn}
          disabled={isManageBtnDisabled}
        >
          {type === "create" ? "Create" : "Edit"} event
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventManageForm;
