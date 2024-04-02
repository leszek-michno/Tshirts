import { useState } from 'react';
import './App.css'
import Tshirt from './components/Tshirt'
import { tArray } from './data/tArray'

function App() {

  const [totalIncome, setTotalIncome] = useState(0);

  const updateTotalIncome = (itemId, income) => {
    setTotalIncome(() => {
      const itemIndex = tArray.findIndex((item) => item.id === itemId);
      const newArray = [...tArray];
      newArray[itemIndex].income = income;
      const newTotalIncome = newArray.reduce(
        (accumulator, currentItem) => accumulator + currentItem.income,
        0
      );
      return newTotalIncome;
    });
  };

 
  return (
    <div>
      {tArray.map((item) => (
        <Tshirt key={item.id} item={item} updateTotalIncome={updateTotalIncome}/>
      ))}
      <div>
        <h2>Suma dochodów: {totalIncome}</h2>
      </div>
    </div>
  )
}

export default App
