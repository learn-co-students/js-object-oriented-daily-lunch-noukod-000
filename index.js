let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let Neighborhood = createNeighborhood();
let Customer = createCustomer();
let Meal = createMeal();
let Delivery = createDelivery();

function createNeighborhood(){
    let neighborhoodId = 0;

    return class Neighborhood{
        constructor(name){
            this.name = name;
            this.id = ++neighborhoodId;
            store.neighborhoods.push(this);
        }

        deliveries(){
            return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
        }

        customers(){
            return store.customers.filter(customer => customer.neighborhoodId === this.id);
        }

        meals(){
            return this.deliveries().reduce(function(agg,deivery){
                if(!agg.includes(deivery.meal())){
                    return [...agg, deivery.meal()];
                }
                return agg;
            },[])
        }
    }
}

function createCustomer(){
    let CustomerId = 0;

    return class Customer{
        constructor(name, neighborhoodId){
            this.name = name;
            this.id = ++CustomerId;
            this.neighborhoodId = neighborhoodId;
            store.customers.push(this);
        }

        deliveries(){
            return store.deliveries.filter(delivery => delivery.customerId === this.id);
        }

        meals(){
            return this.deliveries().map(delivery => delivery.meal());
        }

        totalSpent(){
            return this.meals().reduce(function(total, meal){
                return total + meal.price;
            },0)
        }
    }
}

function createMeal(){
    let MealId = 0;

    return class Meal{
        constructor(title, price){
            this.title = title;
            this.id = ++MealId;
            this.price = price;

            store.meals.push(this);
        }

        deliveries(){
            return store.deliveries.filter(delivery => delivery.mealId === this.id);
        }

        customers(){
            return this.deliveries().map(delivery => delivery.customer());
        }

        static byPrice(){
            return [...store.meals].sort((meal1, meal2) => meal2.price - meal1.price);
        }
    }
}

function createDelivery(){
    let DeliveryId = 0;

    return class Delivery{
        constructor(mealId, neighborhoodId, customerId){
            this.id = ++DeliveryId;
            this.mealId = mealId;
            this.customerId = customerId;
            this.neighborhoodId = neighborhoodId;

            store.deliveries.push(this);
        }

        customer(){
            return store.customers.find(customer => customer.id === this.customerId);
        }

        neighborhood(){
            return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
        }

        meal(){
            return store.meals.find(meal => meal.id === this.mealId);
        }
    }
}
