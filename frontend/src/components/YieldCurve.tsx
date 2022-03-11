import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface YieldCurveProps {
  width: number;
  height: number;
}

interface TreasuryCurve {
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
const initialState: TreasuryCurve = {
  DGS1MO: "",
  DGS3MO: "",
  DGS6MO: "",
  DGS1: "",
  DGS2: "",
  DGS5: "",
  DGS10: "",
  DGS20: "",
  DGS30: "",
  DGS1MO_old: "",
  DGS3MO_old: "",
  DGS6MO_old: "",
  DGS1_old: "",
  DGS2_old: "",
  DGS5_old: "",
  DGS10_old: "",
  DGS20_old: "",
  DGS30_old: "",
};

const YieldCurve: React.FC<YieldCurveProps> = ({ width, height }) => {
  const [currentChartData, setCurrentChartData] =
    useState<TreasuryCurve>(initialState);

  useEffect(() => {
    fetch(`https://ryans-finance-dashboard.herokuapp.com/api/FRED`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Stock not found");
        }
        return response;
      })
      .then((response) => response.json())
      .then((response) => setCurrentChartData(response))
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    return `${currentChartData[age]}`;
  };
  if (currentChartData.DGS1) {
    return (
      <Card
        variant="outlined"
        sx={{ maxWidth: `${width}px`, p: 2, mt: 2, ml: 2, pb: 0, pt: 0 }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            Treasury Yield Spread
          </Typography>
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
                name: "30 Days Prior",
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
              width,
              height,
              showlegend: true,
              legend: {
                x: 0,
                y: 1,
                xanchor: "left",
              },
              xaxis: {
                automargin: true,
              },
              yaxis: {
                automargin: true,
              },
              margin: {
                t: 1,
                l: 1,
                r: 20,
                b: 1,
              },
            }}
            config={{ displayModeBar: false, scrollZoom: true }}
          />
        </CardContent>
      </Card>
    );
  } else {
    return <></>;
  }
};

export default YieldCurve;
