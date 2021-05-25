const express = require('express');
const routes = express.Router();

const userController = require('./controllers/usuario');
const loginTest = require('./middlewares/jwtLogin');
const login = require('./controllers/userLogin');

const anime = require('./controllers/anime');

routes
    .post('/userLogin', login.usuarioLogin)
    .get('/showUsers', loginTest, userController.mostrarUsuarios)
    .post('/userRegister', userController.cadastroUsuario)
    .put('/userUpdate/:id', loginTest, userController.trocarSenha)
    .delete('/userDelete/:id', loginTest, userController.deletarUser);

routes
    .get('/animeSimples', loginTest, anime.animesSimples)
    .get('/anime', loginTest, anime.animes)
    .post('/addAnime/:id', loginTest, anime.addAnime)
    .put('/updateAnime/:id', loginTest, anime.updateAnime)
    .delete('/deleteAnime/:id', loginTest, anime.deleteAnime)
    .get('/destaques', loginTest, anime.destaques)
    .post('/destaques/:id', loginTest, anime.animeDestaque)
    .get('/filtro/:palavra',loginTest, anime.filtro);

module.exports = routes;