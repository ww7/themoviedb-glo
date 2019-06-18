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
      let nameItem = item.name || item.title,
          dateItem = item.release_date || item.first_air_date,
          idItem = item.id,
          posterItem = item.poster_path,
          media_type = item.media_type,
          original_language = item.original_language;
      let url = convertToSlug(idItem + "-" + nameItem);

      if (media_type === "movie"){
        url = "movie/" + url;
      }
      else if (media_type === "tv"){
        url = "tv/" + url;
      }

      inner += `<div class="col-4">
      <div style="text-align: center; padding: 10px 0 20px 0;">
        <div><a href=https://www.themoviedb.org/${url}><img style="max-width: 100%;" src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${posterItem}"></a></div>
        <div class=""><a href=https://www.themoviedb.org/${url}>${nameItem}</a></div>
          <span class="">${dateItem}</span>
          <span class="">(${media_type})</span>
          <span class="">(${original_language})</span>
        </div>
      </div>`;
      // console.log(item);
    });
    
    movies.innerHTML = inner;
});

  function convertToSlug(Text)
    {
      return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
    }

}


