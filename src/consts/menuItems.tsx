import { PushType } from "@models/index";
import { MenuProps, Space } from "antd";
import { signOut } from "next-auth/react";
import { ROUTES } from "./api";
import {
  MY_EVENTS_TITLE,
  SAVED_EVENTS_TITLE,
  ALL_EVENTS_TITLE,
} from "./common";
import { ItemType } from "antd/es/menu/hooks/useItems";
import {
  EditOutlined,
  ProfileOutlined,
  DeleteOutlined,
  FileDoneOutlined,
  SaveOutlined,
  FileAddOutlined,
  LogoutOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { ISnackbar } from "@models/snackbar";
import { deleteEvent } from "@/requests";
import { FAILED_EVENT_DELETE, SUCCESS_EVENT_DELETE } from "./messages";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const desktopHeaderItems = (push: PushType) =>
  [
    {
      label: (
        <span>
          <ProfileOutlined /> Profile
        </span>
      ),
      key: "1",
      onClick: () => {
        push(ROUTES.profile);
      },
    },
    {
      label: (
        <span>
          <FileDoneOutlined /> {MY_EVENTS_TITLE}
        </span>
      ),
      key: "2",
      onClick: () => {
        push(ROUTES.myEvents);
      },
    },
    {
      label: (
        <span>
          <SaveOutlined /> {SAVED_EVENTS_TITLE}
        </span>
      ),
      key: "3",
      onClick: () => {
        push(ROUTES.savedEvents);
      },
    },
    {
      label: (
        <span>
          <FileAddOutlined /> Create event
        </span>
      ),
      key: "4",
      onClick: () => {
        push(ROUTES.eventCreate);
      },
    },
    {
      label: (
        <span>
          <LogoutOutlined /> Logout
        </span>
      ),
      key: "5",
      onClick: async () => {
        await signOut();
      },
    },
  ] as ItemType[];

export const mobileHeaderItems = (push: PushType) =>
  [
    {
      label: (
        <span>
          <ProfileOutlined /> Profile
        </span>
      ),
      key: "1",
      onClick: () => {
        push(ROUTES.profile);
      },
    },
    {
      label: (
        <span>
          <FileSearchOutlined /> {ALL_EVENTS_TITLE}
        </span>
      ),
      key: "2",
      onClick: () => {
        push(ROUTES.events);
      },
    },
    {
      label: (
        <span>
          <FileDoneOutlined /> {MY_EVENTS_TITLE}
        </span>
      ),
      key: "3",
      onClick: () => {
        push(ROUTES.myEvents);
      },
    },
    {
      label: (
        <span>
          <SaveOutlined /> {SAVED_EVENTS_TITLE}
        </span>
      ),
      key: "4",
      onClick: () => {
        push(ROUTES.savedEvents);
      },
    },
    {
      label: (
        <span>
          <FileAddOutlined /> Create event
        </span>
      ),
      key: "5",
      onClick: () => {
        push(ROUTES.eventCreate);
      },
    },
    {
      label: (
        <span>
          <LogoutOutlined /> Logout
        </span>
      ),
      key: "6",
      onClick: async () => {
        await signOut();
      },
    },
  ] as ItemType[];

export const manageEventItems: (
  eventId: string,
  email: string,
  router: AppRouterInstance,
  showSnackbar: (state: ISnackbar) => void
) => MenuProps["items"] = (eventId, email, router, showSnackbar) => [
  {
    label: (
      <Space>
        <EditOutlined /> Edit
      </Space>
    ),
    key: "0",
    onClick: () => {
      router.push(`${ROUTES.eventEdit}/${eventId}`);
    },
  },
  {
    label: (
      <Space>
        <DeleteOutlined /> Delete
      </Space>
    ),
    key: "1",
    onClick: async () => {
      try {
        const { deleted } = await deleteEvent(eventId, email);

        showSnackbar({
          message: SUCCESS_EVENT_DELETE,
        });

        if (deleted) {
          router.refresh();
        }
      } catch {
        showSnackbar({ message: FAILED_EVENT_DELETE, variant: "error" });
      }
    },
  },
];
