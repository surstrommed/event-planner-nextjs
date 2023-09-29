"use client";

import { FormEvent } from "react";
import useSnackBar from "@components/snackbar/Snackbar";
import Button from "@components/ui/Button/Button";
import { SUCCESS_THEME_CHANGE, FAILED_THEME_CHANGE } from "@consts/messages";
import { IChangeThemeForm } from "@models/profile";
import { Form, Select } from "antd";
import { useAppSelector } from "hooks/redux";
import { getTheme } from "store/selectors/theme";
import { THEME_VARIANTS } from "@consts/common";
import { IThemeType } from "@models/index";
import { styles } from ".";

type FormFields = {
  theme: IThemeType;
};

const ChangeThemeForm = ({ handleChangeTheme }: IChangeThemeForm) => {
  const [form] = Form.useForm<FormFields>();

  const { showSnackbar } = useSnackBar();
  const themeVariant = useAppSelector(getTheme);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const values = await form.validateFields();
      const { theme } = values;

      if (theme) {
        handleChangeTheme(theme);

        showSnackbar({ message: SUCCESS_THEME_CHANGE });
      }
    } catch (error) {
      showSnackbar({ message: FAILED_THEME_CHANGE, variant: "error" });
    }
  };

  return (
    <Form
      id="themeForm"
      form={form}
      initialValues={{ theme: themeVariant }}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FormFields>
        name="theme"
        label="Switch theme"
        rules={[{ required: true, message: "Please, choose a theme!" }]}
      >
        <Select placeholder="Choose theme variant" allowClear>
          {THEME_VARIANTS.map((theme) => (
            <Select.Option value={theme.value} key={theme.value}>
              {theme.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item<FormFields> shouldUpdate>
        {({ getFieldsValue }) => {
          const { theme } = getFieldsValue();
          const isDisabled = !theme || themeVariant === theme;
          return (
            <Button
              form="themeForm"
              htmlType="submit"
              disabled={isDisabled}
              onClick={submitHandler}
              style={styles.submitBtn}
            >
              Set theme
            </Button>
          );
        }}
      </Form.Item>
    </Form>
  );
};

export default ChangeThemeForm;
