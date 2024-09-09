import { Alert, Container } from "react-bootstrap";
import Categoria from "./Cadastros/CadCategoria.jsx";
import Pagina from "../layouts/Pagina.jsx"
export default function TelaCategoria(props){

    return(
        <>
            <Pagina>
                <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                        <h1>Cadastro de Categoria</h1>
                    </Alert>
                </Container>
                
                <Categoria/>
            </Pagina>
        </>
        
    );
}