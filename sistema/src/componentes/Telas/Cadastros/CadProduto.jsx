import { Container, Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { alterarProduto, gravarProduto, consultarProduto } from '../../../servicos/servicoProduto';
import toast, { Toaster } from 'react-hot-toast';
import { consultarCategoria } from '../../../servicos/servicoCategorias';

export default function Produto(props) {
  const [listaProd,setListaProd] = useState([]);
  const [produto, setProduto] = useState(props.produtoSelecionado);
  const [formValidado, setFormValidado] = useState(false);
  const [categorias, setCategoria] = useState([]);
  const [temCategoria, setTemCategoria] = useState(false);

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
    setProduto({ ...produto, categoria: { codigo: evento.currentTarget.value } });
  }

  function manipularSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        gravarProduto(produto).then((resultado) => {
          if (resultado.status) {
            props.setExibirTabela(true);
          } 
          else {
            toast.error(resultado.mensagem);
          }
        });
      } 
      else {
        alterarProduto(produto).then((resposta) => {
          if (resposta.status) {
            props.setListaDeProdutos(props.listaDeProdutos.filter((item) => 
              item.codigo !== produto.codigo ? item : produto));
          } 
          else {
            toast.error(resposta.mensagem);
          }
        });
        //voltar para o modo de inclusão
        carregarProdutos();
        props.setModoEdicao(false);
        props.setExibirTabela(true);
        props.setProdutoSelecionado({
            codigo: "",
            descricao: "",
            precoCusto: "",
            precoVenda: "",
            qtdEstoque: "",
            urlImagem: "",
            dataValidade: "",
            categoria: {}
        });
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
    const valor = evento.target.value;
    setProduto({ ...produto, [elemento]: valor });
  }

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
                value={produto.codigo}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">Código Inválido</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">Código Válido</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                required
                placeholder="Descrição"
                type="text"
                id="descricao"
                name="descricao"
                value={produto.descricao}
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
                  value={produto.precoCusto}
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
                  value={produto.precoVenda}
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
                  value={produto.qtdEstoque}
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
                value={produto.urlImagem}
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
                name="dataValidade"
                value={produto.dataValidade}
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
                value={produto.categoria?.codigo}
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
        <Toaster />
      </Container>
    </div>
  );
}