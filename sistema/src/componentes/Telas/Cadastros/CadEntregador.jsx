import { useState } from "react";

export default function Entregador(){
    const [entregador,setEntregador] = useState({
        "codigo": 0,
        "nome": "",
        "cnh": "",
        "veiculo": "",
        "placaVeiculo": "",
        "capacidade": 0
    });

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
                      value={entregador.codigo}
                      onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Código Invalido</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Codigo Valido</Form.Control.Feedback>
                  </Form.Group>
  
                  <Form.Group as={Col} md="4">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id = "nome"
                      name = "nome"
                      value={entregador.nome}
                      onChange={manipularMudanca}
                    />
                  <Form.Control.Feedback type='invalid'>Nome Invalido</Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>Nome Valida</Form.Control.Feedback>
                  </Form.Group>
  
                  <Form.Group as={Col} md="2" >
                    <Form.Label>CNH</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
                      <Form.Control
                        type="text"
                        aria-describedby="inputGroupPrepend"
                        required
                        id = "precoCusto"
                        name = "precoCusto"
                        value={entregador.cnh}
                        onChange={manipularMudanca}
                        placeholder='00000000000'
                      />
                      <Form.Control.Feedback type='invalid'>CNH Invalido</Form.Control.Feedback>
                      <Form.Control.Feedback type='valid'>CNH Valido</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
  
                  <Form.Group as={Col} md="2">
                    <Form.Label>Veiculo</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
                      <Form.Control
                        type="text"
                        id = "precoVenda"
                        name = "precoVenda"
                        value={entregador.veiculo}
                        onChange={manipularMudanca}
                        required
                      />
                    </InputGroup>
                    <Form.Control.Feedback type='invalid'>Veiculo Invalido</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Veiculo Valido</Form.Control.Feedback>
                  </Form.Group>
  
                  <Form.Group as={Col} md="2">
                    <Form.Label>Placa Veículo</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">+</InputGroup.Text>
                      <Form.Control
                        type="text"
                        required
                        id = "placaVeiculo"
                        name = "placaVeiculo"
                        value={entregador.placaVeiculo}
                        onChange={manipularMudanca}
                      />
                      <Form.Control.Feedback type='invalid'>Placa Veículo Invalido</Form.Control.Feedback>
                      <Form.Control.Feedback type='valid'>Placa Veículo Valido</Form.Control.Feedback>
                    </InputGroup>
  
                  </Form.Group>
  
                </Row>
  
              <Row className="mb-3">
  
                <Form.Group as={Col} md="9">
  
                  <Form.Label>Capacidade</Form.Label>
                  <Form.Control
                      type="int"
                      required
                      id = "capacidade"
                      name = "capacidade"
                      value={entregador.capacidade}
                      onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback type='invalid'>Capacidade Invalido</Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>Capacidade Valido</Form.Control.Feedback>
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