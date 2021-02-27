import { BUY_CAR, SET_CARS, SHOW_CAR, MODAL_OPEN } from "./actions";

const INITIAL_STATE = {
    cars: [],
    carsInBasket: [],
    carToShow: null,
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
          const carToBuy = state.cars.find((car) => car.id === action.payload);
          return {
            ...state,
            cars: state.cars.map(car =>
              car.id === action.payload ? { ...car, alreadyInBasket: true } : car
            ),
            carsInBasket: [...state.carsInBasket, action.payload],
            basketValue: state.basketValue + carToBuy?.carInfo?.price,
            carToShow: {
              ...state.carToShow,
              alreadyInBasket: true
            }
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
