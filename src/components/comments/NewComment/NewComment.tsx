"use client";

import { FormEvent } from "react";
import useSnackBar from "@components/snackbar/Snackbar";
import { validateEmail } from "@consts/regexs";
import { COMMENT_FAILED_CREATE } from "@consts/messages";
import { INewComment } from "@models/comments";
import { Row, Col, Card, Form } from "antd";
import { useSession } from "next-auth/react";
import TextArea from "antd/es/input/TextArea";
import { styles } from ".";
import Button from "@components/ui/Button/Button";
import Title from "@components/ui/Title/Title";

type FormFields = {
  text: string;
};

const NewComment = (props: INewComment) => {
  const { onAddComment, eventId } = props;

  const [form] = Form.useForm<FormFields>();
  const { data, status } = useSession();

  const { showSnackbar } = useSnackBar();

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const values = await form.validateFields();
    const { text } = values;
    const email = data?.user?.email;
    const creator = data?.user?.name;

    if (!email?.match(validateEmail)) {
      form.setFields([
        {
          name: "email",
          errors: ["Invalid email"],
        },
      ]);
      return;
    }

    if (!creator) {
      return;
    }

    try {
      await onAddComment({
        email,
        creator,
        text,
        eventId,
      });

      form.setFields([
        {
          name: "email",
          value: "",
        },
        {
          name: "creator",
          value: "",
        },
        {
          name: "text",
          value: "",
        },
      ]);
    } catch {
      showSnackbar({ message: COMMENT_FAILED_CREATE, variant: "error" });
    }
  };

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <Row justify="center" align="middle" style={styles.container}>
      <Col span={24}>
        <Card>
          <Title level={2}>Leave a comment</Title>
          <Form
            id="commentForm"
            form={form}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FormFields>
              label="Comment text"
              name="text"
              rules={[{ required: true, message: "Please, fill comment text" }]}
            >
              <TextArea rows={4} style={styles.commentTextarea} />
            </Form.Item>
            <Form.Item style={styles.sendBtn}>
              <Button
                form="commentForm"
                key="submit"
                htmlType="submit"
                onClick={submitHandler}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default NewComment;
