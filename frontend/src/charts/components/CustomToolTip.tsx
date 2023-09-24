import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{label}</p>
        <div>
          {payload.map((pld,) => (
            <div key={pld.dataKey} style={{ display: "inline-block", padding: 10 }}>
              <div style={{ color: pld.color }}>{pld.value}</div>
              <div style={{ color: "black" }}>{pld.dataKey}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
