export const Types = {
  SET_RESTAURANT: 'restaurants/SET_RESTAURANT',
  SET_RESTAURANTS: 'restaurants/SET_RESTAURANTS',
};

const initialState = {
  restaurants: [],
  restaurantSelected: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_RESTAURANT:
      return { ...state, restaurantSelected: action.paylaod };
    case Types.SET_RESTAURANTS:
      return { ...state, restaurants: action.paylaod };
    default:
      return state;
  }
}

export function setRestaurant(restaurant) {
  return {
    type: Types.SET_RESTAURANT,
    paylaod: restaurant,
  };
}

export function setRestaurants(restaurants) {
  return {
    type: Types.SET_RESTAURANTS,
    paylaod: restaurants,
  };
}
