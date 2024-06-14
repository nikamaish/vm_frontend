import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import './CryptoRest.css';
import { Link } from 'react-router-dom';
import Converter from './converter/Converter'

function CryptoMonths() {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCryptos, setSelectedCryptos] = useState(['BTC']);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [selectedGraphType, setSelectedGraphType] = useState('line'); // Default to line graph

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = selectedCryptos.map(crypto => {
          return axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${crypto}&tsym=USD&limit=30`);
        });

        const responses = await Promise.all(requests);
        const cryptoDatas = responses.map(response => response.data.Data.Data);

        const highestPrices = cryptoDatas.map(cryptoData => {
          return cryptoData.map(item => item.high);
        });

        setChartData({
          labels: cryptoDatas[0].map(item => new Date(item.time * 1000).toLocaleDateString()), // Dates as labels
          datasets: highestPrices.map((prices, index) => ({
            label: `${selectedCryptos[index]} Highest Price (USD)`,
            data: prices,
            fill: true,
            backgroundColor: 'rgba(0, 128, 0, 0.1)', // Example color
            borderColor: 'darkgreen', // Example color
            borderWidth: 1,
            pointRadius: 0,
          })),
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCryptos]);

  const handleGraphTypeChange = (event) => {
    const newGraphType = event.target.value;
    setSelectedGraphType(newGraphType);
  };

  const handleCryptoSelection = event => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedCryptos(selectedOptions);
  };

  const options = [
    { value: "BTC", label: 'Bitcoin' },
    { value: 'ETH', label: 'Ethereum' },
    { value: 'USDT', label: 'Tether' },
    { value: 'BNB', label: 'Binance' },
    { value: 'SOL', label: 'Solana' },
    { value: 'BCH', label:'Bitcoin Cash '},
    { value: 'DOGE', label: 'Dogecoin' },
    { value: 'XRP', label: 'XRP' },
    { value: 'ADA', label: 'Cardano' },
    { value: 'AVAX', label: 'Avalanche' },
    { value: 'DOT', label: 'Polkadot' },
    { value: 'TRX', label: 'Tron' },
    { value: 'LTC', label:'Litecoin '},
    { value: 'LINK', label:'Chainlink '},
  ];

  return (
    <div>

    <div className="rectangle-page">
      <div className="graph-container">
        <p style={{ textAlign: 'center', marginTop: '2vh' }}>Monthly Crypto Price</p>

        <div className='oneline'>
        <div className="timeRest">
          <ul>
          <Link to='/cryptoWebsocket'  ><li  >1S</li></Link>
            <Link to='/cryptoOneday'  ><li >1D</li></Link>
            <Link to='/cryptoweek'  ><li >7D</li></Link>
            <Link to='/cryptomonth'  ><li style={{ backgroundColor: '#3498db' }}>1M</li></Link>
            <Link to='/cryptothreemonths'   ><li>3M</li></Link>
          </ul>
        </div>

        <div multiple value={selectedCryptos} onChange={handleCryptoSelection} style={{ textAlign: 'end', marginTop: '20px', marginRight: '60px' }}>
          <select style={{ height: '40px', width: '120px', fontWeight: '600', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', paddingLeft: '7px' }}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <label style={{ marginRight: '10px', fontSize:'20px', fontFamily:'Inter', fontWeight:600 }}>Graph Type:</label>
          <select
            value={selectedGraphType}
            onChange={handleGraphTypeChange}
            style={{ width:'7vw', height: '30px',fontWeight:600 , fontSize:'17px', cursor: 'pointer', borderRadius: '5px', textAlign:'center' }}
            >
            <option value="line" >Line</option>
            <option value="bar">Bar</option>
          </select>
        </div>

        <div className="chart-container">
          {chartData.datasets.length > 0 ? (
            selectedGraphType === 'line' ? (
              <Line
              data={chartData}
              options={{
                responsive: true,
                layout: {
                    padding: {
                      left: 20,
                      right: 20,
                      top: 0,
                      bottom: 0,
                    },
                  },
                  plugins: {
                    tooltip: {
                      mode: 'nearest', // Show nearest data point on hover
                      intersect: false,
                      callbacks: {
                        title: function (tooltipItems) {
                          // Displaying date with year
                          return new Date(tooltipItems[0].parsed.x).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          });
                        }
                      }
                    },
                  },
                  scales: {
                    x: {
                      type: 'time',
                      time: {
                        unit: 'day',
                        stepSize: 1,
                        displayFormats: {
                          day: 'MMM DD', // Adjusted to display day, month, and year
                        },
                      },
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      ticks: {
                        callback: value => `$${value}`,
                      },
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            ) : (
              <Bar
              data={chartData}
              options={{
                responsive: true,
                  scales: {
                    x: {
                      type: 'time',
                      time: {
                        unit: 'day',
                        stepSize: 1,
                        displayFormats: {
                          day: 'MMM DD',
                        },
                      },
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      ticks: {
                        callback: value => `$${value}`,
                      },
                      grid: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    tooltip: {
                      mode: 'nearest', // Show nearest data point on hover
                      intersect: false,
                      callbacks: {
                        title: function (tooltipItems) {
                          // Displaying date with year
                          return new Date(tooltipItems[0].parsed.x).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          });
                        }
                      }
                    },
                  },
                }}
                />
            )
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    </div>
    <Converter/>
                </div>
  );
}

export default CryptoMonths;
