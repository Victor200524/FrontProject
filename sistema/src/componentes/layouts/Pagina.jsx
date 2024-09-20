import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function pagina(props){

    return(
        <>
            <Cabecalho/>
            <Menu/>{ //FILHOS DAS PAGINAS ABAIXO
                props.children
            }
        </>
        
    );
}