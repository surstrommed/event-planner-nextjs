"use client";

import { Dropdown, Button, Space } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { IManageEventButton } from "@models/events";
import { manageEventItems } from "@consts/menuItems";
import { styles } from ".";
import useSnackBar from "@components/snackbar/Snackbar";
import { useSession } from "next-auth/react";

const ManageEventButton = ({ eventId }: IManageEventButton) => {
  const router = useRouter();
  const { showSnackbar } = useSnackBar();
  const { data } = useSession();
  const email = data?.user?.email || "";

  if (!data?.user) {
    return null;
  }

  return (
    <Dropdown
      menu={{ items: manageEventItems(eventId, email, router, showSnackbar) }}
      trigger={["click"]}
      placement="bottom"
      arrow
    >
      <Button style={styles.button}>
        <Space>
          <CaretDownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default ManageEventButton;
