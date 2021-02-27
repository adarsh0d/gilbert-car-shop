import { CarShopPage } from "./CarShopPage";
import { connect } from "../../packages/store/store";
import { buyCar, showCarDetails, setCarModal, getCars } from '../../packages/store/modules/car-shop/actions';

const mapStateToProps = ({carReducer}) => ({...carReducer});

const mapDispatchToProps = (dispatch) => {
  return {
    showCarDetails: (car) => dispatch(showCarDetails(car)),
    closeModal: () => dispatch(setCarModal(false)),
    buyCar: (car) => dispatch(buyCar(car)),
    getCars: () => dispatch(getCars())
  }
}

class CarShopContainer extends connect(mapStateToProps, mapDispatchToProps)(CarShopPage){
  constructor() {
    super()
  }
  firstUpdated() {
    this.getCars();
  }
}
customElements.define('car-shop', CarShopContainer);
export { CarShopContainer };
