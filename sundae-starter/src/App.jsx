import { useEffect } from 'react';
import Options from './pages/entry/Options';
import SummaryForm from './pages/summary/SummaryForm';
import axios from 'axios';

function App() {
  return (
    <div>
      <Options optionType={'scoops'} />
      <Options optionType={'toppings'} />
      <SummaryForm />
    </div>
  );
}

export default App;
