const express = require('express');
const Reuniao = require('../models/reuniaoDeUsuarios');
const auth = require('../middleware/auth.js');
const { ObjectID, ObjectId } = require('bson');
const { default: mongoose } = require('mongoose');

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

router.post('/selecionaHorario', async (req, res) => {
  const userId = req.body._id;

  const query = { userId: userId }

  console.log(`Query: ${JSON.stringify(query)}`)

  try{
    const docReuniaoVerHorario = await Reuniao.findOne(query);
    const idReuniao = req.body.idReuniao
    console.log(idReuniao);
    console.log(mongoose.Types.ObjectId(idReuniao));
    docReuniaoVerHorario.horariosDisponiveis.forEach(e => console.log(e._id))
    const reuniaoSelecionada = docReuniaoVerHorario.horariosDisponiveis.find(e => e._id.equals(new ObjectId(idReuniao)));

    res.status(200).send(docReuniaoVerHorario);
  }
  catch(e){
    res.status(404).send(e.message)
  }
})
module.exports = router;
