"use client";

import { useEffect, useState } from "react";
import { ISnackbar } from "@models/snackbar";
import { useSnackbar, SnackbarKey } from "notistack";
import Button from "@components/ui/Button/Button";
import { CloseOutlined } from "@ant-design/icons";
import { styles } from ".";

const useSnackBar = () => {
  const defaultVariant = "success";
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    message: "",
    variant: defaultVariant,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key: SnackbarKey) => {
    const closeBar = () => {
      closeSnackbar(key);
    };
    return (
      <Button
        style={styles.closeBtn}
        shape="round"
        icon={<CloseOutlined style={styles.closeIcon} />}
        onClick={closeBar}
        ghost
      />
    );
  };

  const handleShowSnackbar = (state: ISnackbar) => {
    setSnackbar({ ...state, variant: state?.variant || defaultVariant });
  };

  useEffect(() => {
    const { message, variant } = snackbar;
    if (message) {
      enqueueSnackbar(message, {
        variant,
        autoHideDuration: 3000,
        action,
      });
    }
  }, [snackbar]);

  return { showSnackbar: handleShowSnackbar };
};

export default useSnackBar;
