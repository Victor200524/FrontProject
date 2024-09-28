import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function Cliente(props){
  const [cliente,setCliente] = useState({
    nome:"",
    data:"",
    email:"",
    cpf:"",
    celular:"",
    cep:"",
    estado:""
  });

  useEffect(() => {
    if (props.modoEdicao) 
        setCliente(props.clienteSelecionado);

    }, [props.modoEdicao, props.clienteSelecionado]);

  const[formValidado,setFormValidado] = useState(false);

  function manipularSubmissao(evento){
    const form = evento.currentTarget;

    if(form.checkValidity()){
      if(props.modoEdicao){
        const listaAtualizada = props.listaDeCliente.map((item)=>{
          return item.cpf === cliente.cpf ? cliente : item
        });
        props.setListaDeCliente(listaAtualizada);
        props.setModoEdicao(false);
      }
      else
        props.setListaDeCliente([...props.listaDeCliente,cliente]);
      
      props.setExibirTabela(true);
      }
    else
      setFormValidado(true);

    evento.preventDefault();
    evento.stopPropagation();
  }

  function manipularMudanca(evento){
    const elemento = evento.target.name;
    const valor = evento.target.value;
    setCliente({...cliente,[elemento]:valor});
  }

    return(
      <div>
        <div>
          <Container>
            <Form noValidate validate={formValidado} onSubmit={manipularSubmissao}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nome"
                    id = "nome"
                    name = "nome"
                    value = {cliente.nome}
                    onChange = {manipularMudanca}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    required
                    type="Date"
                    id = "data"
                    name = "data"
                    value = {cliente.data}
                    onChange = {manipularMudanca}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>E-mail</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      required
                      id = "email"
                      name = "email"
                      value = {cliente.email}
                      onChange = {manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a e-mail.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row className="mb-3">

                <Form.Group as={Col} md="6">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="123.456.789-00"
                    id = "cpf"
                    name = "cpf"
                    value = {cliente.cpf}
                    onChange = {manipularMudanca}
                  />  
                  <Form.Control.Feedback type='invalid'>CPF Invalido</Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>CPF Valido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="(99) 99999-9999" 
                    required 
                    id = "celular"
                    name = "celular"
                    value = {cliente.celular}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback type='invalid'>Celular Invalido</Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>Celular Valido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="12345-678" 
                    required 
                    id = "cep"
                    name = "cep"
                    value = {cliente.cep}
                    onChange = {manipularMudanca}
                  />
                  <Form.Control.Feedback type='invalid'>CEP Invalido</Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>CEP Valido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>UF</Form.Label>
                  <Form.Control 
                    as="select" // Define o tipo como um campo de seleção
                    required 
                    type = "text"
                    id = "uf"
                    name = "uf"
                    value = {cliente.uf}
                    onChange={manipularMudanca}>

                    <option value="">Selecione o estado</option> {/* Placeholder */}
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>Informe o Estado!</Form.Control.Feedback>
                <Form.Control.Feedback type='valid'>Estado Valido</Form.Control.Feedback>
                </Form.Group>
              </Row>

            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Concordar com os termos e condições!"
                feedback="Você deve concordar antes de Enviar!"
                feedbackType="invalid"
              />
            </Form.Group>

            <Row className='mt-2 mb-3'>
              <Col md={1}>
                  <Button variant='outline-success' type='submit'>
                    {props.modoEdicao ? "Salvar Alterações" : "Cadastrar"}
                  </Button>
              </Col>
                  
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