import { useState } from "react";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import { Menu, MenuProps, Space } from "antd";
import { styles } from ".";
import {
  FileImageOutlined,
  FileProtectOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import ChangeAvatarForm from "../ChangeAvatarForm/ChangeAvatarForm";
import { useSession } from "next-auth/react";
import { ProfileSetting } from "@models/profile";
import ChangeThemeForm from "../ChangeThemeForm/ChangeThemeForm";
import { useAppDispatch } from "hooks/redux";
import { setTheme } from "store/actions/theme";
import { IThemeType } from "@models/index";
import { changeAvatar, changePassword } from "@/requests";
import Title from "@components/ui/Title/Title";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { data } = useSession();

  const [currentMenuItem, setCurrentMenuItem] =
    useState<ProfileSetting>("avatar");

  const handleChangeAvatar = async (
    email: string,
    avatarUrl: string | null
  ) => {
    await changeAvatar(email, avatarUrl);
  };

  const handleChangePassword = async (
    email: string,
    oldPassword: string,
    newPassword: string
  ) => {
    await changePassword(email, oldPassword, newPassword);
  };

  const handleChangeTheme = (theme: IThemeType) => {
    dispatch(setTheme(theme));
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrentMenuItem(e.key as ProfileSetting);
  };

  const profileItems: MenuProps["items"] = [
    {
      label: "Avatar",
      key: "avatar",
      icon: <FileImageOutlined />,
    },
    {
      label: "Change password",
      key: "password",
      icon: <FileProtectOutlined />,
    },
    {
      label: "Change theme",
      key: "theme",
      icon: <BgColorsOutlined />,
    },
  ];

  return (
    <Space style={styles.mainContainer}>
      {data?.user?.name && <Title level={2}>Welcome, {data.user.name}</Title>}
      <div style={styles.profileContainer}>
        <div>
          <Menu
            onClick={onClick}
            selectedKeys={[currentMenuItem]}
            mode="vertical"
            items={profileItems}
            style={styles.operationsMenu}
          />
        </div>
        <div style={{ minWidth: 300 }}>
          {currentMenuItem === "avatar" && (
            <ChangeAvatarForm handleChangeAvatar={handleChangeAvatar} />
          )}
          {currentMenuItem === "password" && (
            <ChangePasswordForm handleChangePassword={handleChangePassword} />
          )}
          {currentMenuItem === "theme" && (
            <ChangeThemeForm handleChangeTheme={handleChangeTheme} />
          )}
        </div>
      </div>
    </Space>
  );
};

export default UserProfile;
