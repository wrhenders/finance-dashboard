import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import { Card, CardContent, Typography, ButtonBase } from "@mui/material";
import { Link } from "react-router-dom";

interface CandlestickGraphProps {
  stock: string;
  crypto: boolean;
  width: number;
  height: number;
}
interface StockData {
  timestamp: number[];
  close: number[];
  high: number[];
  low: number[];
  open: number[];
  initial: number;
}
const initialState: StockData = {
  timestamp: [],
  close: [],
  high: [],
  low: [],
  open: [],
  initial: 0,
};

const CandlestickGraph: React.FC<CandlestickGraphProps> = ({
  stock,
  crypto,
  width,
  height,
}) => {
  const [currentChartData, setCurrentChartData] =
    useState<StockData>(initialState);
  useEffect(() => {
    fetch(`/api/candle/${crypto ? "crypto/" : ""}${stock}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Stock not found");
        }
        return response;
      })
      .then((response) => response.json())
      .then((response) => setCurrentChartData(response))
      .catch((err) => {
        //console.log(err);
      });
  }, [crypto, stock]);

  if (currentChartData.timestamp.length >= 1) {
    const timeArray = currentChartData.timestamp.map((num) =>
      new Date(num * 1000).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    const date = new Date(
      currentChartData.timestamp[0] * 1000
    ).toLocaleDateString();
    const valueDiff =
      currentChartData.close[currentChartData.close.length - 1] -
      currentChartData.initial;
    const currentGain = (valueDiff / currentChartData.initial) * 100;
    return (
      <Card
        variant="outlined"
        sx={{
          maxWidth: `${width}px`,
          maxHeight: `${width * 0.84}px`,
          p: 2,
          mt: 2,
          ml: 2,
          pb: 0,
          pt: 0,
        }}
      >
        <CardContent>
          <div style={{ display: "flex" }}>
            <ButtonBase
              component={Link}
              to={crypto ? `/ticker/${stock}/crypto` : `/ticker/${stock}`}
            >
              <Typography variant="h6" component="div">
                {stock} {date}
              </Typography>
            </ButtonBase>
            <Typography
              variant="h6"
              component="div"
              color={currentGain > 0 ? "green" : "red"}
              sx={{ marginLeft: "auto" }}
            >
              {valueDiff.toFixed(2)} {currentGain.toFixed(2)}%
            </Typography>
          </div>
          <Plot
            data={[
              {
                type: "candlestick",
                x: timeArray,
                close: currentChartData.close,
                high: currentChartData.high,
                open: currentChartData.open,
                low: currentChartData.low,
              },
              {
                mode: "lines",
                x: timeArray,
                y: Array(currentChartData.timestamp.length).fill(
                  currentChartData.initial
                ),
                name: "Open Price",
                line: {
                  dash: "dot",
                },
                hoverinfo: "skip",
              },
            ]}
            layout={{
              showlegend: false,
              width: width,
              height: height,
              xaxis: {
                nticks: 6,
                automargin: true,
                rangeslider: {
                  visible: false,
                },
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

export default CandlestickGraph;
