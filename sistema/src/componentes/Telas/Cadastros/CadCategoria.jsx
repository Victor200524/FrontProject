import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Categoria(props){
  const [categoria,setCategoria] = useState({
    id: 0,
    nome: "",
    tipo:""
  });
  const[formValidado,setFormValidado] = useState(false);
  
  useEffect(()=>{
    if(props.modoEdicao)
      setCategoria(props.categoriaSelecionada);
  },[props.modoEdicao, props.categoriaSelecionada]);


  function manipularSubmissao(evento){
    const form = evento.currentTarget;

    if(form.checkValidity()){
      if(props.modoEdicao){
        const listaAtualizada = props.listaDeCategoria.map((item)=>{
          return item.id === categoria.id ? categoria : item
        });
        props.setListaDeCategoria(listaAtualizada);
        props.setModoEdicao(false);
      }
      else  
        props.setListaDeCategoria([...props.listaDeCategoria,categoria]);
    
      props.setExibirTabela(true)
    }
    else  
      setFormValidado(true);

    evento.preventDefault();
    evento.stopPropagation();
  }

  function manipularMudanca(evento){
    const elemento = evento.target.name;
    const valor = evento.target.value;
    setCategoria({...categoria,[elemento]:valor});
  }

    return(
      <div>
        <div>
          <Container>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
            <Form.Group as={Col} md="2">
                <Form.Label>Codigo</Form.Label>
                <Form.Control
                  disabled={props.modoEdicao}
                  required
                  type="text"
                  id = "id"
                  name = "id"
                  value = {categoria.id}
                  onChange = {manipularMudanca}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="2">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  placeholder='Nome'
                  required
                  type="text"
                  id = "nome"
                  name = "nome"
                  value = {categoria.nome}
                  onChange = {manipularMudanca}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  placeholder='Tipo'
                  required
                  type="text"
                  id = "tipo"
                  name = "tipo"
                  value = {categoria.tipo}
                  onChange = {manipularMudanca}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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