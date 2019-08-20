import Movie from './movie.js';
import Settings from './settings.js';

export default class Customer {
    constructor(name) {
        this._name = name;
        this.rentals = [];
        this.costStrategyManager = Settings.costStrategyManager;
        this.calcFrequentRenterPoints = Settings.calcFrequentRenterPoints;
    }
    get name() {
        return this._name;
    }
    addRental(args) {
        this.rentals.push(args);
    }
    statement() {
        let bills = this.rentals.map(rent => {
            let amount = this.costStrategyManager.getStrategy(rent.movie.priceCode).doAction(rent);
            let message = '  ' + rent.movie.title + '  ' + amount + '\n';
            let frequentRenterPoints = this.calcFrequentRenterPoints(rent);

            return {
                amount: amount,
                frequentRenterPoints: frequentRenterPoints,
                message: message
            }
        });

        let frequentRenterPoints = bills.reduce((a, bill) => a + bill.frequentRenterPoints, 0);
        let totalAmount = bills.reduce((a, bill) => a + bill.amount, 0);
        let result = `Rental Record for ${this._name}\n`;
        result += bills.reduce((a, bill) => a + bill.message, '');

        result += `Amount owed is ${totalAmount}\n`;
        result += `You earned ${frequentRenterPoints} frequent renter points\n`;
        return result;
    }
}
