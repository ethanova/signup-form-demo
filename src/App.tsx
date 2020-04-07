import React from 'react';
import { Radio } from 'antd';
import logo from './logo.svg';
import './App.css';
import AntForm from './AntD-Form/AntForm';
import RegistrationForm from './Custom-Form/RegistrationForm';

const App = () => {
  const [formToShow, setFormToShow] = React.useState('custom');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Please register your new username and password!</p>
      </header>
      <div>
        <Radio.Group value={formToShow} onChange={(e) => setFormToShow(e.target.value)}>
          <Radio value="custom">Custom Form</Radio>
          <Radio value="antd">Ant.D Form</Radio>
        </Radio.Group>
        <br />
        <br />
        {formToShow === 'custom' && <RegistrationForm />}
        {formToShow === 'antd' && <AntForm />}
      </div>
    </div>
  );
};

export default App;
