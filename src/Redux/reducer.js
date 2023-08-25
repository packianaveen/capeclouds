const initialUser = {
  user: [],
};

const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
