import RewardGrid from './reward-grid';
import useCartStore from '../store/cart-store';
import { CATEGORY_NAME_MAP, MOCKED_REWARDS } from '../data/constants';
import {
  render,
  screen,
  seedUserPoints,
  userEvent,
  within,
} from '../test/test-utils';

function getRewardRow(rewardName: string) {
  const nameEl = screen.getByText(rewardName);
  const row = nameEl.closest('.grid');

  if (!row) {
    throw new Error(`Could not find reward row for "${rewardName}"`);
  }

  return row as HTMLElement;
}

function getAddToCartButton(rewardName: string) {
  return within(getRewardRow(rewardName)).getByRole('button', {
    name: 'Add to Cart',
  });
}

describe('RewardGrid', () => {
  it('renders all mocked rewards with name, cost, and category', () => {
    render(<RewardGrid />);

    for (const reward of MOCKED_REWARDS) {
      expect(screen.getByText(reward.name)).toBeInTheDocument();
      expect(
        within(getRewardRow(reward.name)).getByText(
          `${reward.cost.toLocaleString()} points`
        )
      ).toBeInTheDocument();
      expect(
        within(getRewardRow(reward.name)).getByText(
          CATEGORY_NAME_MAP[reward.category]
        )
      ).toBeInTheDocument();
    }
  });

  it('enables add to cart for affordable rewards with default points', () => {
    render(<RewardGrid />);

    for (const reward of MOCKED_REWARDS) {
      expect(getAddToCartButton(reward.name)).toBeEnabled();
    }
  });

  it('disables unaffordable rewards and shows insufficient points message', () => {
    seedUserPoints(40000);

    render(<RewardGrid />);

    const icelandFlight = getAddToCartButton('Free Flight to Iceland');
    expect(icelandFlight).toBeDisabled();
    expect(
      within(getRewardRow('Free Flight to Iceland')).getByText(
        'Insufficient points'
      )
    ).toBeInTheDocument();
    expect(getAddToCartButton('$50 Amazon Gift Card')).toBeEnabled();
  });

  it('adds a reward to the cart when add to cart is clicked', async () => {
    const user = userEvent.setup();

    render(<RewardGrid />);

    await user.click(getAddToCartButton('$50 Amazon Gift Card'));

    expect(useCartStore.getState().itemIds).toEqual(['3']);
  });

  it('disables rewards when the cart consumes remaining points', async () => {
    const user = userEvent.setup();

    render(<RewardGrid />);

    await user.click(getAddToCartButton('Free Flight to Iceland'));
    await user.click(getAddToCartButton('$50 Amazon Gift Card'));

    expect(getAddToCartButton('Luxury Hotel Upgrade (1 Night)')).toBeDisabled();
    expect(
      within(getRewardRow('Luxury Hotel Upgrade (1 Night)')).getByText(
        'Insufficient points'
      )
    ).toBeInTheDocument();
    expect(getAddToCartButton('$50 Amazon Gift Card')).toBeDisabled();
  });
});
