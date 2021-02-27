
export const BUY_CAR = 'BUY_CAR';
export const SET_CARS = 'SET_CARS';
export const SHOW_CAR = 'SHOW_CAR';
export const MODAL_OPEN = 'MODAL_OPEN';
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
export const showCarDetails = car => {
  return {
    type: SHOW_CAR,
    payload: car
  }
}

export const setCarModal = modalOpen => {
  return {
    type: MODAL_OPEN,
    payload: modalOpen
  }
}
