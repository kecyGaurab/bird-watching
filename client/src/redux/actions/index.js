export const addBird = (bird) => ({
  type: 'ADD_BIRD',
  payload: bird,
});

export const removeBird = (bird) => ({
  type: 'REMOVE_BIRD',
  payload: bird,
});
