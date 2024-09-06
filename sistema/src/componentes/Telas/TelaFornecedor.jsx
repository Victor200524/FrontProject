import Fornecedor from "../Cadastros/CadFornecedor.jsx";
import Pagina from "../layouts/Pagina.jsx";
import { Container,Alert } from "react-bootstrap";

export default function TelaFornecedor(props){

    return(
        <>
            <Pagina>
                <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                        <h1>Cadastro de Fornecedor</h1>
                    </Alert>
                </Container>
                <Fornecedor/>
            </Pagina>
        </>
        
    );
}