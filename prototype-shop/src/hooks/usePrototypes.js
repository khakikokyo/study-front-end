import { useContext } from "react";
import AppStateContext from "../contexts/AppStateContext";

function usePrototypes() {
  const {prototypes} = useContext(AppStateContext);

  return prototypes;
}

export default usePrototypes;