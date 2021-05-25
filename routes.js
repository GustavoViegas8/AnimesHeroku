const express = require('express');
const routes = express.Router()

const userController = require('./controllers/usuario')
const loginTest = require('./middlewares/jwtLogin')
const login = require('./controllers/userLogin')

const anime = require('./controllers/anime')


routes.post('/userLogin', login.usuarioLogin)
routes.get('/showUsers', loginTest, userController.mostrarUsuarios)
routes.post('/userRegister', userController.cadastroUsuario)
routes.put('/userUpdate/:id', loginTest, userController.trocarSenha)
routes.delete('/userDelete/:id', loginTest, userController.deletarUser)

routes.get('/animeSimples', loginTest, anime.animesSimples)
routes.get('/anime', loginTest, anime.animes)
routes.post('/addAnime/:id', loginTest, anime.addAnime)
routes.put('/updateAnime/:id', loginTest, anime.updateAnime)
routes.delete('/deleteAnime/:id', loginTest, anime.deleteAnime)
routes.get('/destaques', loginTest, anime.destaques)
routes.post('/destaques/:id', loginTest, anime.animeDestaque)
routes.get('/filtro/:palavra',loginTest, anime.filtro)

module.exports = routes;