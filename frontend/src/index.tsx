import ReactDOM from "react-dom";
import YieldCurve from "./components/YieldCurve";
import CandlestickGraph from "./components/CandlestickGraph";

const App = () => {
  return (
    <div>
      <YieldCurve />
      <CandlestickGraph stock="SPY" />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
