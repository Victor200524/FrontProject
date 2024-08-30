import Cabecalho from "./cabecalho";
import Menu from "./menu";

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