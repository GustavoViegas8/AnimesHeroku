const knex = require("../dbconfig");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {

  async usuarioLogin(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      res.status(400).json({ erro: "Dados incorretos." });
      return;
    }
    try {
      const dados = await knex("usuarios").where({ email });
      if (dados.length == 0) {
        res.status(400).json({ erro: "Email não cadastrado" });
        return;
      }
      if (bcrypt.compareSync(senha, dados[0].senha)) {
        const token = jwt.sign(
          {
            usuario_id: dados[0].id,
            usuario_nome: dados[0].nome,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );

        res.status(200).json({ token });
      } else {
        res.status(400).json({ erro: "Senha incorreta" });
      }
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }
};
