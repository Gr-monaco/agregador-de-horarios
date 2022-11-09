import React from 'react';
import { useHref, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
export default function Reunioes() {
  const [queryParameters] = useSearchParams();
  const [reunioes, setReunioes] = React.useState();
  const [horarioSelectionado, setHorarioSelecionado] = React.useState('');
  const [cliente, setCliente] = React.useState('');

  React.useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_URL +
          `reuniao/pegarReunioes/${queryParameters.get('user')}`
        }`
      )
      .then((res) => {
        console.log(res.data.horariosDisponiveis)
        const datasUnicas = [...new Set(res.data.horariosDisponiveis.map(item => item.dia))];
        const opcoesDeReuniao = [];
        datasUnicas.forEach(element => {
          const dia = {dia:element};
          dia.horarios = [];
          res.data.horariosDisponiveis.forEach(element => {
            if (element.dia === dia.dia){
              dia.horarios.push([element.horarios.horarioInicio, element.horarios.horarioFim, element._id]);
            }
          })
          console.log(dia);
          opcoesDeReuniao.push(dia);
        });
        console.log(opcoesDeReuniao)
        setReunioes(opcoesDeReuniao)
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
      <form onSubmit={(event) => {
        console.log(event);
      }}>
        <text>Pessoa</text>
        <input value={cliente} onChange={ e => setCliente(e.target.value)}></input>
        <text>{cliente}</text>
      {reunioes !== undefined && (() => {
        let opcao = [];
        reunioes.forEach((item) => {
          opcao.push(
          <div>
            <h1>{item.dia}</h1>
            {(()=>{
              let horarios = [];
              item.horarios.forEach((horario) => {
                horarios.push(
                <div>
                  <text>{(new Date(horario[0]).getHours() < 10 ? '0' : '') + new Date(horario[0]).getHours()+":"+(new Date(horario[0]).getMinutes() < 10 ? '0' : '') +new Date(horario[0]).getMinutes()+'-'+(new Date(horario[1]).getHours() < 10 ? '0' : '')+new Date(horario[1]).getHours()+":"+(new Date(horario[1]).getMinutes() < 10 ? '0' : '')+new Date(horario[1]).getMinutes()}</text>
                  <input name='opcao' type={"radio"} value={horario[2]} onClick={(value) => setHorarioSelecionado(value.target.value)}/>
                </div>)
              })
              return horarios
            })()}
          </div>)
        })
        return opcao
      })()}
      <button type={'button'} onClick={()=> {
        const objeto = {cliente: cliente, _id:queryParameters.get('user'), idReuniao: horarioSelectionado}
        console.log(objeto)
        axios.post(`${
          process.env.REACT_APP_API_URL +
          `reuniao/selecionaHorario`
        }`, objeto)
      }}>Enviar</button>
      </form>
      
    </div>
  );
}
