let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Este é o jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10!');
}

exibirMensagemInicial()

 //pegar informação html sem ser exibida somente valor
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns! Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; //alterar palavras no plural
        let mensagemTentativas = `Você descobriu o número secreto com sucesso! Você teve ${tentativas} ${palavraTentativa} para acertar!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
            exibirTextoNaTela('h1', 'Tente novamente!');
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
            exibirTextoNaTela('h1', 'Tente novamente!');
        }
    }
    tentativas++;
    limparCampo();
}

//função para fazer com que o numero aleatorio não se repita e resetar
function gerarNumeroAleatorio() {
    let numerosEscolhidos = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if (quantidadeElementosLista == numeroLimite) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numerosEscolhidos)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numerosEscolhidos);
        console.log(listaNumerosSorteados)
        return numerosEscolhidos;
    }
}

function limparCampo() {
    chute = document.querySelector('input'); // função para limpar o campo de numero
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //setar um atributo para o botão no html
} 