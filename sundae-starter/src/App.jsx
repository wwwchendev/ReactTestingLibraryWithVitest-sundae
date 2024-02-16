import { useEffect } from 'react';
import Options from './pages/entry/Options';
import OrderEntry from './pages/entry/OrderEntry';
import SummaryForm from './pages/summary/SummaryForm';
import axios from 'axios';

function App() {
  return (
    <div>
      <OrderEntry />
      {/* <Options optionType={'scoops'} />
      <Options optionType={'toppings'} /> */}
      <SummaryForm />
    </div>
  );
}

export default App;
