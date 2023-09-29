const initialState = {
  all_properties: [],
  singleProperty: null,
};

export default function propertyReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "GET_PROPERTIES":
      return {
        ...state,
        all_properties: payload,
      };
    case "GET_SINGLE_PROPERTIES":
      return {
        ...state,
        singleProperty: payload,
      };

    default:
      return { ...state };
  }
}
