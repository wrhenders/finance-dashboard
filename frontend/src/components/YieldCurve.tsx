import Plot from "react-plotly.js";

interface YieldCurveProps {
  chartData: TreasuryCurve;
}
export interface TreasuryCurve {
  DGS1MO: string;
  DGS3MO: string;
  DGS6MO: string;
  DGS1: string;
  DGS2: string;
  DGS5: string;
  DGS10: string;
  DGS20: string;
  DGS30: string;
  DGS1MO_old: string;
  DGS3MO_old: string;
  DGS6MO_old: string;
  DGS1_old: string;
  DGS2_old: string;
  DGS5_old: string;
  DGS10_old: string;
  DGS20_old: string;
  DGS30_old: string;
}

const YieldCurve: React.FC<YieldCurveProps> = ({ chartData }) => {
  const xAxis = [
    "1 Mo",
    "3 Mo",
    "6 Mo",
    "1 Yr",
    "2 Yr",
    "5 Yr",
    "10 Yr",
    "20 Yr",
    "30 Yr",
  ];

  const getYValue = (age: keyof TreasuryCurve) => {
    return `${chartData[age]}`;
  };

  return (
    <Plot
      data={[
        {
          name: "Current",
          mode: "lines+markers",
          x: xAxis,
          y: [
            getYValue("DGS1MO"),
            getYValue("DGS3MO"),
            getYValue("DGS6MO"),
            getYValue("DGS1"),
            getYValue("DGS2"),
            getYValue("DGS5"),
            getYValue("DGS10"),
            getYValue("DGS20"),
            getYValue("DGS30"),
          ],
        },
        {
          name: "30 days ago",
          mode: "lines+markers",
          x: xAxis,
          y: [
            getYValue("DGS1MO_old"),
            getYValue("DGS3MO_old"),
            getYValue("DGS6MO_old"),
            getYValue("DGS1_old"),
            getYValue("DGS2_old"),
            getYValue("DGS5_old"),
            getYValue("DGS10_old"),
            getYValue("DGS20_old"),
            getYValue("DGS30_old"),
          ],
        },
      ]}
      layout={{
        width: 500,
        height: 300,
        title: "Treasury Yield Spread",
        showlegend: true,
      }}
      config={{ displayModeBar: false, scrollZoom: true }}
    />
  );
};

export default YieldCurve;
