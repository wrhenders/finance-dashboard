import Plot from "react-plotly.js";
import { useState, useEffect } from "react";

interface CandlestickGraphProps {
  stock: string;
}
interface StockData {
  t: number[];
  c: number[];
  h: number[];
  l: number[];
  o: number[];
}
const initialState: StockData = {
  t: [],
  c: [],
  h: [],
  l: [],
  o: [],
};

const CandlestickGraph: React.FC<CandlestickGraphProps> = ({ stock }) => {
  const [currentChartData, setCurrentChartData] =
    useState<StockData>(initialState);
  useEffect(() => {
    const getStockData = async () => {
      const data = await fetch(`/api/FH/${stock}`).then((response) =>
        response.json()
      );
      setCurrentChartData({ ...data });
    };
    getStockData();
  }, []);

  const dateArray = currentChartData.t.map((num) =>
    new Date(num * 1000).toLocaleString("en-us", {
      timeZone: "America/Chicago",
    })
  );
  const timeArray = currentChartData.t.map((num) =>
    new Date(num * 1000).toLocaleTimeString("en-us", {
      timeZone: "America/Chicago",
    })
  );

  return (
    <>
      {currentChartData.t.length > 0 && (
        <Plot
          data={[
            {
              type: "candlestick",
              x: timeArray,
              close: currentChartData.c,
              high: currentChartData.h,
              open: currentChartData.o,
              low: currentChartData.l,
            },
          ]}
          layout={{
            width: 800,
            height: 600,
            title: `${stock} Candlestick`,
            xaxis: {
              range: [dateArray[0], dateArray[dateArray.length - 1]],
              nticks: 8,
              automargin: true,
              rangeslider: {
                visible: false,
              },
            },
          }}
          config={{ displayModeBar: false, scrollZoom: true }}
        />
      )}
    </>
  );
};

export default CandlestickGraph;
