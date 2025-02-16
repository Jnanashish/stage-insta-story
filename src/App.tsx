import React from 'react';
import './App.css';

import Story from './components/Story';
import Layout from './layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Story/>
      </Layout>
    </div>
  );
}

export default App;
