import { Alert, Container } from "react-bootstrap";
import CadCategoria from "../Cadastros/CadCategoria.jsx";
import Pagina from "../../layouts/Pagina.jsx"
import { useEffect, useState } from "react";
import TabelaCategoria from "../Tabelas/TabelaCategoria.jsx";
import { consultarCategoria } from "../../../servicos/servicoCategorias.js";

export default function TelaCategoria(props){
    const [exibirTabela,setExibirTabela] = useState(true);
    const [listaDeCategoria,setListaDeCategoria] = useState([])
    const [modoEdicao,setModoEdicao] = useState(false);
    const [categoriaSelecionada,setCategoriaSelecionada] = useState({
        codigo: 0,
        descricao: ""
    });
    
    useEffect(()=>{
        consultarCategoria().then((lista)=>{
            setListaDeCategoria(lista);
        });
    },[]); 

    return(
        <>
            <Pagina>
                <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                    {
                            exibirTabela ? <h1>Tabela de Categorias</h1> : <h1>{modoEdicao ? "Alterar de Categorias" : "Cadastro de Categorias"}</h1>
                    }
                    </Alert>
                </Container>
                {
                    exibirTabela ? <TabelaCategoria listaDeCategorias={listaDeCategoria}
                                                    setCategoriaSelecionada={setCategoriaSelecionada}
                                                    setModoEdicao={setModoEdicao}
                                                    setListaDeCategoria={setListaDeCategoria}
                                                    setExibirTabela={setExibirTabela}/> : 
                                    <CadCategoria   listaDeCategoria={listaDeCategoria}
                                                    categoriaSelecionada={categoriaSelecionada}
                                                    setCategoriaSelecionada={setCategoriaSelecionada}
                                                    modoEdicao={modoEdicao}
                                                    setModoEdicao={setModoEdicao}
                                                    setListaDeCategoria={setListaDeCategoria}
                                                    setExibirTabela={setExibirTabela} />
                }
            </Pagina>
        </>
        
    );
}