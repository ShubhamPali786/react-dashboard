import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './hoc/layout/layout';
import Covid19Dashboard from '../src/container/Covid19Dashboard/covid19Dashboard';
function App() {
  return (
    <Layout>
      <Covid19Dashboard/>
    </Layout>
  );
}

export default App;
