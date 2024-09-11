import { Button, Container, Table } from "react-bootstrap";


export default function TabelaCliente(props){

    return(
        <>
            <Container>
                <Button className="mb-3" variant="primary" onClick={()=>{
                    props.setExibirTabela(false);
                }}> Adicionar</Button>
                <Table>
                    <thead>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>Celular</th>
                        <th>CEP</th>
                        <th>Estado</th>
                    </thead>
                    <tbody>
                        {
                            props.listaDeClientes?.map((clientes)=>{
                                return(
                                    <tr>
                                        <td>{clientes.nome}</td>
                                        <td>{clientes.data}</td>
                                        <td>{clientes.email}</td>
                                        <td>{clientes.cpf}</td>
                                        <td>{clientes.celular}</td>
                                        <td>{clientes.cep}</td>
                                        <td>{clientes.estado}</td>
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