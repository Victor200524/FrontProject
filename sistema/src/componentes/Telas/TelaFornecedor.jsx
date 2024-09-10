import CadFornecedor from "./Cadastros/CadFornecedor.jsx";
import Pagina from "../layouts/Pagina.jsx";
import { Container,Alert } from "react-bootstrap";
import { useState } from "react";
import {fornecedor} from "../../dados/mockFornecedor.js";

export default function TelaFornecedor(props){
    const[exibirTabela, setExibirTabela] = useState(true);

    return(
        <>
            <Pagina>
                <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                        <h1>Cadastro de Fornecedor</h1>
                    </Alert>
                </Container>
                {
                    exibirTabela ? <TelaFornecedor listaDeFornecedor={fornecedor} setExibirTabela={setExibirTabela} /> : <CadFornecedor setExibirTabela={setExibirTabela}/>
                }
            </Pagina>
        </>
        
    );
}