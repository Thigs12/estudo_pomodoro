//variáveis em geral
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const startPauseBt = document.querySelector('#start-pause');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const alterarIconePlay = document.querySelector('.app__card-primary-butto-icon');
const tempoTela = document.querySelector('#timer');

//variáveis do tipo audio//
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const tempoFinalizado = new Audio('./sons/beep.mp3');
const musica =new Audio('./sons/luna-rise-part-one.mp3');

//funcionamento do aúdio. Para o intervalo se repetir e definindo 25min em segundos.
let intervalo = null;
let tempoDecSegundos = 1500

musica.loop = true;

//funcionalidade do botão de Música
musicaFocoInput.addEventListener('change', ()=>{
    if (musica.paused) {
        musica.play()
    }else{
        musica.pause()
    }
})

//aba de foco (25min)
focoBt.addEventListener('click', () =>{
    tempoDecSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('acitve')
})

//botão de descanso curto (5min)
curtoBt.addEventListener('click', () =>{
    tempoDecSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

//botão de descanso longo (15min)
longoBt.addEventListener('click', () =>{
    tempoDecSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

//função para mudança de imagem, cor e texto da página
function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    });
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML =  `
             Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML =`
            Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

//definindo o timer de alerta, o qual ao chegar em 0 irá dizer que o tempo chegou ao fim.
const contagemRegressiva  = ()=>{
    if (tempoDecSegundos <= 0) {
        tempoFinalizado.play()
        alert('tempo finalizado')
        zerar();
        return
    }
    tempoDecSegundos -= 1;
    mostrarTempo()
}

//adicionando o evento ao  botão principal
startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if (intervalo) {
        audioPause.play();
        zerar()
        return
    }
    audioPlay.play();
    intervalo = setInterval(contagemRegressiva, 1000) 
    iniciarOuPausarBt.textContent = "Pausar"
    alterarIconePlay.setAttribute('src', './imagens/pause.png');
}

function zerar(){
    clearInterval(intervalo)
    iniciarOuPausarBt.textContent = "Começar"
    alterarIconePlay.setAttribute('src', './imagens/play_arrow.png');
    intervalo = null;
}

//Deixar o tempo expresso em minutos na tela, o qual irá mudar de acordo com a aba.
function mostrarTempo(){
    const tempo = new Date(tempoDecSegundos*1000)
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML =`${tempoFormatado}`
}

mostrarTempo()