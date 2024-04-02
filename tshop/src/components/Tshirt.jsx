import { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
    const tincome = (parseInt(start) - parseInt(end)) * item.price;
    updateTotalIncome(item.id, tincome);
  }, [start, end, item, updateTotalIncome]);

  return (
    <div>
      <span>Typ koszulki: </span> {item.type} <br />
      Stan początkowy:
      <input
        type="number"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <br />
      <span>Stan końcowy: </span>
      <input
        type="number"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      /> <br />
      <span>Cena:</span>
      {item.price} zł
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
