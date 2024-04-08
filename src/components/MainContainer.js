import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [originalStocks, setOriginalStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    const response = await fetch("http://localhost:3001/stocks");
    const data = await response.json();
    setStocks(data);
    setOriginalStocks(data);
  };

  const handleBuyStock = (stockId) => {
    const stockToBuy = stocks.find((stock) => stock.id === stockId);
    setPortfolioStocks([...portfolioStocks, stockToBuy]);
  };

  const handleSellStock = (stockId) => {
    const updatedPortfolio = portfolioStocks.filter((stock) => stock.id !== stockId);
    setPortfolioStocks(updatedPortfolio);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    let sortedStocks = [...stocks];
    if (criteria === "Alphabetically") {
      sortedStocks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "Price") {
      sortedStocks.sort((a, b) => a.price - b.price);
    }
    setStocks(sortedStocks);
  };

  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
    if (criteria === "All") {
      setStocks(originalStocks); 
    } else {
      const filteredStocks = originalStocks.filter((stock) => stock.type === criteria);
      setStocks(filteredStocks);
    }
  };

  return (
    <div>
      <SearchBar onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} onBuyStock={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolioStocks={portfolioStocks} onSellStock={handleSellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
