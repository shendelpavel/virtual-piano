const letters = {
    a: 'ф',
    w: 'ц',
    s: 'ы',
    d: 'в',
    r: 'к',
    f: 'а',
    t: 'е',
    g: 'п',
    h: 'р',
    u: 'г',
    j: 'о',
    i: 'ш',
}

let mouseDown = 0;
document.querySelector('.piano').onmousedown = function(){
    ++mouseDown;
    console.log(mouseDown);
}
document.body.onmouseup = function(){
    mouseDown = 0;
    console.log(mouseDown);
}


function keyplaying(event){
    let letter = event.key.toLowerCase();
    for(let i in letters){
        if (letter === i ) break;
        else if (letter === letters[i]) letter = i;
    }
    let audio = document.querySelector(`audio[data-letter="${letter}"]`);
    let key = document.querySelector(`.piano-key[data-letter="${letter}"]`);

    if(!audio || map.get(key.id)) return;

    map.set(key.id, true);
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}


function onKeyUp(event){
    let letter = event.key.toLowerCase();
    for(let i in letters){
        if (letter === i ) break;
        else if (letter === letters[i]) letter = i;
    }
    const key = document.querySelector(`.piano-key[data-letter="${letter}"]`);
    map.set(key.id, false);
    key.classList.remove('playing');
}


function clickplaying(event){
    if (event.target.classList[0] != "piano-key") return;

    const audio = document.querySelector(`audio[data-letter="${event.target.dataset.letter}"]`);
    const key = document.querySelector(`.piano-key[data-letter="${event.target.dataset.letter}"]`);
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

function onMouseUp(event){
    const key = document.querySelector(`.piano-key[data-letter="${event.target.dataset.letter}"]`);
    key.classList.remove('playing');
}

function keyHover(event){
    if (event.target.classList[0] != "piano-key") return;
    if (!mouseDown) return;

    const audio = document.querySelector(`audio[data-letter="${event.target.dataset.letter}"]`);
    const key = document.querySelector(`.piano-key[data-letter="${event.target.dataset.letter}"]`);
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

function fullScreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
      return;
    } if(element.webkitrequestFullscreen) {
      element.webkitRequestFullscreen();
      return;
    } if(element.mozRequestFullscreen) {
      element.mozRequestFullScreen();
      return;
    }
}


function fullscreenMode(event){
    if (event.target.classList[1] != 'openfullscreen') return;
    if (event.target.classList[event.target.classList.length - 1] != 'closefullscreen'){
        let html = document.documentElement;
        fullScreen(html);
        event.target.classList.add('closefullscreen');
    }else if (event.target.classList[event.target.classList.length - 1] == 'closefullscreen'){
        document.exitFullscreen();
        event.target.classList.remove('closefullscreen');
    }
}


let map = new Map();



window.addEventListener('keydown', keyplaying);

window.addEventListener('keyup', onKeyUp);

window.addEventListener('mousedown', clickplaying);

window.addEventListener('mouseover', keyHover);

window.addEventListener('mouseup', onMouseUp);

window.addEventListener('mouseout', onMouseUp);

window.addEventListener('click', fullscreenMode);


const keys = document.querySelectorAll(".piano-key");
for (let i = 0; i < keys.length; i++) {
    window.addEventListener('click', function(event){
        if (event.target.classList[0] != 'button') return;
        
        if (event.target.classList[event.target.classList.length - 1] != 'button--active'){
            document.querySelector('.button--active').classList.remove('button--active');
            event.target.classList.add('button--active')
        }
    
        if(document.querySelector('.button--active').classList[1] == 'button--laters'){
            keys[i].classList.add('piano-key--letter');
        } else if(document.querySelector('.button--active').classList[1] == 'button--notes'){
            keys[i].classList.remove('piano-key--letter');
        }
    });
}


for (let i = 0; i < keys.length; i++) {
    map.set(keys[i].id, false);
}












