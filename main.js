const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt= "rosto feliz" />'; //Adicionando as imagens para as respostas
const imgReprovado = '<img src="./images/reprovado.png" alt= "rosto triste" />';
const atividades = []; //Criação de arrays para adicionar todas as atividades que o user digitou
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima: ")); //Para o user fazer a definição da nota mínima para aprovar


let linhas = ''; //Variável criada para acrescentar as linhas e não substituir e é colocada aqui para não resetar, por conta da '' string vazia

const inputNomeAtividade = document.getElementById('nome-atividade'); //Armazenando a informação passada pelo user
const inputNotaAtividade = document.getElementById('nota-atividade');

form.addEventListener('submit', function(e) {
    e.preventDefault(); //Função que evita o carregamento da página

    adicionaLinha(); //insrimos as funções na ordem em que vão ser executadas
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    //Evitar que repita a entrada das mesmas atividades e faz a conversão em um padrão definido, que no caso foi o LowerCase, para evitar que o user digite teste e Teste e o programa não identifique ser o mesmo.
    if (atividades.map(function(atividade) { return atividade.toLowerCase(); }).includes(inputNomeAtividade.value.toLowerCase())) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi cadastrada!`);
    } else {
        atividades.push(inputNomeAtividade.value); //push adiciona o conteúdo nos arrays
        notas.push(parseFloat(inputNotaAtividade.value)); //parseFloat para converter o dado inserido em númerico decimal

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`; //Corresponde a uma concatenação
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; //onde vai fazer a lógica para saber se o aluno foi aprovado ou não e a ? representa o if(se) e o : else
        linha += '<tr>';

        linhas += linha;

        //Adicionando o conteúdo dentro do corpo da tabela
        const corpoTabela = document.querySelector('tbody');
        corpoTabela.innerHTML = linhas;
    }
}

function atualizaTabela() {
    inputNomeAtividade.value = ''; //Limpar os campos depois de preenchidos e enviados
    inputNotaAtividade.value = '';
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); //.toFixed limita as casas decimais
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    //Calculadno a média
    let somaDasNotas = 0;

    for ( let i = 0; i < notas.length; i++) {
            somaDasNotas += notas[i];
    }
    
    return somaDasNotas / notas.length;
}