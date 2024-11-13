import Pagina from "../../layouts/Pagina.jsx";
import { Container,Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import TabelaProdutos from "../Tabelas/TabelaProdutos.jsx";
import CadProduto from "../Cadastros/CadProduto.jsx";
import { consultarProduto } from "../../../servicos/servicoProduto.js";

export default function TelaProduto(props){
    const [exibirTabela,setExibirTabela]= useState(true);
    const [listaDeProdutos,setListaDeProdutos] =useState([]);
    const [modoEdicao,setModoEdicao] = useState(false);
    const [produtoSelecionado,setProdutoSelecionado] = useState({
        codigo: 0,
        descricao: "",
        precoCusto: 0,
        precoVenda: 0,
        qtdEstoque: 0,
        urlImagem: "",
        dataValidade: "",
        categoria: {}
    });

    useEffect(()=>{
        consultarProduto().then((lista)=>{
            setListaDeProdutos(lista);
        });
    },[]); //listaVazia -> didMount

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
                                                setListaDeProdutos={setListaDeProdutos} 
                                                setExibirTabela={setExibirTabela}
                                                produtoSelecionado={produtoSelecionado}
                                                setProdutoSelecionado={setProdutoSelecionado}
                                                modoEdicao={modoEdicao} 
                                                setModoEdicao={setModoEdicao}/>
                }
            </Pagina>
        </>
        
    );
}