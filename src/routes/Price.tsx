import { useParams } from "react-router-dom";

function Price() {
  const param = useParams();
  console.log(param);
  return <h1>Price</h1>;
}

export default Price;
