import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import useAxios from "./useAxios";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

//! Get Calls ///////////////
const useStockCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();
  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getFirms = async () => getStockData("firms");
  const getSales = async () => getStockData("sales");
  const getCategories = async () => getStockData("categories");
  const getBrands = async () => getStockData("brands");
  const getProducts = async () => getStockData("products");

  //! ......Delete Calls ----------/////

  const deleteStockData = async (url, id) => {
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      toastSuccessNotify(`${url} seccessfuly deleted`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be deleted`);
    }
  };
  const deleteFirm = (id) => deleteStockData("firms", id);
  const deleteBrand = (id) => deleteStockData("brands", id);
  const deleteProduct = (id) => deleteStockData("products", id);

  //! ------ POST CALLS ----------------//////////

  const postStockData = async (info, url) => {
    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} seccessfuly added`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be added`);
    }
  };
  const postFirm = (info) => postStockData(info, "firms");
  const postBrand = (info) => postStockData(info, "brands");
  const postProduct = (info) => postStockData(info, "products");

  //! ---------- PUT CALLS -------- ///////////
  const putStockData = async (info, url) => {
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} seccessfuly updated`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be updated`);
    }
  };
  const putFirm = (info) => putStockData(info, "firms");
  const putBrand = (info) => putStockData(info, "brands");

  return {
    getStockData,
    getFirms,
    getSales,
    getCategories,
    getProducts,
    getBrands,
    deleteFirm,
    deleteBrand,
    deleteProduct,
    postFirm,
    postStockData,
    postBrand,
    postProduct,
    putFirm,
    putStockData,
    putBrand,
  };
};

export default useStockCalls;
