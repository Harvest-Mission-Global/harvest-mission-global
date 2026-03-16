import './App.css';
import backgroundImage from './images/background.jpg';

function App() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* <h1>Header Placeholder</h1> */}
    </div>
  );
}

export default App;
