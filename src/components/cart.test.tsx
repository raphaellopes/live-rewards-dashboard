import Cart from './cart';
import useCartStore from '../store/cart-store';
import useUserStore from '../store/user-store';
import { DEFAULT_USER_TOTAL_POINTS } from '../data/constants';
import {
  render,
  screen,
  seedCart,
  seedUserPoints,
  userEvent,
} from '../test/test-utils';

describe('Cart', () => {
  it('renders heading and empty state when cart is empty', () => {
    render(<Cart />);

    expect(screen.getByRole('heading', { name: 'Cart' })).toBeInTheDocument();
    expect(screen.getByText('0 points')).toBeInTheDocument();
    expect(
      screen.getByText(
        'No items in cart. Please add some items to your cart from the rewards table using the "Add to Cart" button.'
      )
    ).toBeInTheDocument();
  });

  it('disables redeem button when cart is empty', () => {
    render(<Cart />);

    expect(screen.getByRole('button', { name: 'Redeem' })).toBeDisabled();
  });

  it('displays cart items and total when cart has items', () => {
    seedCart(['3', '4']);

    render(<Cart />);

    expect(
      screen.getByText('$50 Amazon Gift Card - 5,000 points')
    ).toBeInTheDocument();
    expect(
      screen.getByText('$100 Starbucks Gift Card - 9,500 points')
    ).toBeInTheDocument();
    expect(screen.getByText('14,500 points')).toBeInTheDocument();
    expect(
      screen.queryByText(/No items in cart/)
    ).not.toBeInTheDocument();
  });

  it('shows remaining points message when cart has items', () => {
    seedUserPoints(DEFAULT_USER_TOTAL_POINTS);
    seedCart(['3']);

    render(<Cart />);

    expect(
      screen.getByText('You will have 45,000 points left after redeeming.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Redeem' })).toBeEnabled();
  });

  it('redeems items by deducting points and clearing the cart', async () => {
    const user = userEvent.setup();
    seedUserPoints(DEFAULT_USER_TOTAL_POINTS);
    seedCart(['3']);

    render(<Cart />);

    await user.click(screen.getByRole('button', { name: 'Redeem' }));

    expect(useUserStore.getState().totalPoints).toBe(45000);
    expect(useCartStore.getState().itemIds).toEqual([]);
    expect(
      screen.getByText(
        'No items in cart. Please add some items to your cart from the rewards table using the "Add to Cart" button.'
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Redeem' })).toBeDisabled();
  });
});
