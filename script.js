const searchForm = document.querySelector('#search-form');
const movies = document.querySelector('#movies');

function apiSearch(event){
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value,
  server = 'https://api.themoviedb.org/3/search/multi?api_key=05c5557757f4827c49f0b65691cbd5ef&query=' + searchText;
  // console.log(requestApi(server));
  requestApi('GET',server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url){

  const request = new XMLHttpRequest();
  // console.log(request);
  request.open(method, url);
  request.send();


  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return;
    if (request.status !== 200){
      console.log('error ' + request.status);
      return;
    }

    const output = JSON.parse(request.responseText);
    // console.log(request.responseText);

    let inner = '';

    output.results.forEach(function(item){
      let nameItem = item; //item.name || item.title;
      console.log(nameItem);
      inner += `<div class="col-3">${nameItem}</div>`;
    });

    movies.innerHTML = inner;

    // console.log(output);
});

}


