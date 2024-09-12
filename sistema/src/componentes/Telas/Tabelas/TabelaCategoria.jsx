import { Button, Container, Table } from "react-bootstrap";

export default function TabelaCategoria(props){

    return(
        <>
            <Container>
                <Button className="mb-3" variant="primary" onClick={()=>{
                    props.setExibirTabela(false);
                }}> Adicionar </Button>
                <Table striped bordered hover>
                    <thead>
                        <th>Nome</th>
                        <th>Tipo</th>
                    </thead>
                    <tbody>
                        {
                            props.listaDeCategoria?.map((categoria)=>{
                                return(
                                    <tr>
                                        <td>{categoria.nome}</td>
                                        <td>{categoria.tipo}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}