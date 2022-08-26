const express = require('express');
const Reuniao = require('../models/reuniao');
const router = express.Router();

router.post('/cria', async (req, res) => {
    const reuniao = new Reuniao({
        nome: req.body.nome,
        organizador: req.body.organizador,
        horarios:[{
                horario_de_inicio:"17:00",
                horario_de_fim:"18:00"
            },
            {
                horario_de_inicio:"17:30",
                horario_de_fim:"18:30"
            }
        ]
    });

    try{
        const novaReuniao = await reuniao.save();
        res.status(200).json(novaReuniao);
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;