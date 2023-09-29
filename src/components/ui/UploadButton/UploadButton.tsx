import { OurFileRouter } from "@/api/uploadthing/core";
import { UploadButton as UploadthingBtn } from "@uploadthing/react";
import { styles } from ".";
import { IUploadButton } from "@models/ui";
import Image from "next/image";
import { myImageLoader } from "@/utils";

const UploadButton = ({
  files: uploadedFiles,
  endpoint,
  onClientUploadComplete,
  onUploadError,
}: IUploadButton) => {
  return (
    <>
      <UploadthingBtn<OurFileRouter>
        endpoint={endpoint}
        onClientUploadComplete={onClientUploadComplete}
        onUploadError={onUploadError}
        appearance={{ button: styles.button.main }}
      />
      <div style={styles.containers.filesListContainer}>
        <div>
          {!!uploadedFiles.length && (
            <ul style={styles.containers.filesList}>
              {uploadedFiles.map((file) => (
                <li key={file.key}>
                  <Image
                    src={file.url}
                    alt={file.name}
                    loader={myImageLoader}
                    loading="lazy"
                    width={400}
                    height={200}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadButton;
