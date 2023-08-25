export const userAction = (user) => {
  return {
    type: 'ADD_USER',
    payload: user,
  };
};
