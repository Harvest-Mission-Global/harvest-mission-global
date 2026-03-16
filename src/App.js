import './App.css';
import backgroundImage from './images/background.jpg';

function App() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ fontFamily: 'DM Sans', fontSize: '2rem',  color:"black", fontStyle: 'italic' }}>Welcome to</div>
      <div style={{ fontFamily: 'DM Sans', fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', color:"black" }}>Harvest Mission Global</div>
      <div>
        <a href="https://www.atx.hmccglobal.org/" style={{ margin: '0 1rem', padding: '0.5rem 1rem', fontSize: '1.2rem', backgroundColor: '#c3d2ff', border: 'none', borderRadius: '20px', textDecoration: 'none', color: 'black', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', display: 'inline-block' }}>Austin</a>
        <a href="https://hk.hmccglobal.org/" style={{ margin: '0 1rem', padding: '0.5rem 1rem', fontSize: '1.2rem', backgroundColor: '#c3d2ff', border: 'none', borderRadius: '20px', textDecoration: 'none', color: 'black', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', display: 'inline-block' }}>Hong Kong</a>
      </div>
    </div>
  );
}

export default App;
