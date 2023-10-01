"use client";

import UploadButton from "@components/ui/UploadButton/UploadButton";
import { styles } from ".";
import { useState } from "react";
import useSnackBar from "@components/snackbar/Snackbar";
import { UploadFileResponse } from "uploadthing/client";
import { ChangeAvatarFormVariant, IChangeAvatarForm } from "@models/profile";
import Button from "@components/ui/Button/Button";
import { FAILED_AVATAR_DELETE, FAILED_AVATAR_UPLOAD } from "@consts/messages";
import Image from "next/image";
import { myImageLoader } from "@/utils";
import { useSession } from "next-auth/react";
import { IMAGE_NOT_FOUND_ROUTE } from "@consts/common";
import { Popconfirm } from "antd";

const ChangeAvatarForm = ({ handleChangeAvatar }: IChangeAvatarForm) => {
  const { showSnackbar } = useSnackBar();

  const { data, update } = useSession();

  const email = data?.user?.email || "";
  const currentAvatar = data?.user?.image || IMAGE_NOT_FOUND_ROUTE;

  const [formVariant, setFormVariant] =
    useState<ChangeAvatarFormVariant>("display");
  const [uploadedFiles, setUploadedFiles] = useState<UploadFileResponse[]>([]);

  const handleFormVariantToggle = () => {
    if (formVariant === "display") {
      setFormVariant("change");
    } else {
      setFormVariant("display");
    }
  };

  const handleAvatarReset = () => {
    setUploadedFiles([]);
  };

  const handleSaveAvatar = async () => {
    if (uploadedFiles.length) {
      const avatarUrl = uploadedFiles[0].url;
      try {
        await handleChangeAvatar(email, avatarUrl);
        update({ image: avatarUrl });
        handleFormVariantToggle();
      } catch {
        showSnackbar({ message: FAILED_AVATAR_UPLOAD, variant: "error" });
      }
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await handleChangeAvatar(email, null);
      update({ image: "" });
    } catch {
      showSnackbar({ message: FAILED_AVATAR_DELETE, variant: "error" });
    }
  };

  const isAvatarChangeButtonDisabled = !uploadedFiles.length;
  const isAvatarDeleteButtonDisabled = currentAvatar === IMAGE_NOT_FOUND_ROUTE;

  return (
    <div>
      {formVariant === "display" ? (
        <div style={styles.imageDisplayContainer}>
          <Image
            src={currentAvatar}
            alt="User avatar"
            width={250}
            height={250}
            loading="lazy"
            loader={myImageLoader}
            style={styles.avatar}
          />
          <div style={styles.buttonsWrapper}>
            <Popconfirm
              title="Delete the avatar"
              description="Are you sure you want to delete your avatar?"
              onConfirm={handleDeleteAvatar}
              placement="bottom"
            >
              <Button
                style={styles.avatarButton}
                danger
                disabled={isAvatarDeleteButtonDisabled}
              >
                Remove
              </Button>
            </Popconfirm>
            <Button
              style={styles.avatarButton}
              onClick={handleFormVariantToggle}
            >
              Upload new
            </Button>
          </div>
        </div>
      ) : (
        <div style={styles.imageUploadContainer}>
          <UploadButton
            files={uploadedFiles}
            endpoint="strictImageAttachment"
            onClientUploadComplete={(res) => {
              if (res) {
                setUploadedFiles(res);
              }
            }}
            onUploadError={(error) => {
              showSnackbar({ message: error.message, variant: "error" });
            }}
          />
          <div style={styles.buttonsWrapper}>
            <Button onClick={handleFormVariantToggle}>Cancel</Button>
            <Button
              onClick={handleAvatarReset}
              disabled={isAvatarChangeButtonDisabled}
            >
              Reset
            </Button>
            <Button
              onClick={handleSaveAvatar}
              disabled={isAvatarChangeButtonDisabled}
            >
              Save avatar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeAvatarForm;
