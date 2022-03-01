import Plot from "react-plotly.js";
import { useState, useEffect } from "react";

interface CandlestickGraphProps {
  stock: string;
  crypto: boolean;
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
}) => {
  const [currentChartData, setCurrentChartData] =
    useState<StockData>(initialState);
  useEffect(() => {
    const getStockData = async () => {
      const data = await fetch(
        `/api/FH/${crypto ? "crypto/" : ""}${stock}`
      ).then((response) => response.json());
      setCurrentChartData(data);
    };
    getStockData();
  }, [stock, crypto]);

  if (currentChartData.timestamp) {
    const timeArray = currentChartData.timestamp.map((num) =>
      new Date(num * 1000).toLocaleTimeString("en-us")
    );
    const date = new Date(
      currentChartData.timestamp[0] * 1000
    ).toLocaleDateString();
    const valueDiff =
      currentChartData.close[currentChartData.close.length - 1] -
      currentChartData.initial;
    const currentGain = (valueDiff / currentChartData.initial) * 100;
    return (
      <div>
        <Plot
          data={[
            {
              type: "candlestick",
              x: timeArray,
              close: currentChartData.close,
              high: currentChartData.high,
              open: currentChartData.open,
              low: currentChartData.low,
              showlegend: false,
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
            },
          ]}
          layout={{
            width: 800,
            height: 600,
            title: `${stock} Candlestick ${date}`,
            xaxis: {
              nticks: 8,
              automargin: true,
              rangeslider: {
                visible: false,
              },
            },
          }}
          config={{ displayModeBar: false, scrollZoom: true }}
        />
        {currentGain > 0 ? (
          <div style={{ color: "green" }}>
            {valueDiff.toFixed(2)} {currentGain.toFixed(2)}%
          </div>
        ) : (
          <div style={{ color: "red" }}>
            {valueDiff.toFixed(2)} {currentGain.toFixed(2)}%
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default CandlestickGraph;
