const knex = require("../dbconfig");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  async mostrarUsuarios(req, res) {
    const usuarios = await knex("usuarios").orderBy('id', 'desc');

    res.status(200).json(usuarios);
  },

  async cadastroUsuario(req, res) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      res.status(400).json({
        erro: "Enviar nome, email e senha do usuário.",
      });
      return;
    }

    try {
      const dados = await knex("usuarios").where({ email });
      if (dados.length) {
        res.status(400).json({ erro: "E-mail já cadastrado" });
        return;
      }
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }

    const hash = bcrypt.hashSync(senha, 5);

    try {
      const novo = await knex("usuarios").insert({ nome, email, senha: hash });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async trocarSenha(req, res) {
    const id = req.params["id"];
    const { novaSenha } = req.body;
    if (!novaSenha) {
      res.status(400).json({ erro: "Enviar nova Senha" });
      return;
    }
    try {
      const usuarios = await knex("usuarios").where({ id });
      if (usuarios.length == 0) {
        res.status(400).json({ erro: "Usuário não encontrado" });
        return;
      } else {
        const hash = bcrypt.hashSync(novaSenha, 10);
        await knex("usuarios").update("senha", hash).where({ id });
        res.status(200).json({ ok: 1, msg: "Senha Alterada!" });
      }
    } catch (error) {
      res.status.json({ ok: 0, msg: error.message });
    }
  },
   
  async deletarUser(req, res){
    const id = req.params["id"];
    const { senha } = req.body;
    if (!senha){
      res.status(400).json({ erro: "Enviar senha." });
      return;
    }
    else{
      try {
        const dados = await knex("usuarios").where({id});
        if (dados.length == 0) {
          res.status(400).json({ erro: "Usuário não encontrado" });
          return;
        } else{
          if (bcrypt.compareSync(senha, dados[0].senha)){
            await knex("usuarios").del().where({id});
            res.status(200).json({ok:1, msg: "Usuario Deletado!"})
          } else{
            res.status(400).json({ erro: "Senha incorreta" });
          }
        } 
      }catch (error) {
        res.status.json({ ok: 0, msg: error.message });
      }
    }
  }
};
