"use client";

import { FormEvent } from "react";
import useSnackBar from "@components/snackbar/Snackbar";
import Button from "@components/ui/Button/Button";
import {
  SUCCESS_PASSWORD_UPDATE,
  FAILED_CHANGE_PASSWORD,
} from "@consts/messages";
import { IChangePasswordForm } from "@models/profile";
import { Form, Input } from "antd";
import { styles } from ".";
import { useSession } from "next-auth/react";

type FormFields = {
  oldPassword: string;
  newPassword: string;
};

const ChangePasswordForm = ({ handleChangePassword }: IChangePasswordForm) => {
  const [form] = Form.useForm<FormFields>();

  const { showSnackbar } = useSnackBar();
  const { data } = useSession();
  const email = data?.user?.email || "";

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const values = await form.validateFields();
      const { oldPassword, newPassword } = values;

      if (oldPassword && newPassword) {
        await handleChangePassword(email, oldPassword, newPassword);

        form.setFieldsValue({ oldPassword: "", newPassword: "" });
        showSnackbar({ message: SUCCESS_PASSWORD_UPDATE });
      }
    } catch (error) {
      showSnackbar({ message: FAILED_CHANGE_PASSWORD, variant: "error" });
    }
  };

  return (
    <Form id="profileForm" form={form} autoComplete="off" layout="vertical">
      <Form.Item<FormFields>
        label="Old password"
        name="oldPassword"
        rules={[{ required: true, message: "Please, fill your old password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<FormFields>
        label="New password"
        name="newPassword"
        rules={[{ required: true, message: "Please, fill your new password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<FormFields> shouldUpdate>
        {({ getFieldsValue }) => {
          const { oldPassword, newPassword } = getFieldsValue();
          const isDisabled =
            !!oldPassword && !!newPassword && oldPassword === newPassword;
          return (
            <Button
              form="profileForm"
              htmlType="submit"
              disabled={isDisabled}
              onClick={submitHandler}
              style={styles.submitBtn}
            >
              Change password
            </Button>
          );
        }}
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
