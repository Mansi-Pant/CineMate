const searchForm = document.querySelector('form');
const movieContainer= document.querySelector('.movie-container');
const inputBox= document.querySelector('.inputBox');

//function to fetch movie details using omdb api
const getMovieInfo = async (movie) => {
  try{
    const myapikey = "d2ef940e";
    const url = `https://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;
    const response = await fetch(url);
    if(!response.ok){
      throw new Error("Unable to fetch movie data.");
    }
    const data = await response.json();
    showMovieData(data);
  } catch(error){
    showErrorMessage("No Movie Found!!!");
  }
}
  //ott
  const movieOTTData = {
    "Inception": [
      { name: "Netflix", url: "https://www.netflix.com", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
      { name: "Amazon Prime", url: "https://www.primevideo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png" },
      { name: "Hulu", url: "https://www.hulu.com", logo: "https://upload.wikimedia.org/wikipedia/commons/0/03/Hulu_logo_%282014%29.svg" }
    ],
    "The Dark Knight": [
      { name: "HBO Max", url: "https://www.hbomax.com", logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg"},
      { name: "Amazon Prime", url: "https://www.primevideo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"}
    ],
    "Zindagi Na Milegi Dobara":[
      { name: "Netflix", url: "https://www.netflix.com", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
      { name: "Amazon Prime", url: "https://www.primevideo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"}
    ],
    "3 Idiots":[
      { name: "Amazon Prime", url: "https://www.primevideo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"},
      { name: "Apple TV", url:"https://tv.apple.com/", logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg"}
    ],
    "Pathaan":[
      { name: "Amazon Prime", url: "https://www.primevideo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"},
      { name: "Apple TV", url:"https://tv.apple.com/", logo:"https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg"}
    ],
    "Raazi":[
      { name: "Amazon Prime", url: "https://www.primevideo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"},
      {name: "Apple TV", url:"https://tv.apple.com/", logo:"https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg"}
    ],
    "Jab We Met":[
      { name: "Amazon Prime", url: "https://www.primevideo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"},
      { name: "Lionsgate Play",url:"https://lionsgateplay.com/mobileloggedin", logo:"https://lgi-img-cdn-lb.lionsgateplay.com/prd-peg-data/default/web3/resources/images/channels/voucher-thankyou-page/rebrand-lionsgateplay.png"}
    ],
    "Stree":[
      { name: "Hotstar", url:"https://www.hotstar.com/in/movies/grrr/1271325311", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg"},
      {name: "Apple TV", url:"https://tv.apple.com/", logo:"https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg"}
    ],
    "Om Shanti Om":[
      { name: "Netflix", url: "https://www.netflix.com", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"},
      { name: "Apple TV", url:"https://tv.apple.com/", logo:"https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg"}
    ],
    "Welcome":[
      { name: "Amazon Prime", url: "https://www.primevideo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"},
      { name: "Lionsgate Play",url:"https://lionsgateplay.com/mobileloggedin", logo:"https://lgi-img-cdn-lb.lionsgateplay.com/prd-peg-data/default/web3/resources/images/channels/voucher-thankyou-page/rebrand-lionsgateplay.png"},
    ],
    "Harry Potter and the Chamber of Secrets":[
      {name: "Apple TV", url:"https://tv.apple.com/", logo:"https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg"}
    ],
    "The Nun":[
      {name: "Apple TV", url:"https://tv.apple.com/", logo:"https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg"}
    ],
    "Annabelle":[
      { name: "Amazon Prime", url: "https://www.primevideo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"},
      {name: "Apple TV", url:"https://tv.apple.com/", logo:"https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg"}
    ],
    "Interstellar":[
      { name: "Netflix", url: "https://www.netflix.com", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
      { name: "Amazon Prime", url: "https://www.primevideo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"}
    ],
    "Joker":[
      { name: "Netflix", url: "https://www.netflix.com", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
      { name: "Amazon Prime", url: "https://www.primevideo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"}
    ]


    // Add more movies similarly
  };
  

//function to show movie data on screen
const showMovieData = (data) => {
  movieContainer.innerHTML="";
  movieContainer.classList.remove('noBackground');
  //use destructuring assignment to extract properties from data object
  const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie-info');
  movieElement.innerHTML = `<h2>${Title}</h2>
                            <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
  const movieGenreElement = document.createElement('div');
  movieGenreElement.classList.add('movie-genre');

  Genre.split(",").forEach(element => {
    const p = document.createElement('p');
    p.innerText = element;
    movieGenreElement.appendChild(p);
  }); 
  
  movieElement.appendChild(movieGenreElement);
  movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
  <p><strong>Duration: </strong>${Runtime}</p>
  <p><strong>Cast: </strong>${Actors}</p>
  <p><strong>Plot: </strong>${Plot}</p>`;

//watchbutton
  const watchButton = document.createElement('button');
  watchButton.innerText = "Watch";
  watchButton.classList.add('watchBtn');
  watchButton.addEventListener('click', () => showOTTPlatforms(Title));
  
  movieElement.appendChild(watchButton);

  //creating a div for movie poster
  const moviePosterElement = document.createElement('div');
  moviePosterElement.classList.add('movie-poster');
  moviePosterElement.innerHTML= `<img src= "${Poster}"/>`;
  movieContainer.appendChild(moviePosterElement);

  movieContainer.appendChild(movieElement);

}
//display ott platforms

const showOTTPlatforms = (movieTitle) => {
  const platforms = movieOTTData[movieTitle];
  if (platforms) {
    const ottContainer = document.createElement('div');
    ottContainer.classList.add('ott-container');
    const heading = document.createElement('h3');
    heading.innerText = "Available On:";
    ottContainer.appendChild(heading);

    platforms.forEach(platform => {
      const platformLink = document.createElement('a');
      platformLink.href = platform.url;
      platformLink.target = "_blank"; // Opens the link in a new tab
      
      const platformLogo = document.createElement('img');
      platformLogo.src = platform.logo;
      platformLogo.alt = platform.name;
      platformLogo.classList.add('ott-logo');
      
      platformLink.appendChild(platformLogo);
      ottContainer.appendChild(platformLink);
    });

    movieContainer.appendChild(ottContainer);
  } else {
    alert("No OTT platforms available for this movie.");
  }
};



//function to display error message
const showErrorMessage = (message) => {
  movieContainer.innerHTML = `<h2>${message}</h2>`;
  movieContainer.classList.add('noBackground');
}

//function to handle form submission
const handleFormSubmission = (e)=>{
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if(movieName !== ''){
    showErrorMessage("Fetching Movie Information...");
    getMovieInfo(movieName);
  }
  else{
    showErrorMessage("Enter movie name to get movie information");
  }
}
//adding event listener to search form
searchForm.addEventListener('submit', handleFormSubmission);