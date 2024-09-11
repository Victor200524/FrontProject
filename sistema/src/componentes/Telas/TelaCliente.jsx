import CadCliente from "./Cadastros/CadCliente.jsx";
import Pagina from "../layouts/Pagina.jsx"
import { Container,Alert } from "react-bootstrap";
import { useState } from "react";
import TabelaCliente from "./Tabelas/TabelaCliente.jsx";
import { clientes } from "../../dados/mockCliente.js"

export default function TelaCliente(props){
    const [exibirTabela,setExibirTabela] = useState(true);
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
                    exibirTabela ? <TabelaCliente listaDeClientes={clientes} setExibirTabela={setExibirTabela}/> : <CadCliente setExibirTabela={setExibirTabela}/>
                }
            </Pagina>
        </>
        
    );
}