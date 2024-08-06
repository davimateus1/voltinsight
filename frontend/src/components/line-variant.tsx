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
  xDataKey?: string;
  yDataKey?: string;
  data: { name: string; uv: number; pv: number; amt: number }[];
}

export const LineVariant = ({
  title,
  data,
  xDataKey,
  yDataKey,
}: LineVariantProps) => {
  return (
    <div className="w-[48.5%]">
      <h1 className="text-xl font-semibold text-gray-200 text-center">
        {title}
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            fill="rgba(255, 255, 255, 0.25)"
          />
          <YAxis dataKey={yDataKey} stroke="rgba(255, 255, 255, 0.7)" />
          <XAxis dataKey={xDataKey} stroke="rgba(255, 255, 255, 0.7)" />
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
  );
};
