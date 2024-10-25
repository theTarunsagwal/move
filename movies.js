let inp=document.getElementById('input');
let from=document.getElementById('from');
let SEARCH="https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";
let api = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"
let img="https://image.tmdb.org/t/p/w1280"
app(api);
async function app(a){
    const fet= await fetch(a)
    const res= await fet.json();
    console.log(res)
    data(res.results)
}

const dv = document.querySelector('.movie');
function data(move){
    dv.innerHTML = ''
    move.forEach((elm) => {
        const {title,poster_path, overview,vote_average}=elm;
        const movieEl = document.createElement('div')
        movieEl.classList.add('box')
        movieEl.innerHTML = `
        <h1>${title}</h1>
        <div class="over">
        <p>overview</p>
        <h3 class="${getClassByRate(vote_average)}">${vote_average}</h3>
        <h2>${overview}</h2>
        </div>
        <img src="${img+poster_path}"/>
        `;

        
        dv.appendChild(movieEl)
    });
    }
    function getClassByRate(vote){
        if(vote>=8){
            return'green'
        }else if(vote>=5){
            return'blue'
        }else{
            return'red'
        }
    }
    from.addEventListener('submit', (e) => {
        e.preventDefault()
    
        const searchTerm = inp.value
    
        if(searchTerm && searchTerm !== '') {
            app(SEARCH + searchTerm)
    
            inp.value = ''  
        } else {
            window.location.reload()
        }
    })
    // <h1>${overview}</h1>