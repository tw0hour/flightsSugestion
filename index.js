import flights from './data.json' assert { type: "json" };

const dateDepartureBusAtLondonAirport = new Date(2010, 7, 27, 17, 0, 0);
const dateArrivalBusAtLondonAirport = new Date(2010, 7, 3, 15, 0, 0);
const countries = ["TXL", "CDG", "MRS", "LYS", "MAN", "BIO", "JFK", "TUN", "MXP"];

function generateRandomSolution(){
    const solution = []

    // pour chaque pays génère la liste des vols allés (vols arrivant le 28 juillet à Londre à 17h max) / retours (vols partant de Londre le 3 août à 15h min) 
    // puis récupère une valeur aléatoir de chaque liste
    for (const country of countries) {

        const arrivalFlightsToLondon = flights.filter(flight => flight.destination === "LHR" && flight.origin === country && new Date(flight.arrival_time) <= dateDepartureBusAtLondonAirport);
        const departureFlightsFromLondon = flights.filter(flight => flight.origin === "LHR" && flight.destination === country && new Date(flight.departure_time) >= dateArrivalBusAtLondonAirport);
        
        const randomArrivalFlight = arrivalFlightsToLondon[Math.floor(Math.random() * arrivalFlightsToLondon.length)];
        const randomDepartureFlight = departureFlightsFromLondon[Math.floor(Math.random() * departureFlightsFromLondon.length)];
    
        solution.push(randomArrivalFlight);
        solution.push(randomDepartureFlight);
      }

      return solution;
}

function computeCost(solution) {

    const halfHourCost = 5; // each half hour of waiting time cost 5

    let cost = 0;
    // Get the prices of the flights
    solution.forEach((flight) => {
        cost += flight.price;
    });

    // Add the cost of the waiting time in arrival to LHR airport
    solution
        .filter(flight => flight.destination === "LHR")
        .forEach(flight => {
            const waitingTime = (dateDepartureBusAtLondonAirport - new Date(flight.arrival_time)) / 60000;
            cost += Math.floor(waitingTime / 30) * halfHourCost;
        });

        
    // Add the cost of the waiting time in departure from LHR airport
    solution
        .filter(flight => flight.origin === "LHR")
        .forEach(flight => {
            const waitingTime = (new Date(flight.departure_time) - dateArrivalBusAtLondonAirport) / 60000;
            cost += Math.floor(waitingTime / 30) * halfHourCost;
        });

    // Add the cost of the bus
    return cost + 100;
}

const randomSolution = generateRandomSolution();
const cost = computeCost(randomSolution)

for (const flight of randomSolution) {
  console.log("Flight details:");
  console.log("Price:", flight.price+" $");
  console.log("Origin:", flight.origin);
  console.log("Destination:", flight.destination);
  console.log("Departure time:", flight.departure_time);
  console.log("Arrival time:", flight.arrival_time);
  console.log("-----------------------");
}
console.log("La solution coute: "+ cost +" $")