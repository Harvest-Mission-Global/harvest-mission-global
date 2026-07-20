import React, { useEffect, useState } from 'react';
import HmgHome from './pages/HmgHome';
import TenYearCommitment from './pages/TenYearCommitment';

function getPath() {
  const hash = window.location.hash.slice(1);
  return hash || '/';
}

function App() {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onHashChange = () => setPath(getPath());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (path === '/10y-commitment') {
    return <TenYearCommitment />;
  }

  return <HmgHome />;
}

export default App;
