const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.use(express.json()); //Define que estamos usando json

let cliente = [];
let filmes = [];
let locacao = [];

/*/*=========get cliente=========================================================*/
app.get("/cliente", async (req, res)=> {
    try{
        const [rows] = await db.query("Select * from cliente");
        res.json(rows);
    }catch(error){
        console.log("Erro ao buscar: " + error.message);
        res.status(500).send("Erro ao buscar clientes")
    }
});

/*========get filmes==========================================================*/
app.get("/filmes", async (req, res)=> {
    try{
        const [rows] = await db.query("Select * from filmes");
        res.json(rows);
    }catch(error){
        console.log("Erro ao buscar: " + error.message);
        res.status(500).send("Erro ao buscar filmes")
    }
});

/*========get locacao==========================================================*/
app.get("/locacao", async (req, res)=> {
    try{
        const [rows] = await db.query("Select * from locacao");
        res.json(rows);
    }catch(error){
        console.log("Erro ao buscar: " + error.message);
        res.status(500).send("Erro ao buscar locacao")
    }
});
/*=========get cliente=========================================================*/
app.get("/cliente/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query("Select * from cliente Where id = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]); 
        }
        res.status(404).send("Cliente com id:" + id + " não encontrado!")
    }catch(error){
        console.log("Erro ao buscar: " + error.message);
        res.status(500).send("Erro ao buscar clientes")
    }

});

/*=========get filmes=========================================================*/
app.get("/filmes/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query("Select * from filmes Where id = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]); 
        }
        res.status(404).send("filmes com id:" + id + " não encontrado!")
    }catch(error){
        console.log("Erro ao buscar: " + error.message);
        res.status(500).send("Erro ao buscar filmess")
    }

});

/*=========get locacao=========================================================*/
app.get("/locacao/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query("Select * from locacao Where id = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]); 
        }
        res.status(404).send("locacao com id:" + id + " não encontrado!")
    }catch(error){
        console.log("Erro ao buscar: " + error.message);
        res.status(500).send("Erro ao buscar locacaos")
    }

});
/*=========post cliente=========================================================*/
app.post("/cliente",async (req, res) => {
    // const nome = req.body.nome;
    let cliente = req.body;
    try{
        const [rows] = await db.query("Insert into cliente(nome,cpf,telefone,email) values (?,?,?,?)",
         [cliente.nome, cliente.cpf, cliente.telefone,cliente.email]);
         if (cliente.nome == null) {
            res.json(rows[0]); 
        }
        if (cliente.cpf == null) {
            res.json(rows[0]); 
        }
        if (cliente.telefone == null) {
            res.json(rows[0]); 
        }
        if (cliente.email == null) {
            res.json(rows[0]); 
        }

        cliente.id = rows.insertId;

        res.status(201).json(cliente);
    }catch(error){
        console.log("Erro ao cadastrar clinte: " + error.message);
        res.status(500).send("Erro ao cadastrar")
    }
});

/*=========post filmes=========================================================*/

app.post("/filmes",async (req, res) => {
    // const nome = req.body.nome;
    let filmes = req.body;
    try{
        const [rows] = await db.query("Insert into filmes(titulo,genero,ano_Lancamento,classificacao_Indicativo,estoque_Disponivel) values (?,?,?,?)",
         [filmes.titulo, filmes.genero, filmes.ano_Lancamento,filmes.classificacao_Indicativo]);

         filmes.id = rows.insertId;

         if (filmes.titulo == null) {
            res.json(rows[0]); 
        }
        if (filmes.genero == null) {
            res.json(rows[0]); 
        }
        if (filmes.ano_Lancamento == null) {
            res.json(rows[0]); 
        }
        if (filmes.classificacao_Indicativo == null) {
            res.json(rows[0]); 
        }

        res.status(201).json(filmes);
    }catch(error){
        console.log("Erro ao cadastrar filmes: " + error.message);
        res.status(500).send("Erro ao cadastrar filmes")
    }
});

/*=========post locacao=========================================================*/

app.post("/locacao",async (req, res) => {
    // const nome = req.body.nome;
    let locacao = req.body;
    try{
        const [rows] = await db.query("Insert into locacao(id_cliente,data_locacao,data_devolucao) values (?,?,?)",
         [locacao.id_cliente, locacao.data_locacao,locacao.data_devolucao]);

         locacao.id = rows.insertId;
         
         if (locacao.id_cliente == null) {
            res.json(rows[0]); 
        }
        if (locacao.data_locacao == null) {
            res.json(rows[0]); 
        }
        if (locacao.data_devolucao == null) {
            res.json(rows[0]); 
        }
    
        res.status(201).json(locacao);
    }catch(error){
        console.log("Erro ao cadastrar locacao: " + error.message);
        res.status(500).send("Erro ao cadastrar locacao")
    }
});

/*=======put cliente===========================================================*/
app.put("/cliente/:id",async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query("Select * from cliente Where id = ?", [id]);
        if (rows.length > 0) {
            let cliente = req.body;
             const [rows] = await db.query("Update cliente set nome = ?, cpf = ?, telefone = ?,email = ? Where id = ?",
             [cliente.nome, cliente.cpf, cliente.telefone,cliente.email, id])

             cliente.id = id;

             if (cliente.nome == null) {
                res.json(rows[0]); 
            }
            if (cliente.cpf == null) {
                res.json(rows[0]); 
            }
            if (cliente.telefone == null) {
                res.json(rows[0]); 
            }
            if (cliente.email == null) {
                res.json(rows[0]); 
            }
    

             res.status(200).json(cliente);
        }
        res.status(404).send("Cliente com id:" + id + " não encontrado!")
    }catch(error){
        console.log("Erro ao atualizar: " + error.message);
        res.status(500).send("Erro ao atualizar clientes")
    }
});

/*=======put filmes===========================================================*/

app.put("/filmes/:id",async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query("Select * from filmes Where id = ?", [id]);
        if (rows.length > 0) {
            let filmes = req.body;
             const [rows] = await db.query("Update filmes set titulo = ?, genero = ?, ano_lancamento = ?,classificacao_indicativo = ?,estoque_disponivel = ? Where id = ?",
             [filmes.titulo, filmes.genero, filmes.ano_Lancamento,filmes.classificacao_Indicativo,id])

             filmes.id = id;

             if (filmes.titulo == null) {
                res.json(rows[0]); 
            }
            if (filmes.genero == null) {
                res.json(rows[0]); 
            }
            if (filmes.ano_Lancamento == null) {
                res.json(rows[0]); 
            }
            if (filmes.classificacao_Indicativo == null) {
                res.json(rows[0]); 
            }
    

             res.status(200).json(filmes);
        }
        res.status(404).send("filmes com id:" + id + " não encontrado!")
    }catch(error){
        console.log("Erro ao atualizar: " + error.message);
        res.status(500).send("Erro ao atualizar filmess")
    }
});

/*=======put locacao===========================================================*/

app.put("/locacao/:id",async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query("Select * from locacao Where id = ?", [id]);
        if (rows.length > 0) {
            let locacao = req.body;
             const [rows] = await db.query("Update locacao set id_cliente = ?, data_locacao = ?,data_devolucao = ? Where id = ?",
             [locacao.id_cliente, locacao.data_locacao,locacao.data_devolucao,id])

             locacao.id = id;

             if (locacao.id_cliente == null) {
                res.json(rows[0]); 
            }
            if (locacao.data_locacao == null) {
                res.json(rows[0]); 
            }
            if (locacao.data_devolucao == null) {
                res.json(rows[0]); 
            }

             res.status(200).json(locacao);
        }
        res.status(404).send("locacao com id:" + id + " não encontrado!")
    }catch(error){
        console.log("Erro ao atualizar: " + error.message);
        res.status(500).send("Erro ao atualizar locacaos")
    }
});

/*=======delete cliente===========================================================*/
app.delete("/cliente/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const [rows] = await db.query("Delete From cliente Where id = ?", [id]);
        if(rows.affectedRows > 0) {
            res.status(204).send("Cliente deletado com sucesso!")
        }
        res.status(404).send("Cliente não encontrado para deletar!")
    }catch(error){
        console.log("Erro ao deletar: " + error.message);
        res.status(500).send("Erro ao deletar clientes")
    }
})

/*=======delete filmes===========================================================*/

app.delete("/filmes/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const [rows] = await db.query("Delete From filmes Where id = ?", [id]);
        if(rows.affectedRows > 0) {
            res.status(204).send("filmes deletado com sucesso!")
        }
        res.status(404).send("filmes não encontrado para deletar!")
    }catch(error){
        console.log("Erro ao deletar: " + error.message);
        res.status(500).send("Erro ao deletar filmess")
    }
})

/*=======delete locacao===========================================================*/

app.delete("/locacao/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const [rows] = await db.query("Delete From locacao Where id = ?", [id]);
        if(rows.affectedRows > 0) {
            res.status(204).send("locacao deletado com sucesso!")
        }
        res.status(404).send("locacao não encontrado para deletar!")
    }catch(error){
        console.log("Erro ao deletar: " + error.message);
        res.status(500).send("Erro ao deletar locacaos")
    }
})

app.listen(port, ()=> {
    console.log("Servidor rodando na porta http://localhost:3000/");
});