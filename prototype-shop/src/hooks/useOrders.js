import { useContext } from "react";
import AppStateContext from "../contexts/AppStateContext";

function useOrders() {
  const {orders} = useContext(AppStateContext);

  return orders;
}

export default useOrders;