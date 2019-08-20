import Movie from './movie.js';
import Strategy from './strategy.js';
import StrategyManager from './strategy_manager.js';

const regularHandler = new Strategy(Movie.REGULAR, (rent) => {
    let amount = 2;
    if (rent.daysRented > 2) {
        amount += (rent.daysRented - 2) * 1.5;
    }
    return amount;
});
const newReleaseHandler = new Strategy(Movie.NEW_RELEASE, (rent) => {
    let amount = rent.daysRented * 3;
    return amount;
});
const childrensHandler = new Strategy(Movie.CHILDRENS, (rent) => {
    let amount = 1.5;
    if (rent.daysRented > 3) {
        amount += (rent.daysRented - 3) * 1.5;
    }
    return amount;
});

 
const costStrategyManager = new StrategyManager();
costStrategyManager.addStrategy(regularHandler);
costStrategyManager.addStrategy(newReleaseHandler);
costStrategyManager.addStrategy(childrensHandler);

const calcFrequentRenterPoints = (rent) => {
    // add frequent renter points
    let frequentRenterPoints = 1;

    // add bonus for a two day new release rental
    if (rent.movie.priceCode === Movie.NEW_RELEASE && rent.daysRented > 1) {
        frequentRenterPoints++;
    }
    return frequentRenterPoints;
}

module.exports = {
    calcFrequentRenterPoints: calcFrequentRenterPoints,
    costStrategyManager: costStrategyManager
}