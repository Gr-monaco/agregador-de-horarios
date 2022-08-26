const mongoose = require('mongoose');

const reuniaoSchema = new mongoose.Schema({
    nome: {
        required: true,
        type: String
    },
    organizador: { // talvez mude para ter mais dados do usuario
        required: true,
        type: String
    },
    horarios:[
        new mongoose.Schema({
            horario_de_inicio:{
                required: true,
                type: String
            },
            horario_de_fim:{
                required: true,
                type: String
            }
        }, {_id:false})
    ]
})

module.exports = mongoose.model("Reuniao", reuniaoSchema)