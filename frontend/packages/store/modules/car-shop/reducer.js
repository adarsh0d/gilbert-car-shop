import { BUY_CAR, SET_CARS, SHOW_CAR, MODAL_OPEN } from "./actions";

const INITIAL_STATE = {
    cars: [],
    carsInBasket: [],
    carToShow: {},
    basketValue: 0,
    loaded: false,
    modalOpen: false
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
        case SHOW_CAR:
          const carToShow = action.payload;
          const basketIndex = state.carsInBasket.findIndex((car) => car === carToShow.id);
          if(basketIndex > -1) {
            carToShow['alreadyInBasket'] = true;
          }
          return {
            ...state,
            carToShow: carToShow,
            modalOpen: true
        };
        case MODAL_OPEN:
          return {
            ...state,
            modalOpen: action.payload
        }
        default: return state
    }
}
