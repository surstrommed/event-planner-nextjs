import { ColProps } from "antd";
import { CSSProperties } from "react";

export const styles: {
  [component: string]: {
    [style: string]: CSSProperties | ColProps | undefined;
  };
} = {
  signInForm: {
    container: { minHeight: "50vh" },
    card: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      flexWrap: "wrap",
      width: "100%",
      minWidth: 300,
    },
    title: { textAlign: "center", marginBottom: "2rem" },
    formLabel: { span: 8 },
    formWrapper: { span: 16 },
    inputLabel: { span: 24 },
    inputWrapper: { span: 24 },
    input: { flex: "1 0 100%" },
    signInBtnWrapper: { offset: 8, span: 16 },
    signInBtn: { flex: "1 0 100%" },
    signUpBtnWrapper: { offset: 4, span: 24 },
    signUpBtn: { flex: "1 0 100%" },
  },
  signUpForm: {
    container: { minHeight: "50vh" },
    card: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      flexWrap: "wrap",
      width: "100%",
      minWidth: 400,
    },
    title: { textAlign: "center", marginBottom: "2rem" },
    formLabel: { span: 8 },
    formWrapper: { span: 16 },
    inputLabel: { span: 24 },
    inputWrapper: { span: 24 },
    input: { flex: "1 0 100%" },
    signUpBtnWrapper: { offset: 8, span: 16 },
    signUpBtn: { flex: "1 0 100%" },
    signInBtnWrapper: { offset: 5, span: 24 },
    signInBtn: { flex: "1 0 100%" },
  },
};
