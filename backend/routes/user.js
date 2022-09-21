require('dotenv').config('../');

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post("/register", async(req, res) => {
    try{
        const { email, senha } = req.body;

        const usuarioJaExistente = await User.findOne({email});

        if(usuarioJaExistente){
            return res.status(409).send("Usuario com e-mail já existente.");
        }

        if(!(email && senha)){
            res.status(400).send("E-mail e senha obrigatório.");
        }

        const salt = await bcrypt.genSalt();
        senhaEncriptada = await bcrypt.hash(senha, salt);

        const user = await User.create({
            email: email,
            password: senhaEncriptada
        })
        const token = jwt.sign({
            user_id: user._id, email
        },
        process.env.TOKEN_KEY,
        {
            expiresIn:"2h"
        }
        );
        
        user.token = token;

        res.status(201).json(user);
    }
    catch (err){
        console.log(err);
        res.status(500).send("Erro não tratado.");
    }
});

router.post("/login", async (req, res)=>{
    try{
        const {email, senha} = req.body;

        if(!(email&&senha)){
            res.status(400).send('E-mail e senha obrigatório.');
            return;
        }

        const usuario = await User.findOne({email});
        
        if(usuario && (await bcrypt.compare(senha, usuario.password))){
            const token = jwt.sign({
                user_id: usuario._id, email
            },
            process.env.TOKEN_KEY,
            {
                expiresIn:"2h"
            });

            usuario.token = token;

            res.status(200).json(usuario);
            return;
        }else{
            res.status(401).send("Credenciais invalidos.")
        }


    }catch(err){
        console.log(err);
        res.status(500).send("Erro não tratado.");
    }
})

router.post("/authTest", auth, async(req, res) => {
    res.status(200).send(`Usuário autenticado: ${res.locals.user.user_id}`)
})

module.exports = router;