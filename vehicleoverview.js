const vehicles = [
    { name: "UAZ-469 Off-Road", price: 10000, ores: 13, honeycombs: 9999, photo: "https://raw.githubusercontent.com/vLevyx/A-List-Hub-Test/main/uaz469_cover.png" },
    { name: "UAZ-469 Off-Road - Open Top", price: 10000, ores: 13, honeycombs: 9999, photo: "https://raw.githubusercontent.com/vLevyx/A-List-Hub-Test/main/uaz469offroad-opentop.png" },
    { name: "M151A2 Off-Road - Open Top", price: 25000, ores: 16, honeycombs: 9999, photo: "m151a2offroad-opentop.png" },
    { name: "M151A2 Off-Road", price: 25000, ores: 16, honeycombs: 9999, photo: "VehiclePhotos/m151a2_cover.png" },
    { name: "UAZ-452 Off-Road", price: 95000, ores: 28, honeycombs: 9999, photo: "VehiclePhotos/uaz452offroad.png" },
    { name: "M923A1 Transport Truck", price: 800000, ores: 50, honeycombs: 9999, photo: "VehiclePhotos/m923a1.png" },
    { name: "M923A1 Fuel Truck", price: 1000000, ores: 53, honeycombs: 9999, photo: "VehiclePhotos/m923a1_fuel.png" },
    { name: "M923A1 Transport Truck - Canopy", price: 1800000, ores: 83, honeycombs: 9999, photo: "VehiclePhotos/m923a1_cover.png" },
    { name: "Ural-4320 Fuel Truck", price: 2800000, ores: 83, honeycombs: 9999, photo: "VehiclePhotos/ural4320_fuel.png" },
    { name: "Ural-4320 Transport Truck", price: 2800000, ores: 100, honeycombs: 9999, photo: "VehiclePhotos/ural4320transporttruck.png" },
    { name: "Ural-4320 Transport Truck - Canopy", price: 4000000, ores: 116, honeycombs: 9999, photo: "VehiclePhotos/ural4320_cover.png" },
    { name: "S105 Car", price: 85000, ores: 0, honeycombs: 9999, photo: "VehiclePhotos/vwrolf.png" },
    { name: "S1203 Minibus", price: 185000, ores: 0, honeycombs: 9999, photo: "VehiclePhotos/vwrolf.png" },
    { name: "M998 Light Utility Vehicle", price: 150000, ores: 18, honeycombs: 9999, photo: "VehiclePhotos/m998LUV.png" },
    { name: "M998 Light Utility Vehicle - Canopy", price: 175000, ores: 18, honeycombs: 9999, photo: "VehiclePhotos/m998LUVcanopy.png" },
    { name: "M1025 Light Armored Vehicle", price: 250000, ores: 18, honeycombs: 9999, photo: "VehiclePhotos/m1025.png" },
    { name: "VW Rolf", price: 800000, ores: 18, honeycombs: 9999, photo: "vwrolf.png" },
    { name: "Pickup Truck", price: 500000, ores: 18, honeycombs: 9999, photo: "VehiclePhotos/pickuptruck.png" },
    { name: "UAZ-452 Off-Road (Banana)", price: 450000, ores: 0, honeycombs: 9999, photo: "VehiclePhotos/uaz452offroad.png" },
    { name: "MI8-MT Transport Helicopter", price: 58000000, ores: 26, honeycombs: 9999, photo: "https://raw.githubusercontent.com/vLevyx/A-List-Hub-Test/main/mi8-mt.png" },
    { name: "UH-1H Transport Helicopter", price: 47000000, ores: 26, honeycombs: 9999, photo: "uh-1h.png" }
];

const discountRates = {
    neutral: 0,
    positive1: -5.5,
    positive2: -10.5,
    positive3: -14.29,
    negative1: 5.5,
    negative2: 10.5,
    negative3: 14.29
};

function renderVehicles() {
    const container = document.getElementById('vehicle-container');
    container.innerHTML = '';

    vehicles.forEach(vehicle => {
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        vehicleCard.innerHTML = `
            <img src="${vehicle.photo}" alt="${vehicle.name}">
            <div class="vehicle-info">
                <h3>${vehicle.name}</h3>
                <p>Price: $${vehicle.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <p>Ores: ${vehicle.ores}</p>
                <p>Honeycombs: ${vehicle.honeycombs}</p>
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
        const adjustedPrice = vehicle.price * (1 - (discount / 100));
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        vehicleCard.innerHTML = `
            <img src="${vehicle.photo}" alt="${vehicle.name}">
            <div class="vehicle-info">
                <h3>${vehicle.name}</h3>
                <p>Adjusted Price: $${adjustedPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <p>Ores: ${vehicle.ores}</p>
                <p>Honeycombs: ${vehicle.honeycombs}</p>
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
    modeToggle.innerHTML = body.classList.contains('dark-mode') ? '🌜' : '🌞';
}

document.addEventListener('DOMContentLoaded', () => {
    renderVehicles();
});
