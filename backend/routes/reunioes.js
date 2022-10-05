const express = require('express');
const Reuniao = require('../models/reuniaoDeUsuarios');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/adicionaHorario', auth, async (req, res) => {

    const userId = res.locals.user.user_id;
    const userEmail = res.locals.user.email;
    console.log(`Id do Usuario : ${userId}`);
    console.log(`Email do Usuario : ${userEmail}`);

    const query = {userId: userId};
    const update = {$push: { horariosDisponiveis: [{variosParticipantes: true, local: 'urlDoZoom', horarios: {horarioInicio: Date.now(), horarioFim: Date.now()}}]}}
    const options = { upsert: true, new: true,runValidators: true ,setDefaultsOnInsert: true };

    try{
        const docReuniao = await Reuniao.findOneAndUpdate(query, update, options);
        res.status(200).json({message: 'Verifique console.', docReuniao}).send();
    }catch(e){
        // TODO: retornar erro sem stacktrace
        res.status(500).json({message: e}).send();
    }
    return
})

module.exports = router;