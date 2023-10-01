"use client";

import useSnackBar from "@components/snackbar/Snackbar";
import Button from "@components/ui/Button/Button";
import { FAILED_SIGNUP } from "@consts/messages";
import { IAuthForm } from "@models/auth";
import { Row, Col, Card, Form, Input, ColProps } from "antd";
import { FormEvent } from "react";
import { styles } from ".";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getTheme } from "store/selectors/theme";
import { signup } from "@/requests";
import Title from "@components/ui/Title/Title";

type FormFields = {
  email: string;
  password: string;
  repeatPassword: string;
  fullName: string;
};

const { signUpForm } = styles;

const SignUpForm = ({ toggleAuthType, signInHandler }: IAuthForm) => {
  const [form] = Form.useForm<FormFields>();

  const { showSnackbar } = useSnackBar();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getTheme);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const values = await form.validateFields();
      const { email, password } = values;
      const result = await signup(values);
      if (result?.createdUser) {
        await signInHandler(email, password, dispatch);
      }
    } catch (error) {
      showSnackbar({ message: FAILED_SIGNUP, variant: "error" });
    }
  };

  return (
    <Row justify="center" align="middle" style={signUpForm.container}>
      <Col span={6}>
        <Card style={signUpForm.card}>
          <Title level={2} style={signUpForm.title}>
            Sign Up
          </Title>
          <Form
            id="signUpForm"
            form={form}
            labelCol={signUpForm.formLabel as ColProps}
            wrapperCol={signUpForm.formWrapper as ColProps}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FormFields>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please, fill your email!" }]}
              labelCol={signUpForm.inputLabel as ColProps}
              wrapperCol={signUpForm.inputWrapper as ColProps}
              style={signUpForm.input}
            >
              <Input />
            </Form.Item>
            <Form.Item<FormFields>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please, fill your password!" },
              ]}
              labelCol={signUpForm.inputLabel as ColProps}
              wrapperCol={signUpForm.inputWrapper as ColProps}
              style={signUpForm.input}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<FormFields>
              label="Repeat password"
              name="repeatPassword"
              rules={[
                { required: true, message: "Please, fill repeat password!" },
              ]}
              labelCol={signUpForm.inputLabel as ColProps}
              wrapperCol={signUpForm.inputWrapper as ColProps}
              style={signUpForm.input}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<FormFields>
              label="Full name"
              name="fullName"
              rules={[
                { required: true, message: "Please, fill your full name!" },
              ]}
              labelCol={signUpForm.inputLabel as ColProps}
              wrapperCol={signUpForm.inputWrapper as ColProps}
              style={signUpForm.input}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={signUpForm.signUpBtnWrapper as ColProps}
              style={signUpForm.signUpBtn}
            >
              <Button
                form="signUpForm"
                key="submit"
                htmlType="submit"
                onClick={submitHandler}
              >
                Sign Up
              </Button>
            </Form.Item>
            <Form.Item
              wrapperCol={signUpForm.signInBtnWrapper as ColProps}
              style={signUpForm.signInBtn}
            >
              <Button onClick={toggleAuthType}>Login to account</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUpForm;
