import { useEffect, useState } from "react";

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
                    <Form.Control.Feedback type="invalid">
                      Please choose a e-mail.
                    </Form.Control.Feedback>
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