import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import '../App.css'

const Tshirt = ({ item, updateTotalIncome }) => {
  const localStorageKeyStart = `start_${item.id}`;
  const localStorageKeyEnd = `end_${item.id}`;

  const [start, setStart] = useState(() => {
    return localStorage.getItem(localStorageKeyStart) || "";
  });

  const [end, setEnd] = useState(() => {
    return localStorage.getItem(localStorageKeyEnd) || "";
  });

  useEffect(() => {
    localStorage.setItem(localStorageKeyStart, start);
  }, [start, localStorageKeyStart]);

  useEffect(() => {
    localStorage.setItem(localStorageKeyEnd, end);
  }, [end, localStorageKeyEnd]);

  useEffect(() => {
    const tincome = (parseInt(start) - parseInt(end)) * item.price >= 0 ? ((parseInt(start) - parseInt(end)) * item.price ) : ( 0 ) ;
    updateTotalIncome(item.id, tincome);
  }, [start, end, item, updateTotalIncome]);

  return (
    <div>
      <span className="span">Typ koszulki: <strong>{item.type}</strong> </span>  
      <label>
      Stan początkowy:
      <input
        type="number"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      </label>
      <label>
      Stan końcowy:
      <input
        type="number"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      /> 
      <span className="cena">Cena: {item.price} zł </span>

      </label>              
      <span>Dochód: {(parseInt(start) - parseInt(end)) * item.price >= 0 ? ((parseInt(start) - parseInt(end)) * item.price ) : ( <span className="alert">UWAGA: błędny zapis!</span>  ) } </span>
      <hr />
    </div>
    
  );
};

Tshirt.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  updateTotalIncome: PropTypes.func.isRequired,
};

export default Tshirt;
