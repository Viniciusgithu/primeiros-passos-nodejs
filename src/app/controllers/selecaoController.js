import connection from "../database/connection.js"

class SelecaoController {

  async index(req, res) {
    const sql = "SELECT * FROM selecoes;"
    connection.query(sql, (err, resul) => {
      if(err){
        res.status(404).json({err})
      } else {
        res.status(200).json(resul)
      }
    })
  }

  show (req, res) {  

    const id = req.params.id
    const sql = "SELECT * FROM selecoes WHERE id=?;"
  
    connection.query(sql, id, (error, result)=>{
      if(error){
        res.status(404).json({erro: `${error}`})
      } else {
        res.status(200).json(result)
      }
    });
  }

  store (req, res) {

    const dados = req.body
    const sql = "INSERT INTO selecoes SET ?;" // ? = conjunto de colunas e valores
  
    connection.query(sql, dados, (error, result)=>{
      if(error){
        res.status(404).json({erro: `${error}`})
      } else {
        res.status(201).json(result)
      }
    });
  }

  update (req, res) {


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
  }

  delete (req, res) {

    const id = req.params.id
    const sql = "DELETE FROM selecoes WHERE id=?;"
  
    connection.query(sql, id, (error, result)=>{
      if(error){
        res.status(404).json({erro: `${error}`})
      } else {
        res.status(200).json(result)
      }
    });
  }

}


// Padrão Singleton
export default new SelecaoController()