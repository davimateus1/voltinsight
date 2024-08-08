import { useState } from "react";
import { FileIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUploadInvoice } from "@/services/hooks";

import {
  FileInput,
  FileUploader,
  FileUploaderItem,
  FileUploaderContent,
} from "@/components/file-input";

export const UploadSection = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const { uploadMutate, uploadPending } = useUploadInvoice({ setFiles });

  const handleUploadFile = () => {
    if (!files) return;
    uploadMutate(files[0]);
  };

  return (
    <div className="w-1/4 flex justify-center items-center flex-col space-y-4 pr-4">
      <h1 className="text-2xl font-bold text-gray-200">Upload your invoice</h1>
      <FileUploader
        value={files}
        className="space-y-1"
        onValueChange={setFiles}
        dropzoneOptions={{ accept: { "application/pdf": [".pdf"] } }}
      >
        <FileInput className="border border-dashed border-gray-200 flex justify-center items-center p-10">
          <p className="text-gray-200 font-semibold">Drop or select file</p>
        </FileInput>
        <FileUploaderContent className="h-auto space-y-1 mt-1">
          {files?.map((file, i) => (
            <FileUploaderItem
              index={i}
              key={file.name}
              className="py-6 px-2 bg-sky-400 text-gray-800"
            >
              <div className="flex items-center justify-center space-x-1">
                <FileIcon className="h-6 w-6" />
                <div className="space-y-1">
                  <p className="text-gray-900 font-bold">{file.name}</p>
                  <p className="text-gray-700 font-semibold">
                    {file.size} bytes
                  </p>
                </div>
              </div>
            </FileUploaderItem>
          ))}
        </FileUploaderContent>
      </FileUploader>

      {!!files?.length && (
        <Button
          className="w-full"
          onClick={handleUploadFile}
          disabled={uploadPending}
        >
          {uploadPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Upload
        </Button>
      )}
    </div>
  );
};
