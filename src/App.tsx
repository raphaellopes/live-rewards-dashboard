import UserProfile from './components/user-profile';

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
        <UserProfile name="John Doe" points={50000} />
      </main>
    </div>
  );
}

export default App;
