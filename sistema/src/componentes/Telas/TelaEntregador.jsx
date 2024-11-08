import { useState } from "react";
import { listaEntregadores } from "../../dados/mockEntregador";
import Pagina from "../layouts/Pagina";
import { Container } from "react-bootstrap";
import { Alert } from "react-bootstrap";    
import TabelaEntregador from "./Tabelas/TabelaEntregador";
import CadEntregador from "./Cadastros/CadEntregador";

export default function TelaEntregador(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaEntregador, setListaEntregador] = useState(listaEntregadores);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [entregadorSelecionado, setEntregadorSelecionado] = useState(false); ;

    return (
        <>
            <Pagina>
                <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                        {exibirTabela ? <h1>Tabela Entregadores</h1> : <h1>{modoEdicao ? "Alterar Entregador" : "Cadastrar Entregador"}</h1>}
                    </Alert>
                    {exibirTabela ? (
                        <TabelaEntregador
                            listaEntregador={listaEntregador}
                            setEntregadorSelecionado={setEntregadorSelecionado}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            setListaEntregador={setListaEntregador}
                            setExibirTabela={setExibirTabela}
                        />
                    ) : (
                        <CadEntregador
                            setModoEdicao={setModoEdicao}
                            modoEdicao={modoEdicao}
                            listaEntregador={listaEntregador}
                            setListaEntregador={setListaEntregador}
                            setExibirTabela={setExibirTabela}
                            setEntregadorSelecionado={setEntregadorSelecionado}
                            entregadorSelecionado={entregadorSelecionado} 
                        />
                    )}
                </Container>
            </Pagina>
        </>
    );
}
