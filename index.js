import data from './data.json' assert { type: "json" };
import { Flight } from './models/Flight.js';

const flights = [];
let solution = [];

data.forEach(flight => {
    flights.push(new Flight(flight));
});

function computeCost(solution) {
    const dateDepartureBusFromAirport = new Date(2023, 7, 27, 17, 0, 0);
    const dateArrivalBusAirport = new Date(2023, 8, 3, 15, 0, 0);
    const halfHourCost = 5;

    let cost = 0;
    // Get the prices of the flights
    solution.forEach((flight) => {
        cost += flight.price;
    });

    // Add the cost of the waiting time at the airport at arrival to LHR
    solution
        .filter(flight => flight.destination === "LHR")
        .forEach(flight => {
            const waitingTime = (dateDepartureBusFromAirport - new Date(flight.arrival_time)) / 60000;
            cost += Math.floor(waitingTime / 30) * halfHourCost;
        });

        
    // Add the cost of the waiting time at the airport at departure from LHR
    solution
        .filter(flight => flight.origin === "LHR")
        .forEach(flight => {
            const waitngTime = (new Date(flight.departure_time - dateArrivalBusAirport)) / 60000;
            cost += Math.floor(waitngTime / 30) * halfHourCost;
        });

    // Add the cost of the bus
    return cost + 100;
}
