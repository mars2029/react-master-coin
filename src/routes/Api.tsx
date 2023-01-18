export function CoinsData() {
  return fetch(`https://api.coinpaprika.com/v1/coins`)
    .then((res) => res.json())
    .then((res) => res.slice(0, 10));
}

export function InfoData(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((res) =>
    res.json()
  );
}

export function TickData(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then((res) =>
    res.json()
  );
}

export function ChartData(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((res) => res.json());
}
