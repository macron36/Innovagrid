// Weather App - Simple Working Version
console.log("Weather App Loaded!");

// Basic weather data for demo
const weatherData = {
    'new york': { city: 'New York', country: 'USA', temp: 22, condition: 'Sunny' },
    'london': { city: 'London', country: 'UK', temp: 15, condition: 'Cloudy' },
    'tokyo': { city: 'Tokyo', country: 'Japan', temp: 18, condition: 'Rainy' },
    'paris': { city: 'Paris', country: 'France', temp: 17, condition: 'Clear' },
    'sydney': { city: 'Sydney', country: 'Australia', temp: 25, condition: 'Sunny' },
    'berlin': { city: 'Berlin', country: 'Germany', temp: 16, condition: 'Cloudy' },
    'mumbai': { city: 'Mumbai', country: 'India', temp: 32, condition: 'Hot' },
    'toronto': { city: 'Toronto', country: 'Canada', temp: 18, condition: 'Clear' }
};

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Loaded!");
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login successful! Going to dashboard...');
            window.location.href = 'dashboard.html';
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Account created! Going to dashboard...');
            window.location.href = 'dashboard.html';
        });
    }
    
    // Weather search
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchWeather);
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            alert('Logged out!');
            window.location.href = 'index.html';
        });
    }
    
    // Initialize dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        initializeDashboard();
    }
});

function searchWeather() {
    const cityInput = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (!cityInput) {
        alert('Please enter a city name');
        return;
    }
    
    // Show loading
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.textContent = 'Searching...';
        searchBtn.disabled = true;
    }
    
    // Simulate API call
    setTimeout(() => {
        const weather = weatherData[cityInput];
        
        if (weather) {
            displayWeather(weather);
            addToHistory(weather);
        } else {
            // Create fake data for unknown cities
            const fakeWeather = {
                city: cityInput.charAt(0).toUpperCase() + cityInput.slice(1),
                country: 'Unknown',
                temp: 20 + Math.floor(Math.random() * 15),
                condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
            };
            displayWeather(fakeWeather);
            addToHistory(fakeWeather);
        }
        
        // Reset button
        if (searchBtn) {
            searchBtn.textContent = '🔍 Search';
            searchBtn.disabled = false;
        }
    }, 1000);
}

function displayWeather(data) {
    const weatherCard = document.getElementById('weatherCard');
    if (!weatherCard) return;
    
    // Update weather info
    document.getElementById('cityName').textContent = `${data.city}, ${data.country}`;
    document.getElementById('temperature').textContent = `${data.temp}°C`;
    document.getElementById('weatherCondition').textContent = data.condition;
    
    // Set random details
    document.getElementById('feelsLike').textContent = `${data.temp + 2}°C`;
    document.getElementById('humidity').textContent = `${40 + Math.floor(Math.random() * 40)}%`;
    document.getElementById('windSpeed').textContent = `${5 + Math.floor(Math.random() * 15)} km/h`;
    
    // Set weather icon
    const iconElement = document.getElementById('weatherIcon');
    if (iconElement) {
        const icons = {
            'Sunny': '☀️',
            'Cloudy': '☁️',
            'Rainy': '🌧️',
            'Clear': '☀️',
            'Hot': '🔥'
        };
        iconElement.textContent = icons[data.condition] || '🌤️';
    }
    
    // Show the card
    weatherCard.style.display = 'block';
}

let searchHistory = [];

function addToHistory(weather) {
    searchHistory.unshift({
        city: weather.city,
        country: weather.country,
        temp: weather.temp,
        condition: weather.condition
    });
    
    // Keep only last 5 searches
    if (searchHistory.length > 5) {
        searchHistory = searchHistory.slice(0, 5);
    }
    
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    
    historyList.innerHTML = '';
    
    if (searchHistory.length === 0) {
        historyList.innerHTML = `
            <div class="history-item">
                <span>No searches yet</span>
                <span>Search for a city!</span>
            </div>
        `;
        return;
    }
    
    searchHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span>${item.city}, ${item.country}</span>
            <span>${item.temp}° • ${item.condition}</span>
        `;
        historyList.appendChild(historyItem);
    });
}

function initializeDashboard() {
    console.log("Dashboard initialized!");
    
    // Add some sample history
    searchHistory = [
        { city: 'London', country: 'UK', temp: 15, condition: 'Cloudy' },
        { city: 'Paris', country: 'France', temp: 17, condition: 'Clear' }
    ];
    updateHistoryDisplay();
    
    // Set current date
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString();
    }
}

// Add simple CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .current-weather {
        animation: fadeIn 0.5s ease-in;
    }
`;
document.head.appendChild(style);