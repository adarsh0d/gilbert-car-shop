import { BUY_CAR, SET_CARS } from "./actions";

const INITIAL_STATE = {
    cars: [],
    carsInBasket: [],
    carToShow: {},
    basketValue: 0,
    loaded: false
};
export default function carReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CARS:
          return {
            ...state,
            cars: action.payload,
            loaded: true
        };
        case BUY_CAR:
          const carIndex = state.cars.findIndex((car) => car.id === action.payload.id);
          const cars = [...state.cars];
          cars[carIndex].alreadyInBasket = true;
          return {
            ...state,
            cars: cars,
            carsInBasket: [...state.carsInBasket, action.payload.id],
            basketValue: state.basketValue + action.payload.carInfo.price
        };
        default: return state
    }
}
