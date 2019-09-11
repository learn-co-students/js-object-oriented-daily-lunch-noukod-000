let store = { neighborhoods:[], customers: [], meals:[], deliveries:[] }

const Neighborhood = ( () => {
    let neighborhoodIds = 1;
    return class{
        constructor(name){
            this.id = neighborhoodIds++;
            this.name = name;
            store.neighborhoods.push(this)
        }

        customers(){
            return store.customers.filter( customer => customer.neighborhoodId === this.id );
        }

        deliveries(){
            return storNe.deliveries.filter( delivery => delivery.neighborhoodId === this.id )
        }

        meals() {
            const allMeals = this.customers().map(customer => customer.meals());
            const merged = [].concat.apply([], allMeals);
            return [...new Set(merged)];
          }
    }
} )();


//---------------------------------------------------------------------
const Customer = ( () =>{
    let customerIds = 1;
    return class{
        constructor(name, neighborhoodId){
            this.neighborhoodId = neighborhoodId;
            this.id = customerIds++;
            this.name = name;
            store.customers.push(this)
        }

        deliveries(){
            return store.deliveries.filter( delivery => delivery.customerId === this.id );
        }

        meals(){
            return this.deliveries().map( delivery => delivery.meal() )
        }
    }
} )();



//---------------------------------------------------------------------
const Meal = ( ()=>{
    let mealIds = 1;
    return class{
        constructor(title, price = 0){
            this.id = mealIds++;
            this.title = title;
            this.price = price;
        }

        deliveries(){
            return store.deliveries.filter(delivery => delivery.mealId === this.id )
        }
    }
} )();


const Delivery = ( ()=>{
    let deliveryIds = 1;
    return class{
        constructor(customerId, mealId, neighborhoodId){
            this.neighborhoodId = neighborhoodId;
            this.customerId = customerId;
            this.mealId = mealId;
            store.deliveries.push(this);
        }

        meal() {
            return store.meals.find(meal => meal.id === this.mealId);
          }
    }
} )();

const syndie = new Customer("Syndie", 1);       // a customer
const rice = new Meal("Rice with Peas", 20);    // a meal
const delmas = new Neighborhood("Delmas");      // a neighborhood

const delivery1 = new Delivery(1, 1, 1);
