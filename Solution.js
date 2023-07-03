import { dateDepartureBusAtLondonAirport, dateArrivalBusAtLondonAirport} from './index.js';

export class Solution {

    // attributs static 

    static minuteCost = 1;

    
    // attributs

    flightsPrice = 0; // la somme des prix des vols
    waitingTime = 0; // le temps d'attente total
    totalCost = 0; // le cout total (prix des vols + cout des temps d'attente)
    list18Flights=[]; // contient ma liste de 9 vols alléés / 9 vols retours


    computeCost() {
    
        let cost = 0;
        // Get the prices of the flights
        this.list18Flights.forEach((flight) => {
            cost += flight.price;
        });
        
        this.flightsPrice += cost;
    
        // Add the cost of the waiting time in arrival to LHR airport
        this.list18Flights
            .filter(flight => flight.destination === "LHR")
            .forEach(flight => {
                const waitingTime = (dateDepartureBusAtLondonAirport - new Date(flight.arrival_time)) / 60000;
                cost += Math.floor(waitingTime) * Solution.minuteCost;
            });
    
            
        // Add the cost of the waiting time in departure from LHR airport
        this.list18Flights
            .filter(flight => flight.origin === "LHR")
            .forEach(flight => {
                const waitingTime = (new Date(flight.departure_time) - dateArrivalBusAtLondonAirport) / 60000;
                this.waitingTime += waitingTime; // ajoute le temps d'attente à mon attribut
                cost += Math.floor(waitingTime) * Solution.minuteCost;
            });
    
        // Add the cost of the bus
        this.totalCost = cost;
    }
}