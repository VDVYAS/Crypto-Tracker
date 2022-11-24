import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';
/**https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false*/
function App() {
  const [coins, setCoins]=useState([])
  const [search,setSearch]=useState('')
  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      setCoins(res.data)
      console.log(res.data) 
    }).catch(error => console.log("There is error"))
  },[])
  const handleChange= e =>{
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search Coin</h1>
        <form>
          <input type="text" placeholder='Search Crypto' className='coin-input' onChange={handleChange} />
        </form>
      </div>
      {filteredCoins.map(coin=>{
        return(
          <Coin  
          key={coin.id} 
          name={coin.name} 
          Image={coin.image} 
          symbol={coin.symbol} 
          price={coin.current_price} 
          volume={coin.total_volume} 
          priceChange={coin.market_cap_change_percentage_24h}
          marketCap={coin.market_cap}
          />
        ) 
        
      })}
    </div>
  );
}

export default App;
