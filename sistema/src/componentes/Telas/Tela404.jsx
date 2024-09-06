import Pagina from "../layouts/Pagina.jsx";
import imagem404 from "../../assets/Imagens/imagem_erro.jpg";

export default function Tela404(props){
    return(
        <>
            <img src={imagem404} />
            <h1 className="text-center" >O recurso solicitado não existe</h1>
        </>
    );

}