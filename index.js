import { Solution } from './Solution.js';
import flights from './data.json' assert { type: "json" };

export const dateDepartureBusAtLondonAirport = new Date(2010, 7, 27, 17, 0, 0);
export const dateArrivalBusAtLondonAirport = new Date(2010, 7, 3, 15, 0, 0);
export const countries = ["TXL", "CDG", "MRS", "LYS", "MAN", "BIO", "JFK", "TUN", "MXP"];

// liste des vols arrivant le 28 juillet à Londre à 17h maximum trié par date d'arrivé
const arrivalFlightsToLondon = flights
  .filter(flight => flight.destination === "LHR" && new Date(flight.arrival_time) <= dateDepartureBusAtLondonAirport)
  .sort((a, b) => new Date(a.arrival_time) - new Date(b.arrival_time));

// liste des vols partant de Londre le 3 août à 15h minimum trié par date de départ
const departureFlightsFromLondon = flights
  .filter(flight => flight.origin === "LHR" && new Date(flight.departure_time) >= dateArrivalBusAtLondonAirport)
  .sort((a, b) => new Date(a.departure_time) - new Date(b.departure_time));



for (const flight of arrivalFlightsToLondon.slice(0, 100)) {
  console.log(flight);
}



function generateRandomSolution() {
  const solution = new Solution();

  // pour chaque pays génère la liste des vols allés / retours puis récupère une valeur aléatoir de chaque liste
  for (const country of countries) {

    // liste des vols arrivant le 28 juillet à Londre à 17h max pour un pays donné
    const arrivalFlightsToLondonPerCountry = arrivalFlightsToLondon.filter(flight => flight.origin === country);

    // liste des vols partant de Londre le 3 août à 15h min pour un pays donné                                             
    const departureFlightsFromLondonPerCountry = departureFlightsFromLondon.filter(flight => flight.destination === country);

    // Récupère un vols allé et retour aléatoire
    const randomArrivalFlight = arrivalFlightsToLondonPerCountry[Math.floor(Math.random() * arrivalFlightsToLondonPerCountry.length)];
    const randomDepartureFlight = departureFlightsFromLondonPerCountry[Math.floor(Math.random() * departureFlightsFromLondonPerCountry.length)];

    solution.list9ArrivalFlightsToLondon.push(randomArrivalFlight);
    solution.list9DepartureFlightsFromLondon.push(randomDepartureFlight);
  }

  return solution;
}


function getBetterSolutionBetween100Randoms() {
    const listOf100RandomSolutions = [];
    for (let i = 0; i < 100; i++) {
        const randomSolution = generateRandomSolution();
        randomSolution.computeCost();
        listOf100RandomSolutions.push(randomSolution);
    }
  
    // Trouver la solution avec le totalCost le plus bas
    const bestSolution = listOf100RandomSolutions.reduce((minSolution, solution) => {
      return solution.totalCost < minSolution.totalCost ? solution : minSolution;
    });
  
    return bestSolution;
}
  


// const randomSolution = generateRandomSolution();
// randomSolution.computeCost();
// const betterSolutionBetween100Random = getBetterSolutionBetween100Randoms();

// console.log("Solution details :")
// console.log("Prix des vols : ",betterSolutionBetween100Random.flightsPrice+" $");
// console.log("Temps d'attente total : ",betterSolutionBetween100Random.waitingTime+" minutes");
// console.log("Cout total : ",betterSolutionBetween100Random.totalCost+" $");

/*for (const flight of randomSolution.list18Flights) {
  console.log("Flight details:");
  console.log("Price:", flight.price+" $");
  console.log("Origin:", flight.origin);
  console.log("Destination:", flight.destination);
  console.log("Departure time:", flight.departure_time);
  console.log("Arrival time:", flight.arrival_time);
  console.log("-----------------------");
}*/
