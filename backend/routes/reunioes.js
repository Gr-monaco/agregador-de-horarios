const express = require('express');
const Reuniao = require('../models/reuniaoDeUsuarios');
const auth = require('../middleware/auth.js');
const User = require('../models/user.js');

const router = express.Router();

router.post('/adicionaHorario', auth, async (req, res) => {
  console.log(req.body);
  const userId = res.locals.user.user_id;
  const userEmail = res.locals.user.email;
  console.log(`Id do Usuario : ${userId}`);
  console.log(`Email do Usuario : ${userEmail}`);

  const diaDaReuniao = new Date(req.body.dia);
  const diaString = diaDaReuniao.getDate() + '/' +  diaDaReuniao.getMonth() + '/' + diaDaReuniao.getFullYear()
  console.log(`DIA DA REUNIAO: ${diaString}`);

  const query = { userId: userId };
  const update = {
    $push: {
      horariosDisponiveis: [
        {
          variosParticipantes: true,
          local: 'urlDoZoom',
          dia: diaString,
          horarios: {
            horarioInicio: req.body.horarioInicial,
            horarioFim: req.body.horarioTermino,
          },
        },
      ],
    },
  };
  const options = {
    upsert: true,
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  };

  const docReuniaoVerHorario = await Reuniao.findOne(query);
  console.log(docReuniaoVerHorario);
  if (docReuniaoVerHorario == null) {
    console.log('Doc não existe.');
    const docReuniao = await Reuniao.findOneAndUpdate(query, update, options);
    res.status(200).json({ message: 'Doc criado.', docReuniao }).send();
    return;
  }

  //aqui rodar validacoes de horario
  try {
    docReuniaoVerHorario.horariosDisponiveis.forEach((e, i, a) => {
      //validacao de conflito de horario
      console.log(e.horarios);
    });
    const docReuniao = await Reuniao.findOneAndUpdate(query, update, options);
    res.status(200).json({ message: 'Verifique console.', docReuniao }).send();
  } catch (e) {
    // TODO: retornar erro sem stacktrace
    res.status(500).json({ message: e }).send();
  }
  return;
});

router.get('/pegarReunioes/:usuario', async (req, res) => {
  console.log(req.params);
  const query = { userId: req.params.usuario }
  try{
    const usuario = await Reuniao.findOne(query);
    res.status(200).send(usuario);
  }
  catch(e){
    res.status(404).send(e.message)
  }
})

router.post('/pegarReunioesAgendadas', auth, async (req, res) => {
  console.log(req.params);
  const email = res.locals.user.email;
  const usuario = await User.findOne({email});
  console.log(usuario)
  try{
    const query = { userId: usuario._id}
    const dadosDeUsuario = await Reuniao.findOne(query);

    console.log(dadosDeUsuario)
    res.status(200).send(dadosDeUsuario.reunioesMarcadas);
  }
  catch(e){
    res.status(404).send(e.message);
  }

})
module.exports = router;
