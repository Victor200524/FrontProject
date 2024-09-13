import Pagina from "../layouts/Pagina.jsx";
import { Container,Alert } from "react-bootstrap";
import { useState } from "react";
import TabelaProdutos from "./Tabelas/TabelaProdutos.jsx";
import CadProduto from "../Telas/Cadastros/CadProduto.jsx";
import { produtos } from "../../dados/mockProdutos.js";

export default function TelaProduto(props){
    const [exibirTabela,setExibirTabela]=useState(true);


    return(
        <>
            <Pagina>
                <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                        {
                            exibirTabela ? <h1>Tabela de Produtos</h1> : <h1>Cadastro de Produtos</h1>
                        }
                    </Alert>
                </Container>
                {
                    exibirTabela ? <TabelaProdutos  listaDeProdutos={produtos} setExibirTabela={setExibirTabela}/> : <CadProduto listaDeProdutos={produtos} setExibirTabela={setExibirTabela}/>
                }
            </Pagina>
        </>
        
    );
}