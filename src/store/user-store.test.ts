import useUserStore from './user-store';
import { DEFAULT_USER_TOTAL_POINTS } from '../data/constants';

describe('store/user-store', () => {
  it('initializes with default total points', () => {
    expect(useUserStore.getState().totalPoints).toBe(DEFAULT_USER_TOTAL_POINTS);
  });

  it('updates total points via setTotalPoints', () => {
    useUserStore.getState().setTotalPoints(12000);

    expect(useUserStore.getState().totalPoints).toBe(12000);
  });
});
