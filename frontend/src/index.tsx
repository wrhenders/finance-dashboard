import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import YieldCurve, { TreasuryCurve } from "./components/YieldCurve";

const App = () => {
  const [currentChartData, setCurrentChartData] = useState<TreasuryCurve | any>(
    {}
  );

  useEffect(() => {
    const fredData = async () => {
      const response = await fetch(`/api/FRED`);
      const data = await response.json();
      if (!data) {
        return;
      }
      setCurrentChartData({ ...data });
    };
    fredData();
  }, []);
  return <YieldCurve chartData={currentChartData} />;
};

ReactDOM.render(<App />, document.querySelector("#root"));
