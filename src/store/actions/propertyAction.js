import axios from "axios";
import { GET_SINGLE_PROPERTIES } from "store/types";
import { GET_PROPERTIES } from "store/types";

export const getProperties = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "https://65169bb809e3260018ca017c.mockapi.io/listing-properties"
    );
    console.log("data", data);
    dispatch({
      type: GET_PROPERTIES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProperty = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://65169bb809e3260018ca017c.mockapi.io/listing-properties/${id}`
    );
    console.log("data", data);
    dispatch({
      type: GET_SINGLE_PROPERTIES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
