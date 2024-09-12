import { Alert, Container } from "react-bootstrap";
import CadCategoria from "./Cadastros/CadCategoria.jsx";
import Pagina from "../layouts/Pagina.jsx"
import { useState } from "react";
import TabelaCategoria from "./Tabelas/TabelaCategoria.jsx";
import { categorias } from "../../dados/mockCategoria.js";
export default function TelaCategoria(props){
    const [exibirTabela,setExibirTabela] = useState(true);

    return(
        <>
            <Pagina>
                <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                    {
                            exibirTabela ? <h1>Tabela de Categorias</h1> : <h1>Cadastro de Categorias</h1>
                    }
                    </Alert>
                </Container>
                {
                    exibirTabela ? <TabelaCategoria listaDeCategoria={categorias} setExibirTabela={setExibirTabela}/> : <CadCategoria setExibirTabela={setExibirTabela}/>
                }
            </Pagina>
        </>
        
    );
}