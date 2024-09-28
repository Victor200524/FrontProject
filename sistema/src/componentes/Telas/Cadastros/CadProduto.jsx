import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';

export default function Produto(props){
  const [produto,setProduto] = useState({
    codigo: 0,
    descricao:"",
    precoCusto: 0.00,
    precoVenda:0.00,
    qtdEstoque:0,
    urlImagem:"",
    dataValidade:""
  });

  //Quando um produto é selecionado, faço com que preencha automaticamente as lacunas com as informações dele
  useEffect(() => {
    if (props.modoEdicao) {
        // Se estiver no modo de edição, preenche o formulário com os dados do produto selecionado
        setProduto(props.produtoSelecionado);
    } 
    }, [props.modoEdicao, props.produtoSelecionado]);

    const [formValidado,setFormValidado] = useState(false);
    
    function manipularSubmissao(evento){
        const form = evento.currentTarget;

        if(form.checkValidity()){
          if(props.modoEdicao){
            //Atualizar produto ja existente
            const listaAtualizada = props.listaDeProdutos.map((item)=>{
              return item.codigo === produto.codigo ? produto : item
            });
            props.setListaDeProdutos(listaAtualizada);
            props.setModoEdicao(false);
          }
          else //Cadastro do produto
            props.setListaDeProdutos([...props.listaDeProdutos,produto]); //Array vazio esta recebendo com itens, o conteudo dessa lista espalhada, preenchendo esse novo array
          
          //exibir tabela com o produto incluso
          props.setExibirTabela(true);
        }
        else
            setFormValidado(false);
        
        evento.preventDefault(); // vou querer o momento padrão da submissao
        evento.stopPropagation(); // vou querer parar o momento padrão da submissao
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

              <Row className="mb-3">

                <Form.Group as={Col} md="2" >
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    required
                    disabled={props.modoEdicao} // Faz com que bloqueie o codigo, para não ser alterado
                    id = "codigo"
                    name = "codigo"
                    type="int"
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
                      type="double"
                      aria-describedby="inputGroupPrepend"
                      required
                      id = "precoCusto"
                      name = "precoCusto"
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
                      aria-describedby="inputGroupPrepend"
                      required
                      id = "qtdEstoque"
                      name = "qtdEstoque"
                      value={produto.qtdEstoque}
                      onChange={manipularMudanca}
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
                    type="link"
                    required
                    id = "urlImagem"
                    name = "urlImagem"
                    value={produto.urlImagem}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type='invalid'>URL da Imagem Invalido</Form.Control.Feedback>
                <Form.Control.Feedback type='valid'>URL da Imagem Valido</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Valido até</Form.Label>
                <Form.Control 
                  type="date" 
                  required 
                  id = "dataValidade"
                  name = "dataValidade"
                  value={produto.dataValidade}
                  onChange={manipularMudanca}
                />
                <Form.Control.Feedback type='invalid'>Data Invalida</Form.Control.Feedback>
                <Form.Control.Feedback type='valid'>Data Valida</Form.Control.Feedback>

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
                  <Button variant='outline-success' type='submit'>
                    {props.modoEdicao ? "Salvar Alterações" : "Cadastrar"}
                  </Button>
              </Col>
                
                {//offset é o deslocamento
                  }
                <Col md={{offset:1}}> 
                  <Button variant='outline-success' onClick={()=>{
                    props.setExibirTabela(true);
                  }} >Voltar</Button>
                </Col>

            </Row>
          </Form>
          </Container>
        </div>
      </div>
    );
}