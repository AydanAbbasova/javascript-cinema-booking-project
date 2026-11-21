let selectedMovieId = 1;
let selectedSeats = [];
let isBooking = false;

const homeSection = document.querySelector(".home");
const detailsSection = document.querySelector(".details");
const movieList = document.querySelector(".movies");
const homeLink = document.querySelector("#homeLink");
const breadcrumbTitle = document.querySelector(".movie-name");
const detailPoster = document.querySelector(".poster");
const detailTitle = document.querySelector(".title");
const detailGenre = document.querySelector(".genre");
const detailDuration = document.querySelector(".duration");
const detailTime = document.querySelector(".time");
const detailPrice = document.querySelector(".ticket-price");
const selectedList = document.querySelector(".selected-seats");
const totalText = document.querySelector(".total");
const bookBtn = document.querySelector("#bookBtn");
const messageText = document.querySelector(".message");
const loadingText = document.querySelector(".loading");
const seatsList = document.querySelector(".seats");

function findMovie(movieId) {
  return movies.find(function (movie) {
    return movie.id === movieId;
  });
}

function findSeat(movie, seatId) {
  return movie.seats.find(function (seat) {
    return seat.id === seatId;
  });
}
function renderMovies() {
  movieList.innerHTML = "";

  movies.forEach(function (movie) {
    const card = document.createElement("li");

    const poster = document.createElement("img");
    poster.src = movie.poster;
    poster.alt = movie.title + " poster";

    const title = document.createElement("h3");
    title.textContent = movie.title;

    const tags = document.createElement("ul");
    tags.className = "tags";
    [movie.genre, movie.duration, movie.time].forEach(function (text) {
      const tag = document.createElement("li");
      tag.textContent = text;
      tags.appendChild(tag);
    });

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = "$" + movie.price;

    const button = document.createElement("button");
    button.textContent = "Book Tickets";
    button.addEventListener("click", function () {
      showMovieDetails();
      selectMovie(movie.id);
    });

    card.appendChild(poster);
    card.appendChild(title);
    card.appendChild(tags);
    card.appendChild(price);
    card.appendChild(button);

    movieList.appendChild(card);
  });
}

function loadSeats(movieId) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const movie = findMovie(movieId);
      if (movie) {
        resolve(movie.seats);
      } 
      
      else {
        reject(new Error("Movie not found."));
      }
    }, 1500);
  });
}

function renderSeats(seatList) {
  seatsList.innerHTML = "";

  seatList.forEach(function (seat) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = seat.id;

    if (seat.booked) {
      button.className = "booked";
      button.disabled = true;
    } 
    
    else if (selectedSeats.includes(seat.id)) {
      button.className = "selected";
    } 
    
    else {
      button.className = "available";
    }

    button.addEventListener("click", function () {
      selectSeat(seat.id);
    });

    item.appendChild(button);
    seatsList.appendChild(item);
  });
}

function renderSelectedSeats() {
  selectedList.innerHTML = "";

  selectedSeats.forEach(function (seatId) {
    const item = document.createElement("li");
    item.textContent = seatId;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "×";

    removeBtn.addEventListener("click", function () {
      selectSeat(seatId);
    });

    item.appendChild(removeBtn);
    selectedList.appendChild(item);
  });
}

async function selectMovie(movieId) {
  selectedMovieId = movieId;
  selectedSeats = [];

  messageText.textContent = "";
  seatsList.innerHTML = "";

  renderSelectedSeats();
  updateTotal();

  const movie = findMovie(movieId);

  if (movie) {
    breadcrumbTitle.textContent = movie.title;
    detailPoster.src = movie.poster;
    detailPoster.alt = movie.title + " poster";

    detailTitle.textContent = movie.title;
    detailGenre.textContent = movie.genre;
    detailDuration.textContent = movie.duration;
    detailTime.textContent = movie.time;
    detailPrice.textContent = "$" + movie.price;
  }

  loadingText.style.display = "block";

  try {
    const seatList = await loadSeats(movieId);
    renderSeats(seatList);
  } 
  
  catch (error) {
    messageText.textContent = error.message;
  } 
  
  finally {
    loadingText.style.display = "none";
  }
}

function selectSeat(seatId) {
  if (isBooking) {
    return;
  }
  const movie = findMovie(selectedMovieId);
  const seat = findSeat(movie, seatId);

  if (seat.booked) {
    return;
  }

  if (selectedSeats.includes(seatId)) {
    selectedSeats = selectedSeats.filter(function(id) {
        return id !== seatId;
    });
}
  
  
  else {
    selectedSeats.push(seatId);
  }

  renderSeats(movie.seats);
  renderSelectedSeats();
  updateTotal();
}

function checkAvailability(movieId, seatIds) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const movie = findMovie(movieId);
      if (!movie) {
        reject(new Error("Movie not found."));
        return;
      }

      let allFree = true;
      for (let i = 0; i < seatIds.length; i++) {
        const seat = findSeat(movie, seatIds[i]);
        if (!seat) {
          reject(new Error("Seat " + seatIds[i] + " does not exist."));
          return;
        }

        if (seat.booked) {
          allFree = false;
        }
      }

      if (allFree) {
        resolve("All selected seats are available.");
      } 
      
      else {
        reject(new Error("One or more selected seats are already booked."));
      }
    }, 1000);
  });
}

function confirmBooking(movieId, seatIds) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const movie = findMovie(movieId);
      if (!movie) {
        reject(new Error("Movie not found."));
        return;
      }

      
      for (let i = 0; i < seatIds.length; i++) {
        const seat = findSeat(movie, seatIds[i]);
        if (!seat || seat.booked) {
          reject(new Error("One or more seats are unavailable."));
          return;
        }
      }

      for (let i = 0; i < seatIds.length; i++) {
        findSeat(movie, seatIds[i]).booked = true;
      }

      resolve({
        movie: movie.title,
        seats: seatIds,
        total: seatIds.length * movie.price,
        status: "confirmed",
      });
    }, 2000);
  });
}

async function bookTickets() {
  if (selectedSeats.length === 0) {
    messageText.textContent = "Please select at least one seat.";
    return;
  }

  isBooking = true;
  bookBtn.disabled = true;
  messageText.textContent = "Checking seats...";

  try {
    await checkAvailability(selectedMovieId, selectedSeats);
    messageText.textContent = "Confirming booking...";
    const result = await confirmBooking(selectedMovieId, selectedSeats);
    messageText.textContent ="Booking confirmed successfully!\n" + "Movie: " + 
    result.movie + " \n" + "Seats: " +
    result.seats.join(", ") + "\n" + 
    "Total: $" +result.total;

    selectedSeats = [];
  } 
  
  catch (error) {
    messageText.textContent = "Booking failed!\n" + error.message;
  } 
  
  finally {
    isBooking = false;
    bookBtn.disabled = false;

    renderSeats(findMovie(selectedMovieId).seats);
    renderSelectedSeats();
    updateTotal();
  }
}

function updateTotal() {
  const movie = findMovie(selectedMovieId);
  let total = 0;
  if (movie) {
    total = selectedSeats.length * movie.price;
  }

  totalText.textContent = "$" + total;
}

function showHome() {
  if (isBooking) {
    return;
  }

  homeSection.style.display = "block";
  detailsSection.style.display = "none";
}

function showMovieDetails() {
  homeSection.style.display = "none";
  detailsSection.style.display = "grid";
}

renderMovies();
bookBtn.addEventListener("click", bookTickets);
homeLink.addEventListener("click", showHome);
