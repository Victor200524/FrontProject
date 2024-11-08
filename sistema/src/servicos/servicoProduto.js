const urlBase = 'https://backend-projetct.vercel.app/produtos';

export async function gravarProduto(Produto){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(Produto)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarProduto(Produto){
    const resposta = await fetch(urlBase+ "/" + Produto.codigo,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(Produto)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirProduto(Produto){
    const resposta = await fetch(urlBase + "/" + Produto.codigo,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarProduto() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}