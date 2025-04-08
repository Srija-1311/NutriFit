// Weather App with reliable API handling
const API_KEY = '5a4b2d457ecbef9eb2a71e480b947604';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const weatherChartCtx = document.getElementById('weatherChart').getContext('2d');
const weatherDetails = document.getElementById('weatherDetails');

let weatherChart = null;

// Initialize empty chart
const initChart = () => {
  weatherChart = new Chart(weatherChartCtx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Temperature (°C)',
          data: [],
          borderColor: '#4bc0c0',
          backgroundColor: 'rgba(75, 192, 192, 0.2)'
        },
        {
          label: 'Humidity (%)',
          data: [],
          borderColor: '#36a2eb', 
          backgroundColor: 'rgba(54, 162, 235, 0.2)'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
};

// Robust API fetch with error handling
const getWeatherData = async (city) => {
  try {
    loadingSpinner.classList.remove('d-none');
    weatherDetails.innerHTML = '';
    
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Weather service unavailable');
    }
    
    return await response.json();
  } catch (err) {
    weatherDetails.innerHTML = `
      <div class="alert alert-danger">
        ${err.message || 'Failed to get weather data'}
      </div>
    `;
    return null;
  } finally {
    loadingSpinner.classList.add('d-none');
  }
};

// Process and display weather data
const showWeatherData = (data) => {
  const dailyData = {};
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString();
    
    if (!dailyData[day]) {
      dailyData[day] = {
        temps: [],
        humidities: []
      };
    }
    
    dailyData[day].temps.push(item.main.temp);
    dailyData[day].humidities.push(item.main.humidity);
  });

  const labels = Object.keys(dailyData);
  const temps = Object.values(dailyData).map(day => 
    (day.temps.reduce((a, b) => a + b, 0) / day.temps.length).toFixed(1)
  );
  const humidities = Object.values(dailyData).map(day => 
    (day.humidities.reduce((a, b) => a + b, 0) / day.humidities.length).toFixed(0)
  );

  weatherChart.data.labels = labels;
  weatherChart.data.datasets[0].data = temps;
  weatherChart.data.datasets[1].data = humidities;
  weatherChart.update();
};

// Event handlers
searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) return;
  
  const data = await getWeatherData(city);
  if (data) showWeatherData(data);
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchBtn.click();
});

// Initialize app
document.addEventListener('DOMContentLoaded', initChart);
