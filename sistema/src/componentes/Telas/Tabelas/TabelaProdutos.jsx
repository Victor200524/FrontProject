import { Button, Container, Table } from "react-bootstrap";

export default function TabelaProdutos(props){


    return (
        <>
            <Container>
                <Button className="mb-3" variant="primary" onClick={()=>{
                    props.setExibirTabela(false);
                }}>
                    Adicionar 
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Preço de Custo</th>
                        <th>Preço de Venda</th>
                        <th>Qtde em estoque</th>
                        <th>Imagem</th>
                        <th>Validade</th>
                    </thead>
                    <tbody>
                        {
                            props.listaDeProdutos?.map((produto)=>{ //A ? serve para testar se é valido ou não
                                return(
                                    <tr>
                                        <td>{produto.codigo}</td>
                                        <td>{produto.descricao}</td>
                                        <td>{produto.precoVenda}</td>
                                        <td>{produto.precoCusto}</td>
                                        <td>{produto.qtdEstoque}</td>
                                        <td><img src={produto.urlImagem} alt="foto do produto"/></td>
                                        <td>{produto.validade}</td>
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