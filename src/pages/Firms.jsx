import { useEffect } from "react";
import useStockCalls from "../hooks/useStockCalls";

const Firms = () => {
  const { getFirms } = useStockCalls();

  useEffect(() => {
    getFirms();
  }, []);

  return <div></div>;
};

export default Firms;
