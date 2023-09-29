import { OurFileRouter } from "@/api/uploadthing/core";
import { ButtonProps } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import { UploadFileResponse } from "uploadthing/client";

export type IButton = ButtonProps;

export type IUploadButton = {
  files: UploadFileResponse[];
  endpoint: keyof OurFileRouter;
  onClientUploadComplete: (res?: UploadFileResponse[] | undefined) => void;
  onUploadError: (error: Error) => void;
};

export type ISaveEventButton = IButton & {
  saved: boolean;
};

export type ITitle = TitleProps;
