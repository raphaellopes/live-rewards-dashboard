import UserProfile from './components/user-profile';
import RewardGrid from './components/reward-grid';
import Cart from './components/cart';
import { UserProfileProvider } from './contexts/user-profile';
import { CartProvider } from './contexts/cart';

// mocked data for for testing UI
const TOTAL_POINTS = 50000;

function App() {
  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Rewards Dashboard</h1>
        <p className="page-subtitle">
          Build your points balance and redemption UI here.
        </p>
      </header>

      <UserProfileProvider name="John Doe" points={TOTAL_POINTS}>
        <CartProvider>
          <main className="page-content">
            <UserProfile />
            <div className="flex flex-col sm:flex-row gap-4">
              <Cart />
              <div className="flex-1">
                <RewardGrid />
              </div>
            </div>
          </main>
        </CartProvider>
      </UserProfileProvider>
    </div>
  );
}

export default App;
