import Pagina from "../../layouts/Pagina.jsx";
import imagem404 from "../../../assets/Imagens/imagem_erro.jpg";
import { Container } from "react-bootstrap";

export default function Tela404(props){
    return(
        <>
            <Pagina>
                <Container>
                    <img alt="" src={imagem404} />
                    <h1 className="text-center" >O recurso solicitado não existe</h1>
                </Container>
            </Pagina>
        </>
    );

}