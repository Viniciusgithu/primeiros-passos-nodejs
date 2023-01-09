import express from 'express';
import connection from '../infra/connection.js'

const app = express();

//Indicar para o express ler o body com json
app.use(express.json())


//Função que retorna o objeto por ID
function buscarPorId (id) {
  return selecoes.filter(selecao => selecao.id === id)
};

//Função auxiliar para pegar a posição ou index do elemento no array por ID
function buscarIndexSelecao(id){
  return selecoes.findIndex(selecao => selecao.id === id)
};

//Criar rota padrão ou raiz. endpoint: parte final da url, ex: /selecoes or /alunos


//Criando um endpoint
app.get('/selecoes', (req, res) => {
  //res.status(200).send(selecoes)
  //a consulta tem que ser feita: chamando uma conexão ativa, usar o método query, passar a instrução sql que queremos executar, e seguir de uma arrow function (o parâmetro pode ser três: error, result, fields)

  const sql = "SELECT * FROM selecoes;"

  connection.query(sql, (error, result)=>{
    if(error){
      res.status(404).json({erro: `${error}`})
    } else {
      res.status(200).json(result)
    }
  });
});

//Criando uma rota get por ID, criando um parâmetro 
app.get('/selecoes/:id', (req, res) => {  
  //let index = req.params.id
  //res.json(buscarPorId(req.params.id))
  const id = req.params.id
  const sql = "SELECT * FROM selecoes WHERE id=?;"

  connection.query(sql, id, (error, result)=>{
    if(error){
      res.status(404).json({erro: `${error}`})
    } else {
      res.status(200).json(result)
    }
  });
});

//Criando rota para adicionar dados, status 201 quer dizer sucesso na criação
app.post('/selecoes', (req, res) => {
  //selecoes.push(req.body)
  //res.status(201).send('Seleção cadastrada com sucesso!')

  const dados = req.body
  const sql = "INSERT INTO selecoes SET ?;" // ? = conjunto de colunas e valores

  connection.query(sql, dados, (error, result)=>{
    if(error){
      res.status(400).json({erro: `${error}`})
    } else {
      res.status(201).json(result)
    }
  });
});

//Criando rota para deletar por ID
app.delete('/selecoes/:id', (req, res) =>{
  // let index = buscarIndexSelecao(req.params.id)
  // selecoes.splice(index, 1)
  // res.send(`Seleção com ID: ${req.params.id}, excluída com sucesso!`)

  const id = req.params.id
  const sql = "DELETE FROM selecoes WHERE id=?;"

  connection.query(sql, id, (error, result)=>{
    if(error){
      res.status(404).json({erro: `${error}`})
    } else {
      res.status(200).json(result)
    }
  });
});

//Criando rota para atualizar
app.put('/selecoes/:id', (req, res) => {
  // let index = buscarIndexSelecao(req.params.id)
  // selecoes[index].selecao = req.body.selecao
  // selecoes[index].grupo = req.body.grupo
  // res.json(selecoes)

  const id = req.params.id
  const selecao = req.body
  const sql = "UPDATE selecoes SET ? WHERE id=?;"

  connection.query(sql, [selecao, id], (error, result)=>{
    if(error){
      res.status(404).json({erro: `${error}`})
    } else {
      res.status(200).json(result)
    }
  });
});


export default app

