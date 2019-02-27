// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0

class Neighborhood {
	constructor(name) {
    this.id = ++neighborhoodId;
		this.name = name;
		store.neighborhoods.push(this);
	}

	deliveries() {
		return store.deliveries.filter(
			function(delivery) {
				return delivery.neighborhoodId === this.id}.bind(this));
	}

	customers() {
		return store.customers.filter(
			function(customer) {
				return customer.neighborhoodId === this.id}.bind(this));
	}

	meals() {
		return [...new Set(this.deliveries().map((delivery) => delivery.mealId))]};
}

let customerId = 0

class Customer {
	constructor(name, neighborhoodId ={}) {
		this.name = name;
		this.neighborhoodId = neighborhoodId;
		this.id = ++customerId;
		store.customers.push(this);
	}

	deliveries() {
		return store.deliveries.filter(
			function(delivery) {
				return delivery.customerId === this.id}.bind(this));
	}

	meals() {
		return this.deliveries().map(delivery => delivery.meal());
	}

	totalSpent() {
		return this.meals().reduce((sum, meal) => {
			return sum + meal.price;},0);};
}

let mealId = 0
//class of Meal
class Meal {
	constructor(title, price) {
		this.id = ++mealId;
		this.title = title;
		this.price = price;
		store.meals.push(this);
	}

	deliveries() {
		return store.deliveries.filter(
			function(delivery) {
				return	delivery.mealId === this.id}.bind(this));
	}

	customers() {
		return this.deliveries().map(delivery => {
			return delivery.customer()});
	}

	static byPrice() {
		return store.meals.sort(function(m1, m2) {return m2.price - m1.price});};
}

let deliveryId = 0

class Delivery {
	constructor(mealId, neighborhoodId, customerId={}) {
		this.mealId = mealId;
		this.neighborhoodId = neighborhoodId;
		this.customerId = customerId;
		this.id = ++deliveryId;
		store.deliveries.push(this);
	}

	meal() {
		return store.meals.find(
			function(meals) {
				return meals.id === this.mealId}.bind(this));
	}

	customer() {
		return store.customers.find(
			function(customer) {
				return customer.id === this.customerId}.bind(this));
	}

	neighborhood() {
		return store.neighborhoods.find(
			function(neighborhood) {
				return neighborhood.id === this.neighborhoodId}.bind(this));};
      }
