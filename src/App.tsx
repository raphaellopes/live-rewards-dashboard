import UserProfile from './components/user-profile';
import RewardGrid, { type RewardCategory } from './components/reward-grid';
import Cart from './components/cart';

// mocked data for for testing UI
const MOCKED_REWARDS = [
  { id: '1', name: 'Free Flight to Iceland', cost: 45000, category: 'travel' },
  {
    id: '2',
    name: 'Luxury Hotel Upgrade (1 Night)',
    cost: 12000,
    category: 'travel',
  },
  { id: '3', name: '$50 Amazon Gift Card', cost: 5000, category: 'gift-card' },
  {
    id: '4',
    name: '$100 Starbucks Gift Card',
    cost: 9500,
    category: 'gift-card',
  },
  {
    id: '5',
    name: 'Noise-Canceling Headphones',
    cost: 20000,
    category: 'merchandise',
  },
];

function App() {
  const rewardItems = MOCKED_REWARDS.map((reward) => ({
    id: reward.id,
    name: reward.name,
    category: reward.category as RewardCategory,
    points: reward.cost,
    // @TODO: implement the logic from the props below
    onAddToCart: () => {},
    isAddToCartDisabled: false,
  }));

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Rewards Dashboard</h1>
        <p className="page-subtitle">
          Build your points balance and redemption UI here.
        </p>
      </header>

      <main className="page-content">
        <UserProfile name="John Doe" points={50000} />
        <div className="flex flex-col sm:flex-row gap-4">
          <Cart items={[]} totalPoints={0} onClickRedeem={() => {}} />
          <div className="flex-1">
            <RewardGrid items={rewardItems} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
