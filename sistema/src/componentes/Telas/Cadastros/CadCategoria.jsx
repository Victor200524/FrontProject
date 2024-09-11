import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Categoria(props){



    return(
      <div>
        <div>
          <Container>
            <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  type="int"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue=""
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
                  <Button variant='outline-success' type='submit'>Cadastrar</Button>
                </Col>
                
                {//offset é o deslocamento
                  }
                <Col md={{offset:1}}> 
                  <Button variant='outline-success' type='submit' onClick={()=>{
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