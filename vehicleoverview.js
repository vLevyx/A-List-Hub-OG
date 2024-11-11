const vehicles = [
    { name: "M1025 Light Armored Vehicle", price: 250000, ores: 18, photo: "m1025.png" },
    { name: "M151A2 Off-Road", price: 25000, ores: 16, honeycombs: 9999, photo: "m151a2_cover.png" },
    { name: "M151A2 Off-Road - Open Top", price: 25000, ores: 16, photo: "m151a2offroad-opentop.png" },
    { name: "M998 Light Utility Vehicle", price: 150000, ores: 18, photo: "m998LUV.png" },
    { name: "M998 Light Utility Vehicle - Canopy", price: 175000, ores: 18, photo: "m998LUVcanopy.png" },
    { name: "M923A1 Fuel Truck", price: 1200000, ores: 53, photo: "m923a1_fuel.png" },
    { name: "M923A1 Transport Truck", price: 800000, ores: 50, honeycombs: 9999, photo: "m923a1.png" },
    { name: "M923A1 Transport Truck - Canopy", price: 1800000, ores: 83, photo: "m923a1_cover.png" },
    { name: "Pickup Truck", price: 500000, ores: 18, honeycombs: 9999, photo: "pickuptruck.png" },
    { name: "UAZ-452 Off-Road", price: 95000, ores: 28, photo: "uaz452offroad.png" },
    { name: "UAZ-469 Off-Road", price: 10000, ores: 13, photo: "uaz469_cover.png" },
    { name: "UAZ-469 Off-Road - Open Top", price: 10000, ores: 13, photo: "uaz469offroad-opentop.png" },
    { name: "Ural-4320 Fuel Truck", price: 2800000, ores: 83, photo: "ural4320_fuel.png" },
    { name: "Ural-4320 Transport Truck", price: 2800000, ores: 100, photo: "ural4320transporttruck.png" },
    { name: "Ural-4320 Transport Truck - Canopy", price: 4000000, ores: 116, photo: "ural4320_cover.png" },
    { name: "VW Rolf", price: 800000, ores: 18, photo: "vwrolf.png" },
    { name: "MI8-MT Transport Helicopter", price: 58000000, ores: 26, photo: "mi8-mt.png" },
    { name: "UH-1H Transport Helicopter", price: 47000000, ores: 26, photo: "uh-1h.png" }
];

// https://raw.githubusercontent.com/vLevyx/A-List-Hub-Test/main/photo.

const discountRates = {
    neutral: 0,
    positive1: -5.5,
    positive2: -5.5,
    positive3: -14.31,
    negative1: 25.0,
    negative2: 28.0,
    negative3: 53.0
};

function renderVehicles() {
    const container = document.getElementById('vehicle-container');
    container.innerHTML = '';

    //To add more items for reference in inventory space do this <p>Honeycombs: ${vehicle.honeycombs}</p> under Ores and put name of resource //
    // Do this for both function renderVehicles and function updatePrices //
    vehicles.forEach(vehicle => { 
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        vehicleCard.innerHTML = `
            <img src="${vehicle.photo}" alt="${vehicle.name}">
            <div class="vehicle-info">
                <h3>${vehicle.name}</h3>
                <p>Price: $${vehicle.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <p>Ores: ${vehicle.ores}</p>
            </div>
        `;
        container.appendChild(vehicleCard);
    });
}

function updatePrices() {
    const selectedReputation = document.getElementById('reputation').value;
    const discount = discountRates[selectedReputation];

    const container = document.getElementById('vehicle-container');
    container.innerHTML = '';

    vehicles.forEach(vehicle => {
        // Apply a discount for positive reputations (negative discount value) and an increase for negative (positive discount value)
        const adjustedPrice = vehicle.price * (1 + (discount / 100));
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        vehicleCard.innerHTML = `
            <img src="${vehicle.photo}" alt="${vehicle.name}">
            <div class="vehicle-info">
                <h3>${vehicle.name}</h3>
                <p>Price: $${Math.round(adjustedPrice).toLocaleString()}</p>
                <p>Ores: ${vehicle.ores}</p>
            </div>
        `;
        container.appendChild(vehicleCard);
    });
}

function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    const modeToggle = document.getElementById('mode-toggle');
}

document.addEventListener('DOMContentLoaded', () => {
    renderVehicles();
});