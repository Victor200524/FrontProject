import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

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

    const [formValidado,setFormValidado] = useState(false);
    function manipularSubmissao(evento){
        const form = evento.currentTarget;

        if(form.checkValidity()){
            //Cadastro do produto
            props.listaDeProdutos.push(produto);
            
            //exibir tabela com o produto incluso
            props.setExibirTabela(true);
        }
        else{
            setFormValidado(true);
        }
        evento.preventDefault(); // vou querer o momento padrão da submissao
        evento.stopPropagation(); // vou querer parar o momento padrão da submissao
    }
    function manipularMudanca(evento){
      const elemento = evento.target.name;
      const valor = evento.target.value;
      setProduto({...produto,[elemento]:valor}); // {...produto} -> é um sprad, onde ele é um espalhador, onde ele despeja o conteudo desse objeto para um novo objeto
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
                  id = "codigo"
                  name = "codigo"
                  type="int"
                  value={produto.codigo}
                  onChange={manipularMudanca}
                />
                <Form.Control.Feedback type='invalid'>Código Invalido</Form.Control.Feedback>
                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
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
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    Please choose a e-mail.
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    Please choose a e-mail.
                  </Form.Control.Feedback>
                </InputGroup>
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
                  <Form.Control.Feedback type="invalid">
                    Please choose a e-mail.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="9">
                <Form.Label>URL da imagem</Form.Label>
                <Form.Control
                    type="link"
                    required
                    id = "urlImagem"
                    name = "urlImagem"
                    value={produto.urlImagem}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Concordar com os termos e condições!"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Row className='mt-2 mb-3'>
                <Col md={1}>
                  <Button variant='outline-success' type='submit'>Cadastrar</Button>
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