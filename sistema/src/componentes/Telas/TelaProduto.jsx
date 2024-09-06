import Produto from "../Cadastros/CadProduto";
import Pagina from "../layouts/Pagina.jsx";
import { Container,Alert } from "react-bootstrap";
export default function TelaProduto(props){

    return(
        <>
            <Pagina>
            <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                        <h1>Cadastro de Produto</h1>
                    </Alert>
                </Container>
                <Produto/>
            </Pagina>
        </>
        
    );
}