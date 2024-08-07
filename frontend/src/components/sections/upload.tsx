import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  FileInput,
  FileUploader,
  FileUploaderItem,
  FileUploaderContent,
} from "@/components/file-input";

export const UploadSection = () => {
  const [files, setFiles] = useState<File[] | null>(null);

  const handleUploadFile = () => {
    console.log(files?.at(0));
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
              className="py-4 px-2 bg-sky-400 text-gray-800"
            >
              {file.name}
            </FileUploaderItem>
          ))}
        </FileUploaderContent>
      </FileUploader>

      {!!files?.length && (
        <Button className="w-full" onClick={handleUploadFile}>
          Upload
        </Button>
      )}
    </div>
  );
};
