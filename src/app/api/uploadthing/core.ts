import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {}
  ),
  strictImageAttachment: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete((data) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
