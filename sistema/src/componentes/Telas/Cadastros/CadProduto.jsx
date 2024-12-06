import { Container, Button, Col, Form, InputGroup, Row, Spinner, Alert } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { alterarProduto, consultarProduto } from '../../../servicos/servicoProduto';
import toast, { Toaster } from 'react-hot-toast';
import { consultarCategoria } from '../../../servicos/servicoCategorias';
import { useSelector, useDispatch } from 'react-redux';
import { incluirProduto, atualizarProduto } from '../../../redux/produtoReducer';
import ESTADO from '../../../redux/estados';

export default function Produto(props) {
  const [listaProd,setListaProd] = useState([]);
  const [formValidado, setFormValidado] = useState(false);
  const [categorias, setCategoria] = useState([]);
  const [temCategoria, setTemCategoria] = useState(false);
  const {estado, mensagem, listaDeProdutos} = useSelector((state)=>state.produto);
  const [mensagemExibida, setMensagemExibida] = useState("");
  const despachante = useDispatch();

  // Ao usar REDUX, as categorias não serão recuperadas diretamente do BACKEND (Meio da camada de serviço) e sim acessando o estado da aplicação, particularmente da fatia categorias (categoriaSlicer)
  //const = {status,mensagem,listaDeCategorias useSelector((state)=> {state.categoria})}
  //Proposito de recuperar de um unico ponto central, as informações/dados/registros da aplicação
  async function carregarProdutos() {
    try {
      const data = await consultarProduto();  // listagem de produtos
      setListaProd(data);
    } catch (error) {
        toast.error("Erro ao consultar a lista de produtos: ",error);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  useEffect(() => {
    consultarCategoria()
      .then((resultado) => {
        if (Array.isArray(resultado)) {
          setCategoria(resultado);
          setTemCategoria(true);
        } else {
          toast.error("Não foi possível carregar as categorias");
        }
      })
      .catch((erro) => {
        setTemCategoria(false);
        toast.error("Não foi possível carregar as categorias ", erro);
      });
  }, []);

  function selecionarCategoria(evento) {
    props.setProduto({ ...props.produto, categoria: { codigo: evento.currentTarget.value } });
  }

  function manipularSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      //produto.dataValidade = produto.dataValidade.toLocaleDateString();
      if (!props.modoEdicao) {
        //cadastrar produto
        despachante(incluirProduto(props.produto));
        setMensagemExibida(mensagem);
        setTimeout(()=>{
          setMensagemExibida("");
          props.setProduto({
            codigo: "",
            descricao: "",
            precoCusto: 0,
            precoVenda: 0,
            qtdEstoque: 0,
            urlImagem: "",
            dataValidade: "",
            categoria: {}
          });
          props.setExibirTabela(true);
        },5000)
      } 
      else {
        despachante(atualizarProduto(props.produto));
        setMensagemExibida(mensagem);
        carregarProdutos();
        setTimeout(()=>{
            props.setModoEdicao(false);
            props.setProduto({
              codigo: "",
              descricao: "",
              precoCusto: 0,
              precoVenda: 0,
              qtdEstoque: 0,
              urlImagem: "",
              dataValidade: "",
              categoria: {}
            });
            props.setExibirTabela(true);
        },5000)
      }
    } 
    else {
      setFormValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }


  function manipularMudanca(evento) {
    const elemento = evento.target.name;
    let valor = evento.target.value;

    if (evento.target.type === "date") {
        valor = new Date(valor).toISOString(); // Converte a data para um formato ISO válido.
    }

    props.setProduto({ ...props.produto, [elemento]: valor });
  }

  if(estado === ESTADO.PENDENTE){
    return (
      <>
          <Spinner animation="border" role="status"> <span className="visually-hidden">Loading...</span> </Spinner>
          <Alert variant="primary">{mensagem}</Alert>
        </>
      );
  }
  else if(estado === ESTADO.ERRO){
    return(
      <>
        <Alert variant="danger">{mensagem}</Alert>
        <Button type="button" variant="secondary" onClick={() => {props.setExibirTabela(true); props.setModoEdicao(false);}}>Voltar</Button>
      </>
    );
  }
  else{
      return (
        <div>
          <Container>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
              <Row className="mb-4">
                <Form.Group as={Col} md="4">
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    required
                    id="codigo"
                    name="codigo"
                    type="int"
                    disabled
                    value={props.produto.codigo}
                    onChange={manipularMudanca}
                  />
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    required
                    placeholder="Descrição"
                    type="text"
                    id="descricao"
                    name="descricao"
                    value={props.produto.descricao}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback type="invalid">Descrição Inválida</Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">Descrição Válida</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Preço de Custo</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
                    <Form.Control
                      required
                      type="number"
                      id="precoCusto"
                      name="precoCusto"
                      value={props.produto.precoCusto}
                      onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Preço de Custo Inválido</Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Preço de Custo Válido</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Preço de Venda</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      id="precoVenda"
                      name="precoVenda"
                      value={props.produto.precoVenda}
                      onChange={manipularMudanca}
                      required
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">Preço de Venda Inválido</Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">Preço de Venda Válido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Estoque</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">+</InputGroup.Text>
                    <Form.Control
                      type="number"
                      id="qtdEstoque"
                      name="qtdEstoque"
                      value={props.produto.qtdEstoque}
                      onChange={manipularMudanca}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Estoque Inválido</Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Estoque Válido</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="9">
                  <Form.Label>URL da Imagem</Form.Label>
                  <Form.Control
                    required
                    type="url"
                    id="urlImagem"
                    name="urlImagem"
                    value={props.produto.urlImagem}
                    onChange={manipularMudanca}
                    placeholder="https://...."
                  />
                  <Form.Control.Feedback type="invalid">URL da Imagem Inválida</Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">URL da Imagem Válida</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>Válido até</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    id="dataValidade"
                    value={props.produto.dataValidade ? props.produto.dataValidade.substr(0, 10) : ""} 
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback type="invalid">Data Inválida</Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">Data Válida</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md={7}>
                  <Form.Label>Categoria:</Form.Label>
                  <Form.Select
                    id="categorias"
                    name="categorias"
                    onChange={selecionarCategoria}
                    value={props.produto.categoria.codigo}
                  >
                    <option value="" disabled>Selecione uma categoria</option>
                    {categorias.map((categoria) => {
                      return <option value={categoria.codigo}>{categoria.descricao}</option>
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md={1}>
                  {!temCategoria && <Spinner className="mt-4" animation="border" variant="success" />}
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

              <Row className="mt-2 mb-3">
                <Col md={1}>
                  <Button type="submit" disabled={!temCategoria}>{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={1}>
                  <Button type="button" variant="secondary" onClick={() => props.setExibirTabela(true)}>Voltar</Button>
                </Col>
              </Row>
            </Form>
            {
              mensagemExibida ? <Alert variant='sucess'>{mensagem}</Alert> : ""
            }
            <Toaster position='top-right'/>
          </Container>
        </div>
      );
    } //ELSE IF OCIOSO
    
}