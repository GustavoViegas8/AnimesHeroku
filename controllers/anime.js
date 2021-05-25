const knex = require('../dbconfig')

module.exports ={
    async animesSimples(req, res){
       const lista = await knex('lista').orderBy('id', 'desc')
        res.status(200).json(lista);
    },

    async animes(req, res){
        const animes = await knex
        .select("l.id", "l.titulo", "g.genero as genero", "t.temporada as temporada", "e.estudio as estudio", "l.ano", "l.episodios", "l.LinkFoto")
        .from("lista as l")
        .leftJoin("generos as g", "l.genero_id", "g.id")
        .leftJoin("estudios as e", "l.estudio_id", "e.id")
        .leftJoin("temporadas as t", "l.temporada_id", "t.id")
        .orderBy("l.id", "desc");
       res.status(200).json(animes);
    },
    
    async addAnime(req, res){
        const idUser = req.params["id"];
        const {titulo, ano, episodios, LinkFoto, genero_id, temporada_id, estudio_id} = req.body;
        const Ids = await knex("usuarios").where({'id': idUser})
        if(Ids.length == 0){
            res.status(400).json({erro: "Usuário não Cadastrado"})
            return;
        }else{  
            if(!titulo || !ano || !episodios || !LinkFoto || !genero_id || !temporada_id || !estudio_id){
                res.status(400).json({erro: "Enviar todos os dados."})
                return;
            }else{
                if(genero_id > 6 || temporada_id > 4 || estudio_id > 7){
                    res.status(400).json({erro: "ID estrangeiro incorreto."})
                    return;
                }
                try{
                    const newAnime = await knex("lista").insert({titulo, idUser, ano, episodios, LinkFoto, genero_id, temporada_id, estudio_id});
                    res.status(201).json({id: newAnime[0]})
                }catch(error){
                    res.status(400).json({erro: error.message});
                }
            }
        }
    },

    async updateAnime(req,res){
        const id = req.params["id"];
        const { episodios, LinkFoto } = req.body;
        const Ids = await knex("lista").where({id})

        if(Ids.length == 0){
            res.status(400).json({erro: "Anime não Cadastrado"})
            return;
        }else{  
            if(!episodios && !LinkFoto){
                res.status(400).json({erro: "Enviar Dados"})
                return;
            } else if(!episodios && LinkFoto){
                try{
                    await knex("lista").where({id}).update({LinkFoto})
                    res.status(201).json({msg: "Imagen alterada."})
                } catch{
                    res.status(400).json({erro: error.message});
                }
            } else if(episodios && !LinkFoto){
                try{
                    await knex("lista").where({id}).update({episodios})
                    res.status(201).json({msg: "Quantidade de episodios alterada."})
                } catch{
                    res.status(400).json({erro: error.message});
                }
            } else{
                try{
                    await knex("lista").where({id}).update({episodios, LinkFoto})
                    res.status(201).json({msg: "Dados alterados."})
                } catch{
                    res.status(400).json({erro: error.message});
                }
            }
        }
    },

    async deleteAnime(req, res){
        const id = req.params["id"];
        const Ids = await knex("lista").where({id})
        if(Ids.length == 0){
            res.status(200).json({erro: "Anime não Cadastrado"})
            return;
        }
        try{
            await knex("lista").where({id}).delete()
            res.status(201).json({msg: "Anime Removido."})
        } catch(error){
            res.status(400).json({erro: error.message});
        }
    },

    async destaques(req, res){
        try{
            const lista = await knex('lista').where({'destaque': 1}).orderBy('id', 'desc')
            if(lista.length == 0){
                res.status(200).json({msg: "Nenhum destaque na lista."})
                return;
            }
            res.status(200).json(lista);
        }catch(error){
            res.status(400).json({erro: error.message});
        }
    },

    async animeDestaque(req, res){
        const id = req.params["id"];
        try{
            const dados = await knex('lista').where({id})
            if(dados.length == 0){
                res.status(400).json({msg: "ID invalido."})
                return;
            }
            if(dados[0].destaque == 1){
                await knex('lista').where({id}).update({'destaque': 0})
                res.status(200).json({msg: "Removido dos destaques"})
            }else{
                await knex('lista').where({id}).update({'destaque': 1})
                res.status(200).json({msg: "Adicionados dos destaques"})
            }
        }catch(error){
            res.status(400).json({erro: error.message});
        }
    },

    async filtro(req, res){
        const palavra = req.params["palavra"];
        try{
            const dados = await knex('lista')
            .select("l.id", "l.titulo", "g.genero as genero", "t.temporada as temporada", "e.estudio as estudio", "l.ano", "l.episodios", "l.LinkFoto")
            .from("lista as l")
            .leftJoin("generos as g", "l.genero_id", "g.id")
            .leftJoin("estudios as e", "l.estudio_id", "e.id")
            .leftJoin("temporadas as t", "l.temporada_id", "t.id")
            .orderBy("l.id", "desc")
            .where('titulo', 'like', `%${palavra}%`)
            .orWhere('ano', 'like', `%${palavra}%`)
            .orWhere('episodios', 'like', `%${palavra}%`).orderBy('id', 'desc');
            res.status(200).json(dados);
        }catch(error) {
            res.status(400).json({erro: error.message})
        }
    }
} 