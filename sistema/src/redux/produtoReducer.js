import {createSlice} from "@reduxjs/toolkit";
import ESTADO from "./estados";
import {createAsyncThunk} from "@reduxjs/toolkit";
import { consultarProduto } from "../servicos/servicoProduto";

const buscarProdutos = createAsyncThunk('buscarProdutos',async()=>{
    //lista de produtos
    const resultado = await consultarProduto();
    //se for um array/lista a consulta funcionou
    try{
        if(Array.isArray(resultado)){ // o resultado é uma lista?
            return{
                status:true,
                "mensagem":"Produtos recuperados com sucesso",
                listaDeProdutos
            }
        } 
        else{
            return{
                "status": false,
                "mensagem":"Erro ao recuperar os produtos do backend.",
                "listaDeProdutos":[]
            }
        } 
    }
    catch(erro){
        return{
            "status": false,
            "mensagem":"Erro: " + erro.message,
            "listaDeProdutos":[]
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
    extraReducers:(builder)=>{
        builder.addCase(buscarProdutos.pending, (state,action)=>{
            state.estado + ESTADO.PENDENTE;
            state.mensagem = "Processando a Busca de Produtos"
        })

        .addCase(buscarProdutos.fulfilled, (state,action)=>{
            if(action.payload.status){ // se cnoseguiu a lista de produtos
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.listaDeProdutos = action.payload.listaDeProdutos;
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaDeProdutos = action.payload.listaDeProdutos;
            }
        })

        .addCase(buscarProdutos.rejected, (state,action)=>{
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
        })

    }
});

export default produtoReducer.reducer; //.reducer é um obejto onde estamo precisando de um redutor