"use client";

import { FormEvent } from "react";
import useSnackBar from "@components/snackbar/Snackbar";
import { SUBSCRIBE_FAILED, SUBSCRIBE_SUCCESS } from "@consts/messages";
import { Form, Input, Space } from "antd";
import { styles } from ".";
import { useSession } from "next-auth/react";
import Button from "@components/ui/Button/Button";
import { subscribeNewsletter } from "@/requests";
import Title from "@components/ui/Title/Title";

type FormFields = {
  email: string;
};

const NewsletterRegistration = () => {
  const [form] = Form.useForm<FormFields>();

  const { showSnackbar } = useSnackBar();
  const { data } = useSession();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!data?.user) {
        throw new Error();
      }

      const { email } = await form.validateFields();
      if (email) {
        await subscribeNewsletter(email);

        form.setFieldValue("email", "");
        showSnackbar({ message: SUBSCRIBE_SUCCESS });
      }
    } catch {
      showSnackbar({ message: SUBSCRIBE_FAILED, variant: "error" });
    }
  };

  return (
    <Space style={styles.container}>
      <Title level={2}>Sign up to stay updated!</Title>
      <Form
        id="newsLetterRegistrationForm"
        form={form}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FormFields>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please, fill your email!" }]}
        >
          <Input />
        </Form.Item>
        <Button
          form="newsLetterRegistrationForm"
          key="submit"
          htmlType="submit"
          onClick={submitHandler}
          style={styles.submitBtn}
        >
          Subscribe
        </Button>
      </Form>
    </Space>
  );
};

export default NewsletterRegistration;
