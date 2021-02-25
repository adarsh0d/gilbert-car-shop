import { BUY_CAR, SET_CARS } from "./actions";

const INITIAL_STATE = {
    cars: [],
    carsInBasket: [],
    carToShow: {},
    basketValue: 0
};
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CARS:
          return {
            ...state,
            cars: action.payload
        };
        case BUY_CAR:
          return {
            ...state,
            carsInBasket: [...state.carsInBasket, action.payload.id],
            basketValue: state.basketValue + action.payload.carInfo.price
        };
        default: return state
    }
}
