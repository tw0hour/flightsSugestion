export class Flight {
    stops;
    origin;
    destination;
    departure_time;
    arrival_time;
    airline;

    constructor(data) {
        this.stops = data.stops;
        this.origin = data.origin;
        this.destination = data.destination;
        this.departure_time = data.departure_time;
        this.arrival_time = data.arrival_time;
        this.airline = data.airline;
    }

}