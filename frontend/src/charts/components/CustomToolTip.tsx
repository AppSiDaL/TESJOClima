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
      <div
        className="custom-tooltip"
        style={{
          color: "white",
          border: 2,
          borderColor: "white",
          borderStyle: "dashed",
        }}
      >
        <p className="label">{label}:00</p>
        <div>
          {payload.map((pld) => (
            <div
              key={pld.dataKey}
              style={{ display: "inline-block", padding: 10 }}
            >
              <div style={{ color: pld.color, margin: 0, padding: 0 }}>
                {pld.value}º
              </div>
              <div style={{ color: "white" }}>{pld.dataKey}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
