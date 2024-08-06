import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";

import {
  FileInput,
  FileUploader,
  FileUploaderItem,
  FileUploaderContent,
} from "@/components/file-input";

import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const App = () => {
  const [files, setFiles] = useState<File[] | null>(null);

  const handleUploadFile = () => {
    console.log(files?.at(0));
  };

  return (
    <div className="w-full h-svh flex bg-sky-950 p-6 justify-center">
      <div className="w-full h-full flex max-w-screen-2xl">
        <div className="w-1/4 flex justify-center items-center flex-col space-y-4 pr-4">
          <h1 className="text-2xl font-bold text-gray-200">
            Upload your invoice
          </h1>
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

        <div className="w-3/4 bg-sky-100/5 rounded-lg p-4 h-full overflow-y-auto">
          <div className="flex justify-around items-center w-full">
            <div className="w-[48.5%] flex flex-col">
              <h1 className="text-xl font-semibold text-gray-200 text-center">
                Electric Data (KWh)
              </h1>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart width={500} height={300} data={data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    fill="rgba(255, 255, 255, 0.25)"
                  />
                  <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                  <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" />
                  <Tooltip />
                  <Line
                    dot={false}
                    dataKey="pv"
                    type="monotone"
                    strokeWidth={2.5}
                    stroke="#0ea5e9"
                  />
                  <Line
                    dot={false}
                    dataKey="uv"
                    type="monotone"
                    stroke="#67e8f9"
                    strokeWidth={2.5}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="w-[48.5%]">
              <h1 className="text-xl font-semibold text-gray-200 text-center">
                Monetary Data (R$)
              </h1>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart width={500} height={300} data={data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    fill="rgba(255, 255, 255, 0.25)"
                  />
                  <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                  <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" />
                  <Tooltip />
                  <Line
                    dot={false}
                    dataKey="pv"
                    type="monotone"
                    strokeWidth={2.5}
                    stroke="#0ea5e9"
                  />
                  <Line
                    dot={false}
                    dataKey="uv"
                    type="monotone"
                    stroke="#67e8f9"
                    strokeWidth={2.5}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="w-full h-px bg-gray-200 my-4" />
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default App;
