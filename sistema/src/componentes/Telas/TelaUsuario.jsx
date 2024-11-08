import { useState } from "react";
import { usuarios } from "../../dados/mockUsuario.js";
import Pagina from "../layouts/Pagina.jsx";
import { Alert, Container } from "react-bootstrap";
import TabelaUsuario from "./Tabelas/TabelaUsuario.jsx";
import CadUsuario from "./Cadastros/CadUsuario.jsx";

export default function TelaUsuario(props){
    const [exibirTabela,setExibirTabela] = useState(true);
    const [listaDeUsuario,setListaDeUsuario] = useState(usuarios);
    const [modoEdicao,setModoEdicao] = useState(false);
    const [usuarioSelecionado,setUsuarioSelecionado] = useState(false);
   
    return(
        <>
            <Pagina>
                <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark" >
                        {
                            exibirTabela ? <h1>Tabela de Usuarios</h1> : <h1>{modoEdicao ? "Alterar Usuario" : "Cadastrar Usuario"}</h1>
                        }
                    </Alert>
                </Container>
                {
                    exibirTabela ? <TabelaUsuario   listaDeUsuario = {listaDeUsuario}
                                                    setUsuarioSelecionado = {setUsuarioSelecionado}
                                                    setModoEdicao = {setModoEdicao}
                                                    setListaDeUsuario = {setListaDeUsuario}
                                                    setExibirTabela = {setExibirTabela}/> :
                                    <CadUsuario listaDeUsuario = {listaDeUsuario}
                                                usuarioSelecionado = {usuarioSelecionado}
                                                modoEdicao = {modoEdicao}
                                                setModoEdicao = {setModoEdicao}
                                                setListaDeUsuario = {setListaDeUsuario}
                                                setExibirTabela = {setExibirTabela}/>
                }
            </Pagina>
        
        </>
   ) 
}