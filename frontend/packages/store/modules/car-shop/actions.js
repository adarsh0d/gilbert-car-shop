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
export const buyCar = id => {
    return {
        type: BUY_CAR,
        payload: id
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

export const getCars = () => {
  return async function(dispatch) {
    const response = await fetch('/search/cars');
    if (response.ok) {
      const cars = await response.json();
      return dispatch(setAllCars(cars));
    } else {
      console.log('Error');
    }
  }
}
