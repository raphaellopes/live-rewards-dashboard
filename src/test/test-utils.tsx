import useUserStore from '../store/user-store';
import useCartStore from '../store/cart-store';

export function seedUserPoints(totalPoints: number) {
  useUserStore.setState({ totalPoints });
}

export function seedCart(itemIds: string[]) {
  useCartStore.setState({ itemIds });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
