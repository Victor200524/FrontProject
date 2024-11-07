import { Container,Button,Col,Form,InputGroup,Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { alterarProduto, gravarProduto} from '../../../servicos/servicoProduto';
import toast, { Toaster } from 'react-hot-toast';
import { consultarCategoria } from '../../../servicos/servicoCategorias';

export default function Produto(props){
  const [produto,setProduto] = useState(props.produtoSelecionado);
  const [formValidado,setFormValidado] = useState(false);
  const [categoria, setCategoria] = useState([]);
  const [temCategoria,setTemCategoria] = useState(false);


  useEffect(()=>{
    consultarCategoria().then((resultado)=>{
      if(Array.isArray(resultado)){
        setCategoria(resultado);
        setTemCategoria(true);
      }
      else
        toast.error("Não foi possivel carregar as categorias");
    }).catch((erro)=>{
        setTemCategoria(false);
        toast.error("Não foi possivel carregar as categorias");
    });
  },[]); //didMount

  function selecionarCategoria(evento){
    setProduto({...produto,categoria:{codigo: evento.currentTarget.value}});
  }

  //Quando um produto é selecionado, faço com que preencha automaticamente as lacunas com as informações dele
  // useEffect(() => {
  //   if (props.modoEdicao) {
  //       // Se estiver no modo de edição, preenche o formulário com os dados do produto selecionado
  //       setProduto(props.produtoSelecionado);
  //   } 
  //   }, [props.modoEdicao, props.produtoSelecionado]);

  // function manipularSubmissao(evento){
  //     const form = evento.currentTarget;

  //     if(form.checkValidity()){
  //       if(props.modoEdicao){
  //         //Atualizar produto ja existente
  //         const listaAtualizada = props.listaDeProdutos.map((item)=>{
  //           return item.codigo === produto.codigo ? produto : item
  //         });
  //         props.setListaDeProdutos(listaAtualizada);
  //         props.setModoEdicao(false);
  //       }
  //       else //Cadastro do produto
  //         props.setListaDeProdutos([...props.listaDeProdutos,produto]); //Array vazio esta recebendo com itens, o conteudo dessa lista espalhada, preenchendo esse novo array
        
  //       //exibir tabela com o produto incluso
  //       props.setExibirTabela(true);
  //     }
  //     else
  //         setFormValidado(true);
      
  //     evento.preventDefault(); // vou querer o momento padrão da submissao
  //     evento.stopPropagation(); // vou querer parar o momento padrão da submissao
  // }
    
    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if(form.checkValidity()){
          if(!props.modoEdicao){
            //cadastrar produto
            gravarProduto(produto).then((resultado)=>{
              if(resultado.status){
                  //exibir tabela com o produto incluido
                  props.setExibirTabela(true);
              }
              else
                toast.error(resultado.mensagem);
            });
          }
          else{
            //editar o produto e altera a ordem dos registros
            // props.setListaDeProdutos([...props.listaDeProdutos.filter((item)=>{
            //   return item.codigo !== produto.codigo;
            // }),produto]);

            //não altera a ordem dos registros
            props.setListaDeProdutos(props.listaDeProdutos.map((item)=>{
              if(item.codigo !== produto.codigo)
                  return item;
              else
                  return produto;
            }));

            //voltar para o modo de inclusão
            props.setModoEdicao(false);
            props.setProdutoSelecionado({
              codigo: 0,
              descricao: "",
              precoCusto: 0,
              precoVenda: 0,
              qtdEstoque: 0,
              urlImagem: "",
              dataValidade: ""
            });
            alterarProduto(produto).then((resultado)=>{
              if(resultado.codigo !== produto.codigo)
                return resultado;
              else
                return produto;
            })
            props.setExibirTabela(true);
          }
        }
        else
          setFormValidado(true);
        evento.preventDefault();
        evento.stopPropagation();
    }


    function manipularMudanca(evento){
      const elemento = evento.target.name;
      const valor = evento.target.value;
      setProduto({...produto,[elemento]:valor}); //{...produto} -> é um sprad, onde ele é um espalhador, onde ele despeja o conteudo desse objeto para um novo objeto
    }  

    return(
      <div>
        <div>
          <Container>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>

              <Row className="mb-4">

                <Form.Group as={Col} md="4">
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    required
                    id = "codigo"
                    name = "codigo"
                    type="int"
                    disabled={props.modoEdicao} // Faz com que bloqueie o codigo, para não ser alterado
                    value={produto.codigo}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback type='invalid'>Código Invalido</Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>Codigo Valido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    required
                    placeholder='Descrição'
                    type="text"
                    id = "descricao"
                    name = "descricao"
                    value={produto.descricao}
                    onChange={manipularMudanca}
                  />
                <Form.Control.Feedback type='invalid'>Descrição Invalido</Form.Control.Feedback>
                <Form.Control.Feedback type='valid'>Descrição Valida</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="2" >
                  <Form.Label>Preço de Custo</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
                    <Form.Control
                      required
                      type="double"
                      id = "precoCusto"
                      name = "precoCusto"
                      aria-describedby="precoCusto"
                      value={produto.precoCusto}
                      onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Preço de Custo Invalido</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Preço de Custo Valido</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Preço de de Venda</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
                    <Form.Control
                      type="double"
                      id = "precoVenda"
                      name = "precoVenda"
                      aria-describedby="precoVenda"
                      value={produto.precoVenda}
                      onChange={manipularMudanca}
                      required
                    />
                  </InputGroup>
                  <Form.Control.Feedback type='invalid'>Preço de Venda Invalido</Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>Preço de Venda Valido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Estoque</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">+</InputGroup.Text>
                    <Form.Control
                      type="int"
                      id = "qtdEstoque"
                      name = "qtdEstoque"
                      aria-describedby="qtdEstoque"
                      value={produto.qtdEstoque}
                      onChange={manipularMudanca}
                      required
                    />
                    <Form.Control.Feedback type='invalid'>E-mail Invalido</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>E-mail Valido</Form.Control.Feedback>
                  </InputGroup>

                </Form.Group>

              </Row>

            <Row className="mb-3">

              <Form.Group as={Col} md="9">

                <Form.Label>URL da Imagem</Form.Label>
                <Form.Control
                    required
                    type="link"
                    id = "urlImagem"
                    name = "urlImagem"
                    value={produto.urlImagem}
                    onChange={manipularMudanca}
                    placeholder='https://....'
                />
                <Form.Control.Feedback type='invalid'>URL da Imagem Invalido</Form.Control.Feedback>
                <Form.Control.Feedback type='valid'>URL da Imagem Valido</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Valido até</Form.Label>
                <Form.Control 
                  required 
                  type="date" 
                  id = "dataValidade"
                  name = "dataValidade"
                  value={produto.dataValidade}
                  onChange={manipularMudanca}
                />
                <Form.Control.Feedback type='invalid'>Data Invalida</Form.Control.Feedback>
                <Form.Control.Feedback type='valid'>Data Valida</Form.Control.Feedback>

              </Form.Group>

              <Form.Group as={Col} md={7}>
                  <Form.Label>Categoria:</Form.Label>
                  <Form.Select id='categoria' name='categoria' onChange={selecionarCategoria}>
                      { //criar em tempo de execução as categorias existentes no banco de dados
                        categoria.map((categoria)=>{
                          return <option value={categoria.codigo}>
                                  {categoria.descricao}
                                </option>
                        })
                      }
                  </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md={1}>
                {
                  !temCategoria ? <Spinner className='mt-4' animation="border" variant="success"/> : ""
                }
              </Form.Group>

            </Row>

            <Form.Group className="mb-3">

              <Form.Check
                required
                label="Concordar com os termos e condições!"
                feedback="Você deve concordar antes de enviar!"
                feedbackType="invalid"
              />

            </Form.Group>

            <Row className='mt-2 mb-3'>

              <Col md={1}>
                <Button type="submit" disabled={!temCategoria}>{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
              </Col>

              <Col md={{offset:1}}>
                <Button onClick={()=>{props.setExibirTabela(true);}}>Voltar</Button>
              </Col>

            </Row>
            <Toaster position="top-right" />
          </Form>
          </Container>
        </div>
      </div>
    );
}