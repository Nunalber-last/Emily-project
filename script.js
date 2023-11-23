const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

const banner = document.querySelector('.app__image');
const iconPause = document.querySelector('.app__card-primary-butto-icon');

const titulo = document.querySelector('.app__title');

const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/lights.mp3');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somTempoEncerrado = new Audio('./sons/beep.mp3')

const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Emily! Utilize o intervalo para estudar.<br>
            <strong class="app__title-strong"> Mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Agora uma pausa de 5 min! <br>
            <strong class="app__title-strong"> Beba, coma algo, e foque de novo.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Uma pausa maior! Use para dispersar. <br>
            <strong class="app__title-strong">Depois, faça 3 vezes esse processo. </strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        somTempoEncerrado.play();
        alert("Tempo Finalizado!");
        zerar()
        reiniciar();
        return
    }
    tempoDecorridoEmSegundos -=1;
     mostrarTempo();
}
startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if(intervaloId){
        somPause.play()
        zerar();
        return;
    }
    somPlay.play()
	intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    iconPause.setAttribute('src', `./imagens/pause.png`);
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    iconPause.setAttribute('src', './imagens/play_arrow.png')
    intervaloId = null;
}
function reiniciar () {
    tempoDecorridoEmSegundos = 5;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute:'2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()