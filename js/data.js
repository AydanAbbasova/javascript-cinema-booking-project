
function createSeats(bookedSeats = []) {
    const rows = ["A", "B", "C", "D"];
    const seats = [];

    rows.forEach((row) => {
        for (let number = 1; number <= 5; number++) {
            const seatId = `${row}${number}`;

            seats.push({
                id: seatId,
                booked: bookedSeats.includes(seatId)
            });
        }
    });

    return seats;
}

const movies = [
    {
        id: 1,
        title: "Interstellar",
        genre: "Sci-Fi",
        duration: "2h 49m",
        time: "18:00",
        price: 12,
        poster: "images/Interstellar.jpg",
        seats: createSeats(["A2", "A5", "B3", "C1", "C4", "D3"])
    },
    {
        id: 2,
        title: "Inception",
        genre: "Sci-Fi / Action",
        duration: "2h 28m",
        time: "20:30",
        price: 10,
        poster: "images/Inception.jpg",
        seats: createSeats(["A1", "A3", "B1", "B4", "C2", "C5", "D2", "D5"])
    },
    {
        id: 3,
        title: "The Dark Knight",
        genre: "Action / Crime",
        duration: "2h 32m",
        time: "22:00",
        price: 15,
        poster: "images/The Dark Knight.jpg",
        seats: createSeats(["A4", "B2", "B5", "C3", "D1", "D5"])
    },
    {
        id: 4,
        title: "The Lord of the Rings: The Two Towers",
        genre: "Fantasy / Adventure",
        duration: "2h 59m",
        time: "19:00",
        price: 13,
        poster: "images/The Lord of the Rings The Two Towers.jpg",
        seats: createSeats(["A1", "A2", "B3", "B5", "C2", "D1", "D4"])
    },
    {
        id: 5,
        title: "Fight Club",
        genre: "Drama / Thriller",
        duration: "2h 19m",
        time: "21:00",
        price: 11,
        poster: "images/Fight Club.jpg",
        seats: createSeats(["A3", "B1", "B2", "C4", "C5", "D3"])
    },
    {
        id: 6,
        title: "Spider-Man: Across the Spider-Verse",
        genre: "Animation / Action",
        duration: "2h 20m",
        time: "17:30",
        price: 12,
        poster: "images/Spider man.jpg",
        seats: createSeats(["A1", "A5", "B2", "B4", "C1", "C3", "D2", "D5"])
    },
    {
        id: 7,
        title: "Avengers: Infinity War",
        genre: "Action / Adventure",
        duration: "2h 29m",
        time: "20:00",
        price: 14,
        poster: "images/Avengers Infinity War.jpg",
        seats: createSeats(["A2", "A3", "B1", "B5", "C2", "C4", "D1", "D3"])
    },
    {
        id: 8,
        title: "Resident Evil",
        genre: "Horror / Action",
        duration: "1h 35m",
        time: "19:30",
        price: 13,
        poster: "images/resident evil.jpg",
        seats: createSeats(["A4", "B2", "B3", "C1", "C5", "D2"])
    },
    {
        id: 9,
        title: "Insidious: Out of the Further",
        genre: "Horror / Mystery",
        duration: "1h 58m",
        time: "22:30",
        price: 11,
        poster: "images/Insidious Out of the Further.jpg",
        seats: createSeats(["A1", "A3", "A5", "B4", "C2", "C3", "D1", "D5"])
    }
];
