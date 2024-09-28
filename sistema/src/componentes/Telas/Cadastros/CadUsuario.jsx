import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function CadUsuario(props){
    const [usuario,setUsuario] = useState({
        codigo: 0,
        nome:"",
        senha: "",
        tipo: "",
        email: ""
    })

    useEffect(()=>{
        if(props.modoEdicao)
            setUsuario(props.usuarioSelecionado);
    }, [props.modoEdicao, props.usuarioSelecionado]);    

    const [formValidado,setFormValidado] = useState(false);

    function manipularSubmissao(evento){
        const form = evento.currentTarget;

        if(form.checkValidity()){
            if(props.modoEdicao){
                const listaAtualizada = props.listaDeUsuario.map((item)=>{
                    return item.codigo === usuario.codigo ? usuario : item
                });
                props.setListaDeUsuario(listaAtualizada);
                props.setModoEdicao(false);
            }
            else
                props.setListaDeUsuario([...props.listaDeUsuario,usuario]);
            
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
      setUsuario({...usuario,[elemento]:valor}); 
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
                    value={usuario.codigo}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback type='invalid'>Nome Invalido</Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>Nome Valido</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="2" >
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    required
                    id = "nome"
                    name = "nome"
                    type="int"
                    value={usuario.nome}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback type='invalid'>Nome Invalido</Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>Nome Valido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    placeholder='Senha'
                    required
                    type="text"
                    id = "senha"
                    name = "senha"
                    value={usuario.descricao}
                    onChange={manipularMudanca}
                  />
                <Form.Control.Feedback type='invalid'>Senha Invalido</Form.Control.Feedback>
                <Form.Control.Feedback type='valid'>Senha Valida</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="2" >
                  <Form.Label>Tipo</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      as="select"
                      type="double"
                      aria-describedby="inputGroupPrepend"
                      required
                      id = "tipo"
                      name = "tipo"
                      value={usuario.tipo}
                      onChange={manipularMudanca}
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="AD">Administrador</option>
                      <option value="NL">Normal</option>
                      <option value="VS">Visitante</option>
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>Preço de Custo Invalido</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Preço de Custo Valido</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>E-mail</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      placeholder="E-mail"
                      type="text"
                      id = "email"
                      name = "email"
                      value={usuario.email}
                      onChange={manipularMudanca}
                      required
                    />
                  <Form.Control.Feedback type='invalid'>E-mail Invalido</Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>E-mail Valido</Form.Control.Feedback>
                  </InputGroup>
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