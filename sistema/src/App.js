import {BrowserRouter, Route, Routes} from "react-router-dom";
import TelaMenu from './componentes/Telas/Tela/TelaMenu.jsx';
import Tela404 from './componentes/Telas/Tela/Tela404.jsx';
import TelaProduto from './componentes/Telas/Tela/TelaProduto.jsx';
import TelaCliente from './componentes/Telas/Tela/TelaCliente.jsx';
import TelaCategoria from './componentes/Telas/Tela/TelaCategoria.jsx';
import TelaFornecedor from './componentes/Telas/Tela/TelaFornecedor.jsx';
import TelaEntregador from './componentes/Telas/Tela/TelaEntregador.jsx';
import TelaUsuario from './componentes/Telas/Tela/TelaUsuario.jsx';
import TelaLogin from './componentes/Telas/Tela/TelaLogin.jsx';
import { useState, createContext } from 'react';
import store from "./redux/store.js";
import {Provider} from "react-redux";

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
          <Provider store={store}>
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
          </Provider>
          </>
   
      </div>
    );
  }
}

export default App;
