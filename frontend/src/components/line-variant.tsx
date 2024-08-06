import { Frown } from "lucide-react";
import { CustomTooltip } from "./custom-tooltip";

import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface LineVariantProps {
  title: string;
  isKwh?: boolean;
  xDataKey: string;
  data: {
    [key: string]: string | number;
  }[];
  dataKeys: {
    [key: string]: string;
  };
  colors: string[];
}

export const LineVariant = ({
  data,
  title,
  colors,
  xDataKey,
  dataKeys,
  isKwh = false,
}: LineVariantProps) => {
  return (
    <div className="w-[48.5%] space-y-1">
      <h1 className="text-xl font-semibold text-gray-200 text-center">
        {title}
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        {data.length > 0 ? (
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              fill="rgba(255, 255, 255, 0.25)"
            />
            <YAxis stroke="rgba(255, 255, 255, 0.7)" />
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
