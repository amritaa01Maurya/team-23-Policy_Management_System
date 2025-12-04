const PolicyCard = ({ product, onSelect }) => {
  // show summary of product card
  return (
    <div className="policy-card">
      <h3>{product.name}</h3>
      <p>Type: {product.type}</p>
      <p>Base Premium: ₹{product.basePremium}</p>
      <p>Term: {product.termYears} year(s)</p>
      <button onClick={() => onSelect(product)}>View & Purchase</button>
    </div>
  );
};

export default PolicyCard;
