import React from 'react';
import { useHref, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
export default function Reunioes() {
  const [queryParameters] = useSearchParams();
  const [reunioes, setReunioes] = React.useState();


  React.useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_URL +
          `reuniao/pegarReunioes/${queryParameters.get('user')}`
        }`
      )
      .then((res) => {
        setReunioes(res.data);
        console.log(res.data.horariosDisponiveis)
        const datasUnicas = [...new Set(res.data.horariosDisponiveis.map(item => item.dia))];
        console.log(datasUnicas)

      })
      .catch((e) => console.log(e.message));
  }, []);

/*   React.useEffect(() => {
    console.log(reunioes.horariosDisponiveis)
  }, [reunioes])
 */
  return (
    <div>
      <p>usuariao: {queryParameters.get('user')}</p>
      <h1>22/11/2022</h1>
      {reunioes !== '' && <p>{JSON.stringify(reunioes)}</p>}
    </div>
  );
}
