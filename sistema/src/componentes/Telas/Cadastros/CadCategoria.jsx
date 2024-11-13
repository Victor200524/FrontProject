import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import toast from 'react-hot-toast';
import { alterarCategoria, consultarCategoria, gravarCategoria } from '../../../servicos/servicoCategorias';

export default function Categoria(props){
  const [listaCateg, setListaCateg] = useState([]);
  const [categoria,setCategoria] = useState(props.categoriaSelecionada);
  const [formValidado,setFormValidado] = useState(false);
  
  async function carregarCategorias() {
    try{
      const data = await consultarCategoria();
      setListaCateg(data);
    }catch(error){
      toast.error("Erro ao consultar a lista de categoiras: ",error);
    }
  }

  useEffect(()=>{
    carregarCategorias();
  },[]);

  function manipularSubmissao(evento){
    const form = evento.currentTarget;
    if(form.checkValidity()){
      if(!props.modoEdicao){
        gravarCategoria(categoria).then((resultado)=>{
          if(resultado.status){
            props.setExibirTabela(true);
          }
          else{
            toast.error(resultado.mensagem);
          }
        });
      }
      else{
        alterarCategoria(categoria).then((resposta)=>{
          if(resposta.status){
            props.setListaDeCategoria(props.listaDeCategoria.filter((item)=>
              item.codigo !== categoria.codigo ? item : categoria
            ));
          }
          else{
            toast.error(resposta.mensagem);
          }
        });
        props.setModoEdicao(false);
        props.setExibirTabela(true);
        carregarCategorias();
        props.setCategoriaSelecionada({
          codigo: "",
          descricao: "" 
        })
      }
    }
    else{
    setFormValidado(true);
  }
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
                  required
                  type="int"
                  id = "codigo"
                  name = "codigo"
                  value = {categoria.codigo}
                  disabled
                  onChange = {manipularMudanca}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="2">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  placeholder='Nome'
                  type="text"
                  id = "descricao"
                  name = "descricao"
                  value = {categoria.descricao}
                  onChange = {manipularMudanca}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Concordar com os termos e condições!"
                feedback="Você deve concordar antes de continuar!"
                feedbackType="invalid"
              />
            </Form.Group>

            <Row className='mt-2 mb-3'>
              <Col md={1}>
                    <Button variant='outline-success' type='submit'>
                      {props.modoEdicao ? "Alterar" : "Cadastrar"}
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