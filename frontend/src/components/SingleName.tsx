import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";

const SingleName: React.FC = () => {
  const { symbol } = useParams();
  return <div>{symbol}</div>;
};

export default SingleName;
