import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function generateChartData(data) {
  const labels = data.map(entry => new Date(entry.date).toLocaleTimeString());
  const pressureData = data.map(entry => parseFloat(entry.pressure));
  const temperatureData = data.map(entry => parseFloat(entry.temperature));
  const humidityData = data.map(entry => parseFloat(entry.humidity));

  return {
    labels,
    datasets: [
      {
        label: 'Pressure',
        data: pressureData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Temperature',
        data: temperatureData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Humidity',
        data: humidityData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };
}

function Charts() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://sensecap.seeed.cc/openapi/aggregate_chart_points?device_eui=2CF7F1C0443002D2', {
          auth: {
            username: 'LHY5MB7C3C8WTAA5',
            password: '34C99BBDA28A4BCD9C96EE749DAB454A32D60656623C47B583029382F350F555'
          }
        });
  
        const data = response.data.data[0].lists;
  
        let labels = [];
        let datasetData = [];
  
        for (let i = 0; i < data.length; i++) {
          labels.push(new Date(data[i].time));
          datasetData.push(data[i].average_value);
        }
  
        const formattedChartData = {
          labels,
          datasets: [
            {
              label: 'Data',
              data: datasetData,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
        };
  
        setChartData(formattedChartData);
        setLoading(false);
      } catch (error) {
        console.error('Error while fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Charts</h2>
      {chartData && !loading ? <Line data={chartData} /> : <span>No data</span>}
    </div>
  );
}

export default Charts;