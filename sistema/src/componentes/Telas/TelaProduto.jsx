import Pagina from "../layouts/Pagina.jsx";
import { Container,Alert } from "react-bootstrap";
import { useState } from "react";
import TabelaProdutos from "./Tabelas/TabelaProdutos.jsx";
import CadProduto from "../Telas/Cadastros/CadProduto.jsx";
import { produtos } from "../../dados/mockProdutos.js";

export default function TelaProduto(props){
    const [exibirTabela,setExibirTabela]= useState(true);
    const [listaDeProdutos,setListaDeProdutos] =useState(produtos);
    const [modoEdicao,setModoEdicao] = useState(false);
    const [produtoSelecionado,setProdutoSelecionado] = useState(false);

    return(
        <>
            <Pagina>
                <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                        {
                           exibirTabela ? <h1>Tabela de Produtos</h1> : <h1>{modoEdicao ? "Alterar Produto" : "Cadastrar Produto"}</h1>
                        }
                    </Alert>
                </Container>
                {
                    exibirTabela ? <TabelaProdutos listaDeProdutos={listaDeProdutos} 
                                                    setProdutoSelecionado={setProdutoSelecionado}
                                                    setModoEdicao={setModoEdicao}
                                                    setListaDeProdutos={setListaDeProdutos}
                                                    setExibirTabela={setExibirTabela}/> : 
                                    <CadProduto listaDeProdutos={listaDeProdutos} 
                                                produtoSelecionado={produtoSelecionado}
                                                modoEdicao={modoEdicao} 
                                                setModoEdicao={setModoEdicao}
                                                setListaDeProdutos={setListaDeProdutos} 
                                                setExibirTabela={setExibirTabela}/>
                }
            </Pagina>
        </>
        
    );
}