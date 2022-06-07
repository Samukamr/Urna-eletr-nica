// Controle de interfaces
let yourVoteFor = document.querySelector('.d-1-1 span');
let positions = document.querySelector('.d-1-2 span');
let description = document.querySelector('.d-1-4');
let warning = document.querySelector('.d-2');
let side = document.querySelector('.d-1-right');
let numbers = document.querySelector('.d-1-3');

//Controle de ambiente
let currentPhases = 0;
let number = '';
let whitevote = false;
let votes = [];

function startStage() {
    let phase = phases[currentPhases];

    let numberHtml = '';
    number = '';
    whitevote = false;

    for(let i=0;i<phase.numbers;i++) {
        if(i === 0) { // se number for = 0 ele coloca o "flashes" //somente o primeiro
            numberHtml += '<div class="number flashes"></div>';
        } else {
            numberHtml += '<div class="number"></div>'; // os outros vai ser number normal
        }
    }

    yourVoteFor.style.display = 'none';
    positions.innerHTML = phase.titulo;
    description.innerHTML = '';
    warning.style.display = 'none';
    side.innerHTML = '';
    numbers.innerHTML = numberHtml;
}
function updatesInterface() {
    let phase = phases[currentPhases];
    let candidate = phase.candidates.filter((item)=>{
        if(item.number === number) {
            return true;
        } else {
            return false;
        }
    });
     // informações do candidate selecionado
    if(candidate.length > 0) {
        candidate = candidate[0];
        yourVoteFor.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.party}`;
        let photosHtml = '';
        for(let i in candidate.photos) {
            if(candidate.photos[i].small) {
                photosHtml += `<div class="d-1-image small"><img src="images/${candidate.photos[i].url}" alt="" />${candidate.photos[i].legenda}</div>`;
            } else {
                photosHtml += `<div class="d-1-image"><img src="images/${candidate.photos[i].url}" alt="" />${candidate.photos[i].legenda}</div>`;
            }
        }
        side.innerHTML = photosHtml;
    } else {
        yourVoteFor.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = '<div class="big--warning flashes">VOTO NULO</div>';
    }
}

function clicked(n) {
    let elNumber = document.querySelector('.number.flashes');
    if(elNumber !== null) {  // se number for diferente de null
        elNumber.innerHTML = n; //ele pode preencher
        number = `${number}${n}`;

        elNumber.classList.remove('flashes'); // remover o flashes
        if(elNumber.nextElementSibling !== null) { // se o proximo número for diferente de null
            elNumber.nextElementSibling.classList.add('flashes'); // nextElementSibling pega o próximo elemento irmão "número"
        } else {
            updatesInterface();
        }
    }
} 
//Voto em white
function white() {
    number = '';
    whitevote = true;

    yourVoteFor.style.display = 'block';
    warning.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = '<div class="big--warning flashes">VOTO EM BRANCO</div>';
    side.innerHTML = '';
}
// Button correct
function correct() {
    startStage();
}
// Button confirm
function confirm() {
    let phase = phases[currentPhases];

    let confirmedVote = false;

    if(whitevote === true) {
        confirmedVote = true;
        votes.push({
            phase: phases[currentPhases].titulo,
            voto: 'white'
        });
    } else if(number.length === phase.numbers) {
        confirmedVote = true;
        votes.push({
            phase: phases[currentPhases].titulo,
            voto: number
        });
    }

    if(confirmedVote) {
        currentPhases++;
        if(phases[currentPhases] !== undefined) {
            startStage();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="giant--warning flashes">FIM</div>';
            console.log(votes);
        }
    }
}

startStage();