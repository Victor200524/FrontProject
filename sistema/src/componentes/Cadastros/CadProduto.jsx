import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function Produto(props){



    return(
      <div>
        <div>
          <Container>
            <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  required
                  type="int"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue=""
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="2" controlId="validationCustomUsername">
                <Form.Label>Preço de Custo</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
                  <Form.Control
                    type="double"
                    placeholder=""
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a e-mail.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="2" controlId="validationCustomUsername">
                <Form.Label>Preço de de Venda</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
                  <Form.Control
                    type="double"
                    placeholder=""
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a e-mail.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="2" controlId="validationCustomUsername">
                <Form.Label>Estoque</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">+</InputGroup.Text>
                  <Form.Control
                    type="double"
                    placeholder=""
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a e-mail.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>URL da imagem</Form.Label>
                <Form.Control
                  type="text"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>Valido até</Form.Label>
                <Form.Control 
                  type="date" 
                  required 
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
            <Button type="submit">Cadastrar</Button>
          </Form>
          </Container>
        </div>
      </div>
    );
}