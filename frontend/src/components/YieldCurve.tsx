import Plot from "react-plotly.js";

interface YieldCurveProps {
  chartData: Object;
}
interface TreasuryCurve {
  DGS1MO: string;
  DGS3MO: string;
  DGS6MO: string;
  DGS1: string;
  DGS5: string;
  DGS1O: string;
  DGS2O: string;
  DGS3O: string;
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

  const getYValue = (age: string, old?: boolean) => {
    if (!old) {
      return `${chartData[age as keyof Object]}`;
    } else {
      return `${chartData[(age + "_old") as keyof Object]}`;
    }
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
            getYValue("DGS1MO", true),
            getYValue("DGS3MO", true),
            getYValue("DGS6MO", true),
            getYValue("DGS1", true),
            getYValue("DGS2", true),
            getYValue("DGS5", true),
            getYValue("DGS10", true),
            getYValue("DGS20", true),
            getYValue("DGS30", true),
          ],
        },
      ]}
      layout={{
        width: 500,
        height: 300,
        title: "Treasury Yield Spread",
        showlegend: true,
      }}
    />
  );
};

export default YieldCurve;
