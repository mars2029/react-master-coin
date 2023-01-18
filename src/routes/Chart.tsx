import { useQuery } from "react-query";
import { ChartData } from "./Api";

import ApexChart from "react-apexcharts";

interface ICoinChartArg {
  coinIdArg: string;
}

interface ICoinChatData {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinIdArg }: ICoinChartArg) {
  const { isLoading, data: cdata } = useQuery<ICoinChatData[]>(
    ["ohlcv", coinIdArg],
    () => ChartData(coinIdArg),
    { refetchInterval: 5000 }
  );

  return (
    <>
      <h1>Chart - {coinIdArg}</h1>
      {isLoading ? (
        "loading..."
      ) : (
        <>
          <ApexChart
            type="line"
            width="500"
            options={{
              chart: { width: 500, height: 500 },
              theme: { mode: "dark" },
              xaxis: {
                type: "datetime",
                categories: cdata?.map((price) => price.time_close),
              },
              tooltip: {
                enabled: true,
                y: {
                  formatter: (value) =>
                    `$ ${value.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}`,
                },
              },
            }}
            series={[
              {
                name: "series-1",
                data: cdata?.map((ret) => ret.open) as number[],
              },
            ]}
          />
          <div>
            <ul>{cdata?.map((ret) => ret.open)}</ul>
          </div>
        </>
      )}
    </>
  );
}

export default Chart;
