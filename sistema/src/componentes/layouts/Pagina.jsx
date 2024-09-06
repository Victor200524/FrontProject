import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function pagina(props){

    return(
        <>
            <Cabecalho titulo="Sistema de Controle Gerencial" />
            <Menu/>{ //FILHOS DAS PAGINAS ABAIXO
                props.children
            }
        </>
        
    );
}