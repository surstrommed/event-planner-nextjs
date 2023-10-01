"use client";

import useSnackBar from "@components/snackbar/Snackbar";
import Button from "@components/ui/Button/Button";
import { FAILED_SIGNIN } from "@consts/messages";
import { IAuthForm } from "@models/auth";
import { Form, Input, Row, Col, Card, ColProps } from "antd";
import { FormEvent } from "react";
import { styles } from ".";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getTheme } from "store/selectors/theme";
import Title from "@components/ui/Title/Title";

type FormFields = {
  email: string;
  password: string;
};

const { signInForm } = styles;

const SignInForm = ({ toggleAuthType, signInHandler }: IAuthForm) => {
  const [form] = Form.useForm<FormFields>();

  const theme = useAppSelector(getTheme);
  const { showSnackbar } = useSnackBar();
  const dispatch = useAppDispatch();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const values = await form.validateFields();
      const { email, password } = values;
      await signInHandler(email, password, dispatch);
    } catch {
      showSnackbar({ message: FAILED_SIGNIN, variant: "error" });
    }
  };

  return (
    <Row justify="center" align="middle" style={signInForm.container}>
      <Col span={6}>
        <Card style={signInForm.card}>
          <Title level={2} style={signInForm.title}>
            Sign In
          </Title>
          <Form
            id="signInForm"
            form={form}
            labelCol={signInForm.formLabel as ColProps}
            wrapperCol={signInForm.formWrapper as ColProps}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FormFields>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please, fill your email!" }]}
              labelCol={signInForm.inputLabel as ColProps}
              wrapperCol={signInForm.inputWrapper as ColProps}
              style={signInForm.input}
            >
              <Input />
            </Form.Item>
            <Form.Item<FormFields>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please, fill your password!" },
              ]}
              labelCol={signInForm.inputLabel as ColProps}
              wrapperCol={signInForm.inputWrapper as ColProps}
              style={signInForm.input}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={signInForm.signInBtnWrapper as ColProps}
              style={signInForm.signInBtn}
            >
              <Button
                form="signInForm"
                key="submit"
                htmlType="submit"
                onClick={submitHandler}
              >
                Sign In
              </Button>
            </Form.Item>
            <Form.Item
              wrapperCol={signInForm.signUpBtnWrapper as ColProps}
              style={signInForm.signUpBtn}
            >
              <Button onClick={toggleAuthType}>Create new account</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignInForm;
