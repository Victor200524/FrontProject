import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarProduto, excluirProduto, gravarProduto, alterarProduto } from "../servicos/servicoProduto";

import ESTADO from "./estados";

export const buscarProdutos = createAsyncThunk('buscarProdutos', async ()=>{
    //lista de produtos
    const resultado = await consultarProduto();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){ // o resultado é uma lista?
            return {
                "status":true,
                "mensagem":"Produtos recuperados com sucesso",
                "listaDeProdutos":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os produtos do backend.",
                "listaDeProdutos":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeProdutos":[]
        }
    }
});

export const apagarProduto = createAsyncThunk('apagarProduto', async (produto)=>{
    //dar previsibilidade ao conteúdo do payload
    //lista de produtos
    const resultado = await excluirProduto(produto);
    //se for um array/lista a consulta funcionou
    try {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "codigo": produto.codigo
            }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
});

export const incluirProduto = createAsyncThunk('incluirProduto',async (produto)=>{
    //Previsibilidade de comportamento ao que sera retornado para a aplicação (redutor)

    //status a mensagem
    //sucesso => codigo do produto gerado na inclusão
    try{
        const resultado = await gravarProduto(produto);
        if(resultado.status){
            //esse é o payload retornado para o redutor
            produto.codigo = resultado.codigo;
            return{
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "produto": produto
            }
        }
        else{
            return{
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }
        }
    }catch(erro){
        //esse é o payload retornado para o redutor
        return{
            "status":false,
            "mensagem": "Não foi possivel se comunicar com o backed: " + erro.message
        }
    }
});

export const atualizarProduto = createAsyncThunk('atualizarProduto',async (produto)=>{
    //Previsibilidade de comportamento ao que sera retornado para a aplicação (redutor)

    //status a mensagem
    //sucesso => codigo do produto gerado na inclusão
    try{
        const resultado = await alterarProduto(produto);
            //esse é o payload retornado para o redutor
        return{
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "produto": produto
        }
    }catch(erro){
        //esse é o payload retornado para o redutor
        return{
            "status":false,
            "mensagem": "Não foi possivel se comunicar com o backed: " + erro.message
        }
    }
});

const produtoReducer = createSlice({
    name:'produto',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeProdutos:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        //BUSCAR PRODUTOS
        builder.addCase(buscarProdutos.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando produtos)"
        })
        .addCase(buscarProdutos.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeProdutos=action.payload.listaDeProdutos;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeProdutos=action.payload.listaDeProdutos;
          } 
        })
        .addCase(buscarProdutos.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeProdutos=action.payload.listaDeProdutos;
        })
        // APAGAR PRODUTOS
        .addCase(apagarProduto.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requisição (excluindo o produto do backend!)"
        })
        .addCase(apagarProduto.fulfilled,(state,action) =>{
            state.mensagem = action.payload.mensagem; 
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.listaDeProdutos = state.listaDeProdutos.map((item)=> item.codigo !== action.payload.produto.codigo ? action.payload.produto : item);
                //altera a lista de produtos ?
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem=action.payload.mensagem
            }
        })
        .addCase(apagarProduto.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })

        // GRAVAR PRODUTOS
        .addCase(incluirProduto.pending,(state,action)=>{
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando a requisição (inclusão o produto do backend!)";
        })
        .addCase(incluirProduto.fulfilled,(state,action)=>{
            if(action.payload.status){
                //sucesso da inclusão do produto
                state.estado = ESTADO.OCIOSO
                state.mensagem = action.payload.mensagem;
                state.listaDeProdutos.push(action.payload);
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        .addCase(incluirProduto.rejected, (state,action)=>{
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
        })

        //ALTERAR PRODUTOS
        .addCase(atualizarProduto.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requisição (alterando o produto do backend!)"
        })
        .addCase(atualizarProduto.fulfilled,(state,action) =>{
            state.mensagem = action.payload.mensagem; 
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.listaDeProdutos = state.listaDeProdutos.map((item)=> item.codigo !== action.payload.produto.codigo ? action.payload.produto : item);
                //altera a lista de produtos ?
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(atualizarProduto.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
    }
});

export default produtoReducer.reducer; //.reducer é um obejto onde estamo precisando de um redutor