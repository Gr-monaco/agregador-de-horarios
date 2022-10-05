const mongoose = require('mongoose');

const intervaloDeHorarioSchema = mongoose.Schema({
    horarioInicio: {
        required: true,
        type: Date
    },
    horarioFim: {
        required: true,
        type: Date
    }
}, {_id:false})

const horariosDisponiveisSchema = mongoose.Schema({
    horarios: intervaloDeHorarioSchema,
    local: { // Pode ser endereço ou link de zoom
        type: String,
        required: true
    },
    variosParticipantes: Boolean
})

const reunioesMarcadasSchema = mongoose.Schema({
    horarios: intervaloDeHorarioSchema,
    local: { // Pode ser endereço ou link de zoom
        required: true,
        type: String
    },
    participantes: [String]
})

const reunioesSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    horariosDisponiveis: [horariosDisponiveisSchema],
    reunioesMarcadas: [reunioesMarcadasSchema]
})

module.exports = mongoose.model('Reuniao', reunioesSchema);


