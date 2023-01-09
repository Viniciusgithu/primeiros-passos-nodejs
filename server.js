//O arquivo possui a função de chamar o escutador de rotas
import app from './src/app.js'

const PORT = 3001;

    //escutar a porta 3001
    app.listen(PORT, () => {
      console.log(`Servidor rodando no endereço: http://localhost:${PORT}`);
    });

