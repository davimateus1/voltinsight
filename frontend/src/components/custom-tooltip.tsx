interface CustomTooltipProps {
  isKwh?: boolean;
  active?: boolean;
  payload?: {
    value: string | number;
    name: string;
    color: string;
  }[];
  label?: string;
  dataKeys: {
    [key: string]: string;
  };
}

export const CustomTooltip = ({
  isKwh,
  label,
  active,
  payload,
  dataKeys,
}: CustomTooltipProps) => {
  if (active && payload) {
    return (
      <div className="bg-gray-900 bg-opacity-90 text-white p-4 rounded-lg">
        <p className="text-lg font-semibold">{label}</p>
        <div className="flex flex-col">
          {payload.map((item) => (
            <p
              key={item.name}
              className="text-md"
              style={{ color: item.color }}
            >
              {Object.keys(dataKeys).find((key) => dataKeys[key] === item.name)}
              :{" "}
              <b className="text-lg">
                {isKwh
                  ? `${item.value} kWh`
                  : item.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
              </b>
            </p>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
