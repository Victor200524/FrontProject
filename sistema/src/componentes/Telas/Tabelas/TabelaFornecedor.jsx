import { Button, Container, Table } from "react-bootstrap";

export default function TabelaFornecedor(props){


    return(
        <>
            <Container>
                <Button className="mb-3" variant="primary" onClick={()=>{
                    props.setExibirTabela(false);
                }}> Adicionar 
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <th>Nome</th>
                        <th>Cnpj</th>
                        <th>Email</th>
                        <th>Celular</th>
                        <th>Telefone</th>
                        <th>Cep</th>
                        <th>Uf</th>
                        <th>Numero</th>
                    </thead>
                    <tbody>
                        {
                            props.listaDeFornecedor?.map((fornecedor)=>{
                                return( 
                                <tr>
                                        <td>{fornecedor.nome}</td>
                                        <td>{fornecedor.cnpj}</td>
                                        <td>{fornecedor.email}</td>
                                        <td>{fornecedor.celular}</td>
                                        <td>{fornecedor.telefone}</td>
                                        <td>{fornecedor.cep}</td>
                                        <td>{fornecedor.uf}</td>
                                        <td>{fornecedor.numero}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}