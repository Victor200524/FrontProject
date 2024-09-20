import CadCliente from "./Cadastros/CadCliente.jsx";
import Pagina from "../layouts/Pagina.jsx"
import { Container,Alert } from "react-bootstrap";
import { useState } from "react";
import TabelaCliente from "./Tabelas/TabelaCliente.jsx";
import { clientes } from "../../dados/mockCliente.js"

export default function TelaCliente(props){
    const [exibirTabela,setExibirTabela] = useState(true);
    const[listaDeCliente,setListaDeCliente] = useState(clientes);
    const[modoEdicao,setModoEdicao] = useState(false);
    const[clienteSelecionado,setClienteSelecionado] = useState(false);

    return(
        <>
            <Pagina>
            <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                    {
                        exibirTabela ? <h1>Tabela de Clientes</h1> : <h1>Cadastro de Clientes</h1>
                    }
                    </Alert>
                </Container>
                {
                    exibirTabela ?  <TabelaCliente listaDeClientes={clientes} 
                                                    setClienteSelecionado = {setClienteSelecionado}
                                                    setModoEdicao = {setModoEdicao}
                                                    setListaDeCliente = {setListaDeCliente}
                                                    setExibirTabela={setExibirTabela}/> : 
                                    <CadCliente listaDeCliente = {listaDeCliente}
                                                clienteSelecionado = {clienteSelecionado}
                                                modoEdicao = {modoEdicao}
                                                setModoEdicao = {setModoEdicao}
                                                setListaDeCliente = {setListaDeCliente}
                                                setExibirTabela={setExibirTabela}/>
                }
            </Pagina>
        </>
        
    );
}