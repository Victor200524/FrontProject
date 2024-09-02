import Pagina from './componentes/layouts/Pagina.jsx';
import Cliente from './componentes/Cadastros/CadCliente.jsx';
import Fornecedor from './componentes/Cadastros/CadFornecedor.jsx';
import Produto from './componentes/Cadastros/CadProduto.jsx';

function App() {
  return (
    <div className="App">
      
      <Pagina>
        <Cliente/>
      </Pagina>

      <Pagina>
        <Fornecedor/>
      </Pagina>

      <Pagina>
        <Produto/>
      </Pagina>

    </div>
  );
}

export default App;
