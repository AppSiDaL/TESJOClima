import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { useInView } from "react-intersection-observer";

interface GaugeChartProps {
  name: string;
  valueName: string;
  value: number;
  color: string;
  max: number;
  min: number;
}

const Page: React.FC<GaugeChartProps> = ({ name, value, valueName, color,max,min }) => {
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true, // Cambiado a false para permitir animaciones múltiples.
    threshold: 0.01,
  });
  const option = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    series: [
      {
        name: name,
        type: "gauge",
        min,
        max,
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
        },
        animationDelay: 500,
        data: [
          {
            itemStyle: {
              color,
            },
            value: value,
            name: valueName,
          },
        ],
      },
    ],
  };

  useEffect(() => {
    if (inView) {
      setIsGraphVisible(true);
    } else {
      setIsGraphVisible(false);
    }
  }, [inView]);

  return (
    <div ref={ref} style={{ height: 300 }}>
      {isGraphVisible && (
        <ReactECharts option={option} style={{ height: 300 }} />
      )}
    </div>
  );
};

export default Page;
