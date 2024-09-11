import CadFornecedor from "./Cadastros/CadFornecedor.jsx";
import Pagina from "../layouts/Pagina.jsx";
import { Container,Alert } from "react-bootstrap";
import { useState } from "react";
import { fornecedores } from "../../dados/mockFornecedor.js";
import TabelaFornecedor from "./Tabelas/TabelaFornecedor.jsx";

export default function TelaFornecedor(props){
    const[exibirTabela, setExibirTabela] = useState(true);

    return(
        <>
            <Pagina>
                <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                        {exibirTabela ? <h1>Tabela de Fornecedores</h1> : <h1>Cadastro de Fornecedor</h1>}
                    </Alert>
                </Container>
                {
                    exibirTabela ? <TabelaFornecedor listaDeFornecedor={fornecedores} setExibirTabela={setExibirTabela} /> : <CadFornecedor setExibirTabela={setExibirTabela}/>
                }
            </Pagina>
        </>
        
    );
}