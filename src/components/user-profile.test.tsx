import UserProfile from './user-profile';
import { render, screen, seedUserPoints } from '../test/test-utils';

describe('UserProfile', () => {
  it('renders the user name', () => {
    render(<UserProfile />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'John Doe' })
    ).toBeInTheDocument();
  });

  it('displays formatted points from the store', () => {
    render(<UserProfile />);

    expect(screen.getByText('50,000 points')).toBeInTheDocument();
  });

  it('reflects updated points when store state changes', () => {
    seedUserPoints(1);

    render(<UserProfile />);

    expect(screen.getByText('1 point')).toBeInTheDocument();
  });

  it('reflects zero points', () => {
    seedUserPoints(0);

    render(<UserProfile />);

    expect(screen.getByText('0 points')).toBeInTheDocument();
  });
});
