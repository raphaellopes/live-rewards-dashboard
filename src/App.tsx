import UserProfile from './components/user-profile';
import RewardGrid from './components/reward-grid';
import Cart from './components/cart';

function App() {
  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Rewards Dashboard</h1>
        <p className="page-subtitle">
          Build your points balance and redemption UI here.
        </p>
      </header>

      <main className="page-content">
        <UserProfile />
        <div className="flex flex-col sm:flex-row gap-4">
          <Cart />
          <div className="flex-1">
            <RewardGrid />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
