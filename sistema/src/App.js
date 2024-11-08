import TelaMenu from './componentes/Telas/TelaMenu.jsx';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Tela404 from './componentes/Telas/Tela404.jsx';
import TelaProduto from './componentes/Telas/TelaProduto.jsx';
import TelaCliente from './componentes/Telas/TelaCliente.jsx';
import TelaCategoria from './componentes/Telas/TelaCategoria.jsx';
import TelaFornecedor from './componentes/Telas/TelaFornecedor.jsx';
import TelaEntregador from './componentes/Telas/TelaEntregador.jsx';
import TelaUsuario from './componentes/Telas/TelaUsuario.jsx';
import TelaLogin from './componentes/Telas/TelaLogin.jsx';
import { useState, createContext } from 'react';


export const ContextoUsuario = createContext();
function App() {
  const [usuario,setUsuario] = useState({
    "usuario": "",
    "logado": false
  });

  if(!usuario.logado){
    return(
      <ContextoUsuario.Provider value={{usuario,setUsuario}}>
        <TelaLogin/>
      </ContextoUsuario.Provider>
    );
  }
  else{
    return (
      <div className="App">
          <>
            <ContextoUsuario.Provider value={{usuario,setUsuario}}>
              <BrowserRouter> 
                  {
                    //A ordem das Rotas é importante
                  }
                  <Routes>
                    <Route path="/produto" element={<TelaProduto />}/>
                    <Route path="/cliente" element={<TelaCliente />}/>
                    <Route path="/fornecedor" element={<TelaFornecedor />}/>
                    <Route path="/categoria" element={<TelaCategoria />}/>
                    <Route path="/entregador" element={<TelaEntregador />}/>
                    <Route path="/usuario" element={<TelaUsuario />}/>
                    <Route path="/" element={<TelaMenu />}/>
                    <Route path="*" element={<Tela404 />}/>
                  </Routes>
              </BrowserRouter>
            </ContextoUsuario.Provider>
          </>
   
      </div>
    );
  }
}

export default App;
