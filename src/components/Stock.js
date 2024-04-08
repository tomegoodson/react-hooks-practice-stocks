import React from "react";

function Stock({ stock, onClick }) {
  const { ticker, name, type, price } = stock;

  return (
    <div className="card" onClick={onClick}>
      <div className="card-body">
        <h5 className="card-title">{name} ({ticker})</h5>
        <p className="card-text">{type}</p>
        <p className="card-text">${price}</p>
      </div>
    </div>
  );
}

export default Stock;
