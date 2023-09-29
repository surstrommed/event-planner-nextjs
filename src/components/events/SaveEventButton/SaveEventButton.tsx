import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import Button from "@components/ui/Button/Button";
import { SHOULD_SIGN_IN } from "@consts/messages";
import { ISaveEventButton } from "@models/ui";
import { Tooltip } from "antd";
import { useSession } from "next-auth/react";

const SaveEventButton = (props: ISaveEventButton) => {
  const { saved, ...rest } = props;

  const { data } = useSession();
  const email = data?.user?.email;

  const isDisabled = !email;

  return (
    <Tooltip title={isDisabled ? SHOULD_SIGN_IN : undefined}>
      <Button
        icon={saved ? <HeartFilled /> : <HeartOutlined />}
        {...rest}
        disabled={isDisabled}
      />
    </Tooltip>
  );
};

export default SaveEventButton;
