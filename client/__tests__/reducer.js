import reducer from '../reducers/reducer';

describe('trail reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      listTrails: [],
      moreInfo: {},
    };
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'aajsbicawlbejckr' };
      expect(reducer(initialState, action)).toBe(initialState);
    });
  });
});
