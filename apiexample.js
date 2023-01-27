// initialize page after HTML loads
////https://coolors.co/000000-14213d-fca311-e5e5e5-ffffff//

window.onload = function() {
   closeLightBox();  // close the lightbox because it's initially open in the CSS
   document.getElementById("button").onclick = function () {
     searchTvShows();
   };
   document.getElementById("lightbox").onclick = function () {
     closeLightBox();
   };
} // window.onload


// get data from TV Maze
function searchTvShows() {
  document.getElementById("main").innerHTML = "";
  
  var search = document.getElementById("search").value;  
    
  fetch('http://api.tvmaze.com/search/shows?q=' + search)
    .then(response => response.json())
    .then(data => showSearchResults(data) 
    );
} // window.onload 
 

// change the activity displayed 
function showSearchResults(data) {
  
  // show data from search
  console.log(data); 
  
  // show each tv show from search results in webpage
  for (let tvshow in data) {
    createTVShow(data[tvshow]);
  } // for


} // show search results

// in the json, genres is an array of genres associated with the tv show 
// this function returns a string of genres formatted as a bulleted list
function showGenres(genres) {
   var g;
   var output = "<ul>";
   for (g in genres) {
      output += "<li>" + genres[g] + "</li>"; 
   } // for       
   output += "</ul>";
   return output; 
} // showGenres

// constructs one TV show entry on webpage
function createTVShow (tvshowJSON) {
  
    // get the main div tag
    var elemMain = document.getElementById("main");
    
    // create a number of new html elements to display tv show data
    var elemDiv = document.createElement("div");
    elemDiv.setAttribute('class','showdiv');
    var elemImage = document.createElement("img");
    elemImage.setAttribute('class','showimage');
    var elemShowTitle = document.createElement("h2");
    elemShowTitle.classList.add("showtitle"); // add a class to apply css
    
    var elemGenre = document.createElement("div");
    elemGenre.setAttribute('class','showgenre');
    var elemRating = document.createElement("div");
    elemRating.setAttribute('class','showrating');
    var elemSummary = document.createElement("div");
    elemSummary.setAttribute('class','showsummary');
    // add JSON data to elements
    elemImage.src = tvshowJSON.show.image.medium;
    elemShowTitle.innerHTML = tvshowJSON.show.name;
    elemGenre.innerHTML = "Genres:" + showGenres(tvshowJSON.show.genres);
    elemRating.innerHTML = "Rating: " + tvshowJSON.show.rating.average;
    elemSummary.innerHTML = tvshowJSON.show.summary;
  
    
    
 
    elemDiv.appendChild(elemShowTitle);  
    
    
    elemDiv.appendChild(elemGenre);
    elemDiv.appendChild(elemImage);
    elemDiv.appendChild(elemRating);
    elemDiv.appendChild(elemSummary);
   
    
    // get id of show and add episode list
    var showId = tvshowJSON.show.id;
    fetchEpisodes(showId, elemDiv);
    
    // add this tv show to main
    elemMain.appendChild(elemDiv);
    
} // createTVShow

// fetch episodes for a given tv show id
function fetchEpisodes(showId, elemDiv) {
     
  console.log("fetching episodes for showId: " + showId);
  
  fetch('http://api.tvmaze.com/shows/' + showId + '/episodes')  
    .then(response => response.json())
    .then(data => showEpisodes(data, elemDiv))
   
    
} // fetch episodes


// list all episodes for a given showId in an ordered list 
// as a link that will open a light box with more info about
// each episode
function showEpisodes (data, elemDiv) {
    
    // print data from function fetchEpisodes with the list of episodes
    console.log("episodes");
    console.log(data); 
    
    var elemEpisodes = document.createElement("div");
    elemEpisodes.setAttribute('class','showepisodes')
      // creates a new div tag
    var output=""

    for (episode in data) {
        output += "<button id='a' ><a href='javascript:fetchEpisodeInfo("+data[episode].id+")'+>" + data[episode].name + "</a></button>";
        console.log(data[episode].id)
       
       
    }
  
    elemEpisodes.innerHTML =output; 
    elemDiv.appendChild(elemEpisodes);  // add div tag to page
    
  

  }
  

function  fetchEpisodeInfo(episodeId){
 
  fetch('http://api.tvmaze.com/episodes/' + episodeId)  
  .then(response => response.json())
  .then(showInfo=> showLightBox(showInfo))

}

 
// open lightbox and display episode info
function showLightBox(showInfo){
     
     console.log(showInfo)
     document.getElementById("lightbox").style.display = "block";
     for (episode in showInfo){
     // show episode info in lightbox
     document.getElementById("message").innerHTML = "<br><br><br><br><br><br><br><br><br><br>name:"+showInfo.name+"<br><br>"
     document.getElementById("message").innerHTML +="season:"+ showInfo.season +"<br><br>number:"+showInfo.number
     document.getElementById("message").innerHTML +="<p>description:</p>"+ showInfo.summary
     document.getElementById("episodeimg").src=showInfo.image.medium
     }
} // showLightBox

 // close the lightbox
 function closeLightBox(){
     document.getElementById("lightbox").style.display = "none";
 } // closeLightBox 






