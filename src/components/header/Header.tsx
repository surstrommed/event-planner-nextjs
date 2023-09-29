"use client";

import {
  Col,
  Row,
  Layout,
  Dropdown,
  Form,
  Tooltip,
  Modal,
  Input,
  theme,
} from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Button from "@components/ui/Button/Button";
import { PUBLIC_ROUTES, ROUTES } from "@consts/api";
import { ALL_EVENTS_TITLE, PROJECT_NAME, SEARCH_QUERY } from "@consts/common";
import { useSession } from "next-auth/react";
import { styles as themeStyles } from ".";
import { UserOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Search from "antd/es/input/Search";
import { urlBuilder } from "@lib/utils";
import { getValidateEventSearch } from "@consts/regexs";
import { useEffect } from "react";
import { useMediaQuery } from "hooks/useMediaQuery";
import { useModal } from "hooks/useModal";
import useSnackBar from "@components/snackbar/Snackbar";
import { FILL_SEARCH } from "@consts/messages";
import { desktopHeaderItems, mobileHeaderItems } from "@consts/menuItems";

type FormFields = {
  [SEARCH_QUERY]: string;
};

const Header = () => {
  const { data, status } = useSession();
  const pathname = usePathname();
  const { push } = useRouter();
  const params = useSearchParams();
  const [desktopHeaderForm] = Form.useForm<FormFields>();
  const [mobileHeaderForm] = Form.useForm<FormFields>();
  const { matches } = useMediaQuery("(min-width: 900px)");
  const { isModalOpen, toggleModal } = useModal();
  const { showSnackbar } = useSnackBar();
  const { useToken } = theme;
  const { token: themeToken } = useToken();
  const styles = themeStyles(themeToken);

  const searchQuery = params.get(SEARCH_QUERY);

  useEffect(() => {
    if (!searchQuery && desktopHeaderForm.getFieldValue(SEARCH_QUERY)) {
      desktopHeaderForm.setFieldValue(SEARCH_QUERY, "");
    }
    if (!searchQuery && mobileHeaderForm.getFieldValue(SEARCH_QUERY)) {
      mobileHeaderForm.setFieldValue(SEARCH_QUERY, "");
    }
  }, [searchQuery]);

  const handleEvents = () => {
    push(ROUTES.events);
  };

  const handleLogin = () => {
    push(ROUTES.auth);
  };

  const onSearch = (value: string) => {
    const formattedValue = value.trim();

    const url = window.location.href;
    let resultUrl = "";

    const checkResultUrl = (resultUrl: string) => {
      if (getValidateEventSearch().test(resultUrl)) {
        push(resultUrl);
      } else {
        const urlObject = new URL(resultUrl);
        push(`${urlObject.origin}${PUBLIC_ROUTES.events}${urlObject.search}`);
      }
    };

    if (formattedValue) {
      resultUrl = urlBuilder(url, SEARCH_QUERY, "add", formattedValue);

      checkResultUrl(resultUrl);
    }
    if (!formattedValue && searchQuery) {
      resultUrl = urlBuilder(url, SEARCH_QUERY, "remove");

      checkResultUrl(resultUrl);
    }
  };

  const handleModalClear = () => {
    onSearch("");
    toggleModal();
  };

  const handleModalSearch = () => {
    const value = mobileHeaderForm.getFieldValue(SEARCH_QUERY) || "";

    if (value.trim()) {
      onSearch(value);
      toggleModal();
    } else {
      showSnackbar({ message: FILL_SEARCH, variant: "error" });
    }
  };

  return (
    <Layout.Header style={styles.header}>
      <Modal
        title="Search"
        open={isModalOpen}
        footer={null}
        onCancel={toggleModal}
      >
        <Form
          id="mobileHeaderForm"
          form={mobileHeaderForm}
          initialValues={{ [SEARCH_QUERY]: searchQuery || "" }}
          autoComplete="off"
          style={styles.mobileForm}
        >
          <Form.Item<FormFields>
            name={SEARCH_QUERY}
            style={styles.mobileFormItem}
          >
            <Input
              placeholder="Type something for search..."
              style={styles.mobileSearch}
            />
          </Form.Item>
          <Form.Item style={styles.mobileFormItem}>
            <div style={styles.mobileFormButtons}>
              <Button onClick={handleModalClear}>Clear</Button>
              <Button
                form="mobileHeaderForm"
                key="submit"
                htmlType="submit"
                onClick={handleModalSearch}
              >
                Search
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Row style={styles.rowContainer}>
        <Col span={matches ? 6 : 12} style={styles.headerItemContainer}>
          <Link href={ROUTES.main} style={styles.logo}>
            {PROJECT_NAME}
          </Link>
        </Col>
        {matches ? (
          <Col span={18} style={styles.desktopListContainer}>
            <Form
              id="desktopHeaderForm"
              form={desktopHeaderForm}
              initialValues={{ [SEARCH_QUERY]: searchQuery || "" }}
              autoComplete="off"
              style={styles.desktopForm}
            >
              <Form.Item<FormFields>
                name={SEARCH_QUERY}
                style={styles.searchContainer}
              >
                <Search
                  placeholder="Search..."
                  allowClear
                  onSearch={onSearch}
                  style={styles.desktopSearch}
                />
              </Form.Item>
              {status === "authenticated" && data.user && (
                <>
                  <Button onClick={handleEvents} ghost>
                    {ALL_EVENTS_TITLE}
                  </Button>
                  <Dropdown.Button
                    trigger={["click"]}
                    type="primary"
                    menu={{ items: desktopHeaderItems(push) }}
                    placement="bottom"
                    icon={<UserOutlined />}
                    arrow
                  >
                    {data.user.name}
                  </Dropdown.Button>
                </>
              )}
              {status === "unauthenticated" && pathname !== ROUTES.auth && (
                <>
                  <Button onClick={handleLogin}>Login</Button>
                </>
              )}
            </Form>
          </Col>
        ) : (
          <Col span={12} style={styles.mobileListContainer}>
            {status === "authenticated" && data.user && (
              <div style={styles.headerItemContainer}>
                <Tooltip title="Open search modal">
                  <Button
                    shape="circle"
                    icon={<SearchOutlined />}
                    onClick={toggleModal}
                    style={styles.searchBtn}
                  />
                </Tooltip>
                <Dropdown.Button
                  type="primary"
                  menu={{ items: mobileHeaderItems(push) }}
                  placement="bottom"
                  trigger={["click"]}
                  icon={<DownOutlined />}
                  arrow
                >
                  {(data.user.name || "").split(" ")[0]}
                </Dropdown.Button>
              </div>
            )}
            {status === "unauthenticated" && pathname !== ROUTES.auth && (
              <>
                <Button onClick={handleLogin}>Login</Button>
              </>
            )}
          </Col>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Header;
