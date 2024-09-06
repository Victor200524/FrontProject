import Cliente from "../Cadastros/CadCliente.jsx";
import Pagina from "../layouts/Pagina.jsx"
import { Container,Alert } from "react-bootstrap";


export default function TelaCliente(props){

    return(
        <>
            <Pagina>
            <Container>
                    <Alert className="mt-02 mb-02 success text-center" variant="dark">
                        <h1>Cadastro de Cliente</h1>
                    </Alert>
                </Container>
                <Cliente/>
            </Pagina>
        </>
        
    );
}