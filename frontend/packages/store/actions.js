
export const BUY_CAR = 'BUY_CAR';
export const SET_CARS = 'SET_CARS';
export const setAllCars = (payload) => {
  return {
      type: SET_CARS,
      payload: payload
  }
};
export const buyCar = car => {
    return {
        type: BUY_CAR,
        payload: car
    }
};
