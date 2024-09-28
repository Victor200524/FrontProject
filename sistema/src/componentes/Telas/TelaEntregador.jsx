import { useState } from "react"
import { listaEntregadores } from "../../dados/mockEntregador";
import Pagina from "../../componentes/layouts/Pagina";
import { Container } from "react-bootstrap/lib/Tab";
import { Alert } from "react-bootstrap";
import TabelaEntregador from "./Tabelas/TabelaEntregador";
import CadEntregador from "../Telas/Cadastros/CadEntregador";

export default function TelaEntregador(props){
    const [exibirTabela,setExibirTabela] = useState(true);
    const [listaEntregador,setListaEntregador] = useState(listaEntregadores);
    const [modoEdicao,setModoEdicao] = useState(false);
    const [EntregadorSelecionado,setEntregadorSelecionado] = useState(false);

    return(
        <>
            <Pagina>
                <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                        {
                            exibirTabela ? <h1> "Tabela Entregadores"</h1> : <h1>{modoEdicao ? "Alterar Entregador" : "Cadastrar Entregador"}</h1>
                        }
                    </Alert>
                    {
                        exibirTabela ? <TabelaEntregador    listaEntregador={listaEntregador}
                                                            setEntregadorSelecionado={setEntregadorSelecionado}
                                                            setModoEdicao={setModoEdicao}
                                                            setListaEntregador={setListaEntregador}
                                                            setExibirTabela={setExibirTabela}/> : 
                                       <CadEntregador   setModoEdicao={setModoEdicao}
                                                        modoEdicao={modoEdicao}
                                                        listaEntregador={listaEntregador}
                                                        setListaEntregador={setListaEntregador}
                                                        setExibirTabela={setExibirTabela}
                                                        EntregadorSelecionado={EntregadorSelecionado}/>
                    }
                </Container>
            </Pagina>        
        </>
    )
}