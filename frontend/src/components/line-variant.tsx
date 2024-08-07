import { useState } from "react";
import { Invoice } from "@/types";
import { Button } from "./ui/button";

import { Frown, XIcon } from "lucide-react";
import { CustomTooltip } from "./custom-tooltip";
import { getUniqueClientNumbers } from "@/lib/utils";

import {
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

interface LineVariantProps {
  title: string;
  isKwh?: boolean;
  xDataKey: string;
  colors: string[];
  selectData: Invoice[];
  dataKeys: { [key: string]: string };
  chartData: { [key: string]: string | number }[];
}

export const LineVariant = ({
  title,
  colors,
  xDataKey,
  dataKeys,
  chartData,
  selectData,
  isKwh = false,
}: LineVariantProps) => {
  const [selectedClientNumber, setSelectedClientNumber] = useState("");

  const handleSelectChange = (value: string) => {
    setSelectedClientNumber(value);
  };

  const handleClear = () => {
    setSelectedClientNumber("");
  };

  return (
    <div className="w-[46.5%] space-y-1 flex flex-col items-end">
      <div className="flex items-center justify-center space-x-2">
        <Select value={selectedClientNumber} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Client Number" />
          </SelectTrigger>
          <SelectContent>
            {getUniqueClientNumbers(selectData).map((clientNumber) => (
              <SelectItem key={clientNumber} value={clientNumber}>
                {clientNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={!selectedClientNumber}
          className="transition-all duration-500 w-[2rem] p-1 h-[2rem] rounded-full"
        >
          <XIcon className="h-[1rem] w-[1rem] text-red-500" />
        </Button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {chartData.length ? (
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              fill="rgba(255, 255, 255, 0.25)"
            />
            <YAxis stroke="rgba(255, 255, 255, 0.7)">
              <Label
                dx={-25}
                angle={-90}
                value={title}
                style={{
                  fill: "#e5e7eb",
                  fontSize: "1.4rem",
                  textAnchor: "middle",
                  fontWeight: "semibold",
                }}
              />
            </YAxis>
            <XAxis
              tickMargin={10}
              dataKey={xDataKey}
              stroke="rgba(255, 255, 255, 0.7)"
            />
            <Tooltip
              content={<CustomTooltip dataKeys={dataKeys} isKwh={isKwh} />}
            />
            {Object.keys(dataKeys).map((key, index) => (
              <Line
                key={key}
                dot={false}
                type="monotone"
                strokeWidth={2.5}
                stroke={colors[index]}
                dataKey={dataKeys[key]}
              />
            ))}
          </LineChart>
        ) : (
          <div className="flex justify-center items-center h-full flex-col bg-white/10 rounded-lg">
            <Frown size={48} className="text-gray-200" />
            <p className="text-gray-200">No data available</p>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};
