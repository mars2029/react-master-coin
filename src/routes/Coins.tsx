import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoinsData } from "./Api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  height: 15vh;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;

  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", CoinsData);

  //const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
  //     const json = await response.json();
  //     console.log(json.slice(0, 10));
  //     setCoins(json.slice(0, 10));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>Coin List</title>
      </Helmet>
      <Header>
        <Title> List </Title>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinList>
          {data?.map((prop) => (
            <Coin key={prop.id}>
              <Link
                to={{ pathname: `/${prop.id}`, state: { name: prop.name } }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${prop.symbol.toLowerCase()}`}
                />
                {prop.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
