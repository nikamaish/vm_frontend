import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CryptoRest.css';
import { Link } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import Converter from './converter/Converter'


function CryptoWeek() {
  const [selectedCryptos, setSelectedCryptos] = useState(['BTC']);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [selectedGraphType, setSelectedGraphType] = useState('line');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = selectedCryptos.map(crypto => {
          return axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${crypto}&tsym=USD&limit=168`);
        });

        const responses = await Promise.all(requests);
        const cryptoDatas = responses.map(response => response.data.Data.Data);

        const hourlyData = cryptoDatas.map(cryptoData => {
          return cryptoData.map(item => ({
            time: new Date(item.time * 1000).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }),
            price: item.close,
          }));
        });


        setChartData({
          labels: hourlyData[0].map(data => data.time),
          datasets: hourlyData.map((data, index) => ({
            label: `${selectedCryptos[index]} Price (USD)`,
            data: data.map(entry => entry.price),
            fill: true,
            backgroundColor: 'rgba(0, 128, 0, 0.1)',
            borderColor: 'darkgreen',
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

  const handleGraphTypeChange = event => {
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
    { value: 'BNB', label: 'Binance' },
    { value: 'SOL', label: 'Solana' },
    { value: 'BCH', label:'Bitcoin Cash '},
    { value: 'DOGE', label: 'Dogecoin' },
    { value: 'USDT', label: 'Tether' },
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
        <p style={{ textAlign: 'center', marginTop: '2vh' }}>Hourly-Weekly Crypto Prices</p>

        <div className='oneline'>
        <div className="timeRest">
          <ul>
          <Link to='/cryptoWebsocket'  ><li >1S</li></Link>
            <Link to='/cryptoOneday'  ><li >1D</li></Link>
            <Link to='/cryptoweek'  ><li style={{ backgroundColor: '#3498db' }}>7D</li></Link>
            <Link to='/cryptomonth'  ><li>1M</li></Link>
            <Link to='/cryptothreemonths'  ><li>3M</li></Link>
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
            style={{ width:'7vw', height: '30px',fontWeight:600 , fontSize:'17px', cursor: 'pointer', borderRadius: '5px', textAlign:'center' }}          >
            <option value="line">Line</option>
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
                    legend: {
                      display: true,
                    },
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                    },
                  },
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
                }}
              />
            ) : (
              <Bar
                data={chartData}
                options={{
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

export default CryptoWeek;
