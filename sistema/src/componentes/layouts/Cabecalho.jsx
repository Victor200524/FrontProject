import { Alert } from "react-bootstrap";

export default function Cabecalho(props){
    //método render
    return(
        <Alert className={" text-center"} variant="dark">
            
            <h1>Sistema de Controle Gerencial</h1>
        
        </Alert>
    );
}