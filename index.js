import { Solution } from './Solution.js';
import flights from './data.json' assert { type: "json" };

export const dateDepartureBusAtLondonAirport = new Date(2010, 7, 27, 17, 0, 0);
export const dateArrivalBusAtLondonAirport = new Date(2010, 7, 3, 15, 0, 0);
export const countries = ["TXL", "CDG", "MRS", "LYS", "MAN", "BIO", "JFK", "TUN", "MXP"];



function generateRandomSolution(){
    const solution = new Solution();

    // pour chaque pays génère la liste des vols allés / retours puis récupère une valeur aléatoir de chaque liste
    for (const country of countries) {

        // vols arrivant le 28 juillet à Londre à 17h max
        const arrivalFlightsToLondon = flights.filter(flight => flight.destination === "LHR" && 
                                                    flight.origin === country &&
                                                    new Date(flight.arrival_time) <= dateDepartureBusAtLondonAirport);

        // vols partant de Londre le 3 août à 15h min                                              
        const departureFlightsFromLondon = flights.filter(flight => flight.origin === "LHR" && 
                                                            flight.destination === country && 
                                                            new Date(flight.departure_time) >= dateArrivalBusAtLondonAirport);
        
        const randomArrivalFlight = arrivalFlightsToLondon[Math.floor(Math.random() * arrivalFlightsToLondon.length)];
        const randomDepartureFlight = departureFlightsFromLondon[Math.floor(Math.random() * departureFlightsFromLondon.length)];
    
        solution.list18Flights.push(randomArrivalFlight);
        solution.list18Flights.push(randomDepartureFlight);
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
const betterSolutionBetween100Random = getBetterSolutionBetween100Randoms();

console.log("Solution details :")
console.log("Prix des vols : ",betterSolutionBetween100Random.flightsPrice+" $");
console.log("Temps d'attente total : ",betterSolutionBetween100Random.waitingTime+" minutes");
console.log("Cout total : ",betterSolutionBetween100Random.totalCost+" $");

/*for (const flight of randomSolution.list18Flights) {
  console.log("Flight details:");
  console.log("Price:", flight.price+" $");
  console.log("Origin:", flight.origin);
  console.log("Destination:", flight.destination);
  console.log("Departure time:", flight.departure_time);
  console.log("Arrival time:", flight.arrival_time);
  console.log("-----------------------");
}*/
