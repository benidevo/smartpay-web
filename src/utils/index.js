export const generateActions = (action) => {
  action = action.toUpperCase();
  return {
    REQUEST: `${action}_REQUEST`,
    SUCCESS: `${action}_SUCCESS`,
    FAILURE: `${action}_FAILURE`,
  };
};
