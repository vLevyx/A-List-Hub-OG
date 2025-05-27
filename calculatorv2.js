document.getElementById('categories').addEventListener('change', populateItems);
document.getElementById('calculateButton').addEventListener('click', calculateResources);

// Define the lists of resources, components, and HQ components
const resourcesList = ['Fabric', 'Polyester', 'Iron Ingot', 'Copper Ingot', 'Glass', 'Component', 'Charcoal', 'Gold Ingot', 'Silver Ingot', 'Petrol', 'Wooden Plank'];
const componentsList = ['Cloth', 'Iron Plate', 'Component', 'Tempered Glass', 'Weapon Part', 'Stabilizer', 'Attachment Part', 'Ammo', 'Mechanical Component', 'Engine Part', 'Interior Part', 'Rotor'];
const hqComponentsList = ['Component (HQ)', 'Kevlar', 'Weapon Part (HQ)', 'Stabilizer (HQ)', 'Attachment Part (HQ)', 'Ammo (HQ)', 'Mechanical Component (HQ)', 'Engine Part (HQ)', 'Interior Part (HQ)', 'Rotor (HQ)', 'Special Rotor', 'Special Gun Barrel'];
const kit = [];

const itemsByCategory = {
  'Weapons': ['AK-47', 'AKS-47U', 'CheyTac M200 Intervention', 'Colt 1911', 'Desert Eagle', 'M16A2', 'M16A2 - AUTO', 'M21 SWS', 'M249 SAW', 'M416', 'M9', 'MP 43 1C', 'MP5A2', 'MP7A2', 'PKM', 'PM', 'RPK-74',
    'S8-58V', 'Sa-58P', 'Scar-H', 'SIG MCX', 'SIG MCX SPEAR', 'SSG10A2-Sniper', 'Stegr AUG', 'SR-25 Rifle', 'SVD'],

  'Magazines': ['8rnd .45 ACP', '9x18mm 8rnd PM Mag', '9x19mm 15rnd M9 Mag', '.300 Blackout Mag', '.338 5rnd FMJ', '.50 AE 7rnd Mag',
    '12/70 7mm Buckshot', '4.6x40 40rnd Mag', '5.45x39mm 30rnd AK Mag', '5.45x39mm 45rnd RPK-74 Tracer Mag', '5.56x45mm 30rnd AUG Mag',
    '5.56x45mm 30rnd STANAG Mag', '5.56x45mm 200rnd M249 Belt', '7Rnd M200 Magazine', '7.62x39mm 30rnd Sa-58 Mag', '7.62x51mm FMJ', '7.62x51mm M80 Mag',
    '7.62x51mm 30rnd Mag', 'SR25 7.62x51mm 20rnd', '7.62x54mmR 100rnd PK Belt', 'SPEAR 6.8x51 25rnd'],

  'Attachments': ['A2 Flash Hider', 'ART II Scope', 'Carry Handle Red-Dot-Sight', 'Leupold VX-6', 'PSO-1 Scope', '4x20 Carry Handle Scope', '6.8x51mm FlashHider', '6P26 Flash Hider',
    '6P20 Muzzle Brake', '7.62x51mm FlashHider'],

  'Vehicles': ['M1025 Light Armoured Vehicle', 'M151A2 Off-Road', 'M151A2 Off-Road Open Top', 'M923A1 Fuel Truck', 'M923A1 Transport Truck', 'M923A1 Transport Truck - Canopy',
    'M998 Light Utility Vehicle', 'M998 Light Utility Vehicle - Canopy', 'Mi-8MT Transport Helicopter', 'Pickup-Truck', 'S105 Car', 'S1203 Minibus', 'S1203 - Laboratory', 'UAZ-452 Off-road', 'UAZ-452 Off-road - Laboratory',
    'UAZ-469 Off-road', 'UAZ-469 Off-road - Open Top', 'UH-1H Transport Helicopter', 'Ural-4320 Fuel Truck', 'Ural-4320 Transport Truck', 'Ural-4320 Transport Truck - Canopy', 'Ural (Device)', 'VW Rolf'],

  'Vests': ['6B2 Vest', '6B3 Vest', 'M69 Vest', 'PASGT Vest'],

  'Helmets': ['PASGT Helmet', 'PASGT Helmet - Camouflaged', 'PASGT Helmet - Camouflaged Netting', 'SPH-4 Helmet', 'SSh-68 Helmet',
    'SSh-68 Helmet - Camouflaged', 'SSh-68 Helmet - Cover', 'SSh-68 Helmet - KZS', 'SSh-68 Helmet - Netting', 'ZSh-5 Helmet'],

  'Clothes': ['ALICE Medium Backpack', 'Bandana', 'Balaclava', 'BDU Blouse', 'BDU Blouse - Rolled-up', 'BDU Trousers', 'Beanie', 'Boonie', 'Cargo Pants', 'Cargo Pants (Colored)',
    'Cardigan', 'Classic Shoe', 'CWU-27 Pilot Coveralls', 'Dress', 'Fedora', 'Fisher Hat', 'Flat Cap', 'Half Mask', 'Hunting Vest', 'IIFS Large Combat Field Pack',
    'Jacket', 'Jeans', 'Jeans (Colored)', 'KLMK Coveralls', 'Knit Cap', 'Kolobok Backpack', 'M70 Backpack', 'M70 Cap', 'M70 Parka',
    'M70 Trousers', 'M88 Field Cap', 'M88 Jacket', 'M88 Jacket - Rolled-up', 'M88 Trousers', 'Mask (Medical)', 'Mask (Latex)', 'Mask (Ski)', 'Officer\'s Cap',
    'Panamka', 'Paper Bag', 'Polo', 'Pullover', 'Robe', 'Runner Shoe', 'Sneaker', 'Soviet Combat Boots',
    'Soviet Pilot Jacket', 'Soviet Pilot Pants', 'Suit Jacket', 'Suit Pants', 'Sweater', 'Sweat Pants', 'TShirt', 'US Combat Boots',
    'Veshmeshok Backpack', 'Wool Hat'],

  'HQ Components': ['Ammo (HQ)', 'Attachment Part (HQ)', 'Component (HQ)', 'Engine Part (HQ)', 'Interior Part (HQ)',
    'Kevlar', 'Mechanical Component (HQ)', 'Rotor (HQ)', 'Stabilizer (HQ)', 'Weapon Part (HQ)'],

  'Components': ['Cloth', 'Iron Plate', 'Component', 'Tempered Glass', 'Weapon Part', 'Stabilizer', 'Attachment Part',
    'Ammo', 'Mechanical Component', 'Engine Part', 'Interior Part', 'Rotor']

};

// Crafting levels for each item
const craftingLevels = {
  // Weapons
  'AK-47': 8,
  'AKS-47U': 8,
  'CheyTac M200 Intervention': 13,
  'Colt 1911': 10,
  'Desert Eagle': 10,
  'M16A2': 5,
  'M16A2 - AUTO': 6,
  'M21 SWS': 7,
  'M249 SAW': 11,
  'M416': 7,
  'M9': 3,
  'MP 43 1C': 8,
  'MP5A2': 5,
  'MP7A2': 5,
  'PKM': 12,
  'PM': 2,
  'RPK-74': 10,
  'S8-58V': 9,
  'Sa-58P': 9,
  'Scar-H': 11,
  'SIG MCX': 7,
  'SIG MCX SPEAR': 10,
  'SSG10A2-Sniper': 10,
  'Stegr AUG': 6,
  'SR-25 Rifle': 11,
  'SVD': 10,
  // Magazines
  '8rnd .45 ACP': 4,
  '9x18mm 8rnd PM Mag': 2,
  '9x19mm 15rnd M9 Mag': 3,
  '.300 Blackout Mag': 7,
  '.338 5rnd FMJ': 10,
  '.50 AE 7rnd Mag': 9,
  '12/70 7mm Buckshot': 7,
  '4.6x40 40rnd Mag': 5,
  '5.45x39mm 30rnd AK Mag': 8,
  '5.45x39mm 45rnd RPK-74 Tracer Mag': 10,
  '5.56x45mm 30rnd AUG Mag': 6,
  '5.56x45mm 30rnd STANAG Mag': 5,
  '5.56x45mm 200rnd M249 Belt': 11,
  '7Rnd M200 Magazine': 10,
  '7.62x39mm 30rnd Sa-58 Mag': 9,
  '7.62x51mm FMJ': 11,
  '7.62x51mm M80 Mag': 10,
  '7.62x51mm 30rnd Mag': 11,
  'SR25 7.62x51mm 20rnd': 11,
  '7.62x54mmR 100rnd PK Belt': 12,
  'SPEAR 6.8x51 25rnd': 9,
  // Attachments
  '4x20 Carry Handle Scope': 5,
  '6.8x51mm FlashHider': 4,
  '6P20 Muzzle Brake': 4,
  '6P26 Flash Hider': 4,
  '7.62x51mm FlashHider': 5,
  'A2 Flash Hider': 3,
  'ART II Scope': 7,
  'Carry Handle Red-Dot-Sight': 7,
  'Leupold VX-6': 10,
  'PSO-1 Scope': 7,
  // Vehicles
  'M1025 Light Armoured Vehicle': 7,
  'M151A2 Off-Road': 4,
  'M151A2 Off-Road Open Top': 4,
  'M923A1 Fuel Truck': 8,
  'M923A1 Transport Truck': 7,
  'M923A1 Transport Truck - Canopy': 8,
  'M998 Light Utility Vehicle': 6,
  'M998 Light Utility Vehicle - Canopy': 8,
  'Mi-8MT Transport Helicopter': 12,
  'Pickup-Truck': 7,
  'S105 Car': 4,
  'S1203 Minibus': 5,
  'S1203 - Laboratory': 5,
  'UAZ-452 Off-road': 5,
  'UAZ-452 Off-road - Laboratory': 8,
  'UAZ-469 Off-road': 3,
  'UAZ-469 Off-road - Open Top': 3,
  'UH-1H Transport Helicopter': 11,
  'Ural-4320 Fuel Truck': 9,
  'Ural-4320 Transport Truck': 9,
  'Ural-4320 Transport Truck - Canopy': 10,
  'Ural (Device)': 13,
  'VW Rolf': 7,
  // Vests
  '6B2 Vest': 7,
  '6B3 Vest': 9,
  'M69 Vest': 7,
  'PASGT Vest': 7,
  // Helmets
  'PASGT Helmet': 4,
  'PASGT Helmet - Camouflaged': 4,
  'PASGT Helmet - Camouflaged Netting': 4,
  'SPH-4 Helmet': 6,
  'SSh-68 Helmet': 4,
  'SSh-68 Helmet - Camouflaged': 4,
  'SSh-68 Helmet - Cover': 4,
  'SSh-68 Helmet - KZS': 4,
  'SSh-68 Helmet - Netting': 4,
  'ZSh-5 Helmet': 6,
  // Clothing
  'ALICE Medium Backpack': 4,
  'Bandana': 3,
  'Balaclava': 3,
  'BDU Blouse': 2,
  'BDU Blouse - Rolled-up': 2,
  'BDU Trousers': 2,
  'Beanie': 4,
  'Boonie': 4,
  'Cargo Pants': 3,
  'Cargo Pants (Colored)': 4,
  'Cardigan': 3,
  'Classic Shoe': 4,
  'CWU-27 Pilot Coveralls': 6,
  'Dress': 5,
  'Fedora': 3,
  'Fisher Hat': 3,
  'Flat Cap': 3,
  'Half Mask': 3,
  'Hunting Vest': 3,
  'IIFS Large Combat Field Pack': 7,
  'Jacket': 4,
  'Jeans': 3,
  'Jeans (Colored)': 4,
  'KLMK Coveralls': 6,
  'Knit Cap': 1,
  'Kolobok Backpack': 2,
  'M70 Backpack': 5,
  'M70 Cap': 3,
  'M70 Parka': 3,
  'M70 Trousers': 3,
  'M88 Field Cap': 2,
  'M88 Jacket': 1,
  'M88 Jacket - Rolled-up': 1,
  'M88 Trousers': 1,
  'Mask (Medical)': 5,
  'Mask (Latex)': 5,
  'Mask (Ski)': 3,
  'Officer\'s Cap': 7,
  'Panamka': 2,
  'Paper Bag': 5,
  'Polo': 4,
  'Pullover': 4,
  'Robe': 5,
  'Runner Shoe': 4,
  'Sneaker': 4,
  'Soviet Combat Boots': 1,
  'Soviet Pilot Jacket': 6,
  'Soviet Pilot Pants': 6,
  'Suit Jacket': 7,
  'Suit Pants': 7,
  'Sweater': 3,
  'Sweat Pants': 4,
  'TShirt': 4,
  'US Combat Boots': 1,
  'Veshmeshok Backpack': 3,
  'Wool Hat': 5,
  // End of Crafting Levels
};

// Function to calculate and display the crafting level
function calculateMaterials(selectedItem, quantity = 1) {
  const result = getCraftingResult(selectedItem, quantity);

  const resourcesNeeded = {};
  const componentsNeeded = {};
  const hqComponentsNeeded = {};
  breakdownMap = {};

  function processItem(itemName, qty, isTopLevel = false) {
    const recipe = recipes[itemName];
    if (!recipe || !recipe.materials) return;

    if (!breakdownMap[itemName]) breakdownMap[itemName] = [];

    recipe.materials.forEach(mat => {
      const totalQty = mat.qty * qty;

      if (recipes[mat.name]) {
        const subItem = recipes[mat.name];
        if (subItem.category === "HQ Components") {
          hqComponentsNeeded[mat.name] = (hqComponentsNeeded[mat.name] || 0) + totalQty;
        } else {
          componentsNeeded[mat.name] = (componentsNeeded[mat.name] || 0) + totalQty;
        }

        breakdownMap[itemName].push({ name: mat.name, qty: totalQty });
        processItem(mat.name, totalQty);
      } else {
        resourcesNeeded[mat.name] = (resourcesNeeded[mat.name] || 0) + totalQty;
        breakdownMap[itemName].push({ name: mat.name, qty: totalQty });
      }
    });
  }

  processItem(selectedItem, quantity, true);
  displayResults(resourcesNeeded, componentsNeeded, hqComponentsNeeded);
}

const kitSidebar = document.getElementById("kitSidebar");
const closeKitBtn = document.getElementById("closeKitSidebarBtn");
const reopenKitBtn = document.getElementById("reopenKitSidebarBtn");

if (kitSidebar && closeKitBtn && reopenKitBtn) {
  closeKitBtn.addEventListener("click", () => {
    kitSidebar.classList.remove("active");
    reopenKitBtn.style.display = "block";
  });

  reopenKitBtn.addEventListener("click", () => {
    kitSidebar.classList.add("active");
    reopenKitBtn.style.display = "none";
  });
}

const itemComponents = {
  'Weapons': {
    'AK-47': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 3 }
    },
    'AKS-47U': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 3 }
    },
    'CheyTac M200 Intervention': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 8, 'Stabilizer (HQ)': 8, 'Attachment Part (HQ)': 10, 'Special Gun Barrel': 1 }
    },
    'Colt 1911': {
      'Non-HQ': { 'Weapon Part': 5, 'Stabilizer': 3, 'Attachment Part': 3 },
      'HQ': {}
    },
    'Desert Eagle': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 1, 'Stabilizer (HQ)': 1, 'Attachment Part (HQ)': 2 }
    },
    'M16A2': {
      'Non-HQ': { 'Weapon Part': 27, 'Stabilizer': 15, 'Attachment Part': 17 },
      'HQ': {}
    },
    'M16A2 - AUTO': {
      'Non-HQ': { 'Weapon Part': 39, 'Stabilizer': 21, 'Attachment Part': 24 },
      'HQ': {}
    },
    'M21 SWS': {
      'Non-HQ': { 'Weapon Part': 39, 'Stabilizer': 21, 'Attachment Part': 24 },
      'HQ': {}
    },
    'M249 SAW': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 13, 'Stabilizer (HQ)': 13, 'Attachment Part (HQ)': 15, 'Special Gun Barrel': 1 }
    },
    'M416': {
      'Non-HQ': { 'Weapon Part': 43, 'Stabilizer': 23, 'Attachment Part': 26 },
      'HQ': {}
    },
    'M9': {
      'Non-HQ': { 'Weapon Part': 5, 'Stabilizer': 3, 'Attachment Part': 3 },
      'HQ': {}
    },
    'MP 43 1C': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 2, 'Stabilizer (HQ)': 2, 'Attachment Part (HQ)': 2 }
    },
    'MP5A2': {
      'Non-HQ': { 'Weapon Part': 11, 'Stabilizer': 6, 'Attachment Part': 7 },
      'HQ': {}
    },
    'MP7A2': {
      'Non-HQ': { 'Weapon Part': 15, 'Stabilizer': 8, 'Attachment Part': 9 },
      'HQ': {}
    },
    'PKM': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 19, 'Stabilizer (HQ)': 19, 'Attachment Part (HQ)': 23, 'Special Gun Barrel': 1 }
    },
    'PM': {
      'Non-HQ': { 'Weapon Part': 4, 'Stabilizer': 2, 'Attachment Part': 2 },
      'HQ': {}
    },
    'RPK-74': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 4 }
    },
    'S8-58V': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 3 }
    },
    'Sa-58P': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 3 }
    },
    'Scar-H': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 4, 'Stabilizer (HQ)': 4, 'Attachment Part (HQ)': 5 }
    },
    'SIG MCX': {
      'Non-HQ': { 'Weapon Part': 55, 'Stabilizer': 30, 'Attachment Part': 34 },
      'HQ': {}
    },
    'SIG MCX SPEAR': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 4 }
    },
    'SSG10A2-Sniper': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 3 }
    },
    'Stegr AUG': {
      'Non-HQ': { 'Weapon Part': 51, 'Stabilizer': 28, 'Attachment Part': 31 },
      'HQ': {}
    },
    'SR-25 Rifle': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 4 }
    },
    'SVD': {
      'Non-HQ': {},
      'HQ': { 'Weapon Part (HQ)': 6, 'Stabilizer (HQ)': 6, 'Attachment Part (HQ)': 7 }
    }
  },
  'Magazines': {
    '.300 Blackout Mag': {
      'Non-HQ': { 'Ammo': 2 },
      'HQ': {}
    },
    '.338 5rnd FMJ': {
      'Non-HQ': { 'Ammo': 2 },
      'HQ': {}
    },
    '.50 AE 7rnd Mag': {
      'Non-HQ': {},
      'HQ': { 'Ammo (HQ)': 2 }
    },
    '12/70 7mm Buckshot': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    '30rnd 9x19 Mag': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    '4.6x40 40rnd Mag': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    '7Rnd M200 Magazine': {
      'Non-HQ': {},
      'HQ': { 'Ammo (HQ)': 3 }
    },
    '7.62x39mm 30rnd Sa-58 Mag': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    '7.62x51mm M80 Mag': {
      'Non-HQ': { 'Ammo': 2 },
      'HQ': {}
    },
    '7.62x51mm 20rnd M14 Mag': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    '7.62x51mm 30rnd Mag': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    'SR25 7.62x51mm 20rnd': {
      'Non-HQ': {},
      'HQ': { 'Ammo (HQ)': 1 }
    },
    '7.62x54mmR 10rnd SVD Mag': {
      'Non-HQ': {},
      'HQ': { 'Ammo (HQ)': 1 }
    },
    '8rnd .45 ACP': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    '9x18mm 8rnd PM Mag': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    '9x19mm 15rnd M9 Mag': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    '100rnd PK Belt': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    '5.56x45mm 200rnd M249 Belt': {
      'Non-HQ': {},
      'HQ': { 'Ammo (HQ)': 15 }
    },
    '5.56x45mm 30rnd AUG Mag': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    '5.56x45mm 30rnd STANAG Mag': {
      'Non-HQ': { 'Ammo': 1 },
      'HQ': {}
    },
    '5.45x39mm 30rnd AK Mag': {
      'Non-HQ': { 'Ammo': 2 },
      'HQ': {}
    },
    '5.45x39mm 45rnd RPK-74 Tracer Mag': {
      'Non-HQ': {},
      'HQ': { 'Ammo (HQ)': 1 }
    },
    '7.62x51mm FMJ': {
      'Non-HQ': {},
      'HQ': { 'Ammo (HQ)': 1 }
    },
    '7.62x54mmR 100rnd PK Belt': {
      'Non-HQ': {},
      'HQ': { 'Ammo (HQ)': 15 }
    },
    '7.62x54mmR 10rnd SVD Mag': {
      'Non-HQ': {},
      'HQ': { 'Ammo (HQ)': 1 }
    },
    'SPEAR 6.8x51 25rnd': {
      'Non-HQ': {},
      'HQ': { 'Ammo (HQ)': 1 }
    }
  },
  'Attachments': {
    '4x20 Carry Handle Scope': {
      'Non-HQ': { 'Component': 41, 'Tempered Glass': 18 },
      'HQ': {}
    },
    '6.8x51mm FlashHider': {
      'Non-HQ': { 'Component': 2, 'Tempered Glass': 1 },
      'HQ': {}
    },
    '6P20 Muzzle Brake': {
      'Non-HQ': { 'Component': 2, 'Tempered Glass': 1 },
      'HQ': {}
    },
    '6P26 Flash Hider': {
      'Non-HQ': { 'Component': 2, 'Tempered Glass': 1 },
      'HQ': {}
    },
    '7.62x51mm FlashHider': {
      'Non-HQ': { 'Component': 3, 'Tempered Glass': 1 },
      'HQ': {}
    },
    'A2 Flash Hider': {
      'Non-HQ': { 'Component': 2, 'Tempered Glass': 1 },
      'HQ': {}
    },
    'ART II Scope': {
      'Non-HQ': { 'Component': 2, 'Tempered Glass': 1 },
      'HQ': {}
    },
    'Carry Handle Red-Dot-Sight': {
      'Non-HQ': { 'Component': 5, 'Tempered Glass': 2 },
      'HQ': {}
    },
    'Leupold VX-6': {
      'Non-HQ': { 'Component': 17, 'Tempered Glass': 8 },
      'HQ': {}
    },
    'PSO-1 Scope': {
      'Non-HQ': { 'Component': 4, 'Tempered Glass': 1 },
      'HQ': {}
    }
  },
  'Vehicles': {
    'Ural-4320 Transport Truck - Canopy': {
      'Non-HQ': {},
      'HQ': { 'Mechanical Component (HQ)': 5, 'Interior Part (HQ)': 5, 'Engine Part (HQ)': 3 }
    },
    'UH-1H Transport Helicopter': {
      'Non-HQ': {},
      'HQ': { 'Mechanical Component (HQ)': 19, 'Interior Part (HQ)': 17, 'Engine Part (HQ)': 12, 'Rotor (HQ)': 30, 'Special Rotor': 1 }
    },
    'UAZ-469 Off-road': {
      'Non-HQ': { 'Mechanical Component': 1, 'Interior Part': 1, 'Engine Part': 1 },
      'HQ': {}
    },
    'UAZ-469 Off-road - Open Top': {
      'Non-HQ': { 'Mechanical Component': 1, 'Interior Part': 1, 'Engine Part': 1 },
      'HQ': {}
    },
    'M151A2 Off-Road': {
      'Non-HQ': { 'Mechanical Component': 1, 'Engine Part': 1 },
      'HQ': {}
    },
    'M151A2 Off-Road Open Top': {
      'Non-HQ': { 'Mechanical Component': 1, 'Engine Part': 1 },
      'HQ': {}
    },
    'UAZ-452 Off-road': {
      'Non-HQ': { 'Mechanical Component': 3, 'Interior Part': 2, 'Engine Part': 3 },
      'HQ': {}
    },
    'UAZ-452 Off-road - Laboratory': {
      'Non-HQ': {},
      'HQ': { 'Mechanical Component (HQ)': 4, 'Interior Part (HQ)': 3, 'Engine Part (HQ)': 2 }
    },
    'M998 Light Utility Vehicle': {
      'Non-HQ': { 'Mechanical Component': 5, 'Interior Part': 3, 'Engine Part': 5 },
      'HQ': {}
    },
    'M998 Light Utility Vehicle - Canopy': {
      'Non-HQ': { 'Mechanical Component': 6, 'Interior Part': 4, 'Engine Part': 4 },
      'HQ': {}
    },
    'Mi-8MT Transport Helicopter': {
      'Non-HQ': {},
      'HQ': { 'Mechanical Component (HQ)': 30, 'Interior Part (HQ)': 27, 'Engine Part (HQ)': 19, 'Rotor (HQ)': 48, 'Special Rotor': 1 }
    },
    'M1025 Light Armoured Vehicle': {
      'Non-HQ': { 'Mechanical Component': 9, 'Interior Part': 5, 'Engine Part': 9 },
      'HQ': {}
    },
    'M923A1 Transport Truck': {
      'Non-HQ': { 'Mechanical Component': 31, 'Interior Part': 19, 'Engine Part': 31 },
      'HQ': {}
    },
    'M923A1 Fuel Truck': {
      'Non-HQ': {},
      'HQ': { 'Mechanical Component (HQ)': 1, 'Interior Part (HQ)': 1, 'Engine Part (HQ)': 1 }
    },
    'M923A1 Transport Truck - Canopy': {
      'Non-HQ': {},
      'HQ': { 'Mechanical Component (HQ)': 2, 'Interior Part (HQ)': 2, 'Engine Part (HQ)': 1 }
    },
    'Ural-4320 Fuel Truck': {
      'Non-HQ': {},
      'HQ': { 'Mechanical Component (HQ)': 4, 'Interior Part (HQ)': 3, 'Engine Part (HQ)': 2 }
    },
    'Ural-4320 Transport Truck': {
      'Non-HQ': {},
      'HQ': { 'Mechanical Component (HQ)': 4, 'Interior Part (HQ)': 3, 'Engine Part (HQ)': 2 }
    },
    'Ural-4320 Transport Truck - Canopy': {
      'Non-HQ': {},
      'HQ': { 'Mechanical Component (HQ)': 5, 'Interior Part (HQ)': 5, 'Engine Part (HQ)': 3 }
    },
    'Ural (Device)': {
      'Non-HQ': {},
      'HQ': { 'Mechanical Component (HQ)': 29, 'Interior Part (HQ)': 26, 'Engine Part (HQ)': 18 }
    },
    'Pickup-Truck': {
      'Non-HQ': { 'Mechanical Component': 19, 'Interior Part': 11, 'Engine Part': 19 },
      'HQ': {}
    },
    'S105 Car': {
      'Non-HQ': { 'Mechanical Component': 3, 'Interior Part': 2, 'Engine Part': 3 },
      'HQ': {}
    },
    'S1203 - Laboratory': {
      'Non-HQ': { 'Mechanical Component': 41, 'Interior Part': 25, 'Engine Part': 41 },
      'HQ': {}
    },
    'VW Rolf': {
      'Non-HQ': { 'Mechanical Component': 31, 'Interior Part': 19, 'Engine Part': 31 },
      'HQ': {}
    },
    'S1203 Minibus': {
      'Non-HQ': { 'Mechanical Component': 7, 'Interior Part': 4, 'Engine Part': 7 },
      'HQ': {}
    }
  },
  'Vests': {
    '6B2 Vest': {
      'Non-HQ': { 'Iron Plate': 10, 'Cloth': 14 },
      'HQ': {}
    },
    '6B3 Vest': {
      'Non-HQ': {},
      'HQ': { 'Kevlar': 7 }
    },
    'M69 Vest': {
      'Non-HQ': { 'Iron Plate': 10, 'Cloth': 14 },
      'HQ': {}
    },
    'PASGT Vest': {
      'Non-HQ': { 'Iron Plate': 10, 'Cloth': 14 },
      'HQ': {}
    }
  },
  'Helmets': {
    'PASGT Helmet': {
      'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
      'HQ': {}
    },
    'PASGT Helmet - Camouflaged': {
      'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
      'HQ': {}
    },
    'PASGT Helmet - Camouflaged Netting': {
      'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
      'HQ': {}
    },
    'SPH-4 Helmet': {
      'Non-HQ': { 'Iron Plate': 7, 'Cloth': 10 },
      'HQ': {}
    },
    'SSh-68 Helmet': {
      'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
      'HQ': {}
    },
    'SSh-68 Helmet - Camouflaged': {
      'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
      'HQ': {}
    },
    'SSh-68 Helmet - Cover': {
      'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
      'HQ': {}
    },
    'SSh-68 Helmet - KZS': {
      'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
      'HQ': {}
    },
    'SSh-68 Helmet - Netting': {
      'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
      'HQ': {}
    },
    'ZSh-5 Helmet': {
      'Non-HQ': { 'Iron Plate': 7, 'Cloth': 10 },
      'HQ': {}
    }
  },
  'Clothes': {
    'ALICE Medium Backpack': {
      'Non-HQ': { 'Cloth': 2 },
      'HQ': {}
    },
    'Bandana': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Balaclava': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'BDU Blouse': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'BDU Blouse - Rolled-up': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'BDU Trousers': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Beanie': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Boonie': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Cargo Pants': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Cargo Pants (Colored)': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Cardigan': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Classic Shoe': {
      'Non-HQ': { 'Cloth': 2 },
      'HQ': {}
    },
    'CWU-27 Pilot Coveralls': {
      'Non-HQ': { 'Cloth': 20 },
      'HQ': {}
    },
    'Dress': {
      'Non-HQ': { 'Cloth': 3 },
      'HQ': {}
    },
    'Fedora': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Fisher Hat': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Flat Cap': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Half Mask': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Hunting Vest': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'IIFS Large Combat Field Pack': {
      'Non-HQ': { 'Cloth': 32 },
      'HQ': {}
    },
    'Jacket': {
      'Non-HQ': { 'Cloth': 2 },
      'HQ': {}
    },
    'Jeans': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Jeans (Colored)': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'KLMK Coveralls': {
      'Non-HQ': { 'Cloth': 0 },
      'HQ': {}
    },
    'Knit Cap': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Kolobok Backpack': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'M70 Backpack': {
      'Non-HQ': { 'Cloth': 2 },
      'HQ': {}
    },
    'M70 Cap': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'M70 Parka': {
      'Non-HQ': { 'Cloth': 2 },
      'HQ': {}
    },
    'M70 Trousers': {
      'Non-HQ': { 'Cloth': 2 },
      'HQ': {}
    },
    'M88 Field Cap': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'M88 Jacket': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'M88 Jacket - Rolled-up': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'M88 Trousers': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Mask (Medical)': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Mask (Latex)': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Mask (Ski)': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Officer\'s Cap': {
      'Non-HQ': { 'Cloth': 64 },
      'HQ': {}
    },
    'Panamka': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Paper Bag': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Polo': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Pullover': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Robe': {
      'Non-HQ': { 'Cloth': 7 },
      'HQ': {}
    },
    'Runner Shoe': {
      'Non-HQ': { 'Cloth': 2 },
      'HQ': {}
    },
    'Sneaker': {
      'Non-HQ': { 'Cloth': 4 },
      'HQ': {}
    },
    'Soviet Combat Boots': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Soviet Pilot Jacket': {
      'Non-HQ': { 'Cloth': 11 },
      'HQ': {}
    },
    'Soviet Pilot Pants': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Suit Jacket': {
      'Non-HQ': { 'Cloth': 61 },
      'HQ': {}
    },
    'Suit Pants': {
      'Non-HQ': { 'Cloth': 50 },
      'HQ': {}
    },
    'Sweater': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Sweat Pants': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'TShirt': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'US Combat Boots': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Veshmeshok Backpack': {
      'Non-HQ': { 'Cloth': 1 },
      'HQ': {}
    },
    'Wool Hat': {
      'Non-HQ': { 'Cloth': 50 },
      'HQ': {}
    }
  },
  'HQ Components': {
    'Ammo (HQ)': {
      'Resources': { 'Petrol': 1 },
      'Non-HQ': { 'Ammo': 3 },
      'HQ': {}
    },
    'Attachment Part (HQ)': {
      'Resources': { 'Wooden Plank': 15 },
      'Non-HQ': { 'Attachment Part': 3 },
      'HQ': {}
    },
    'Component (HQ)': {
      'Resources': { 'Gold Ingot': 15 },
      'Non-HQ': { 'Component': 2 },
      'HQ': {}
    },
    'Engine Part (HQ)': {
      'Resources': { 'Copper Ingot': 45, 'Petrol': 45 },
      'Non-HQ': { 'Engine Part': 9 },
      'HQ': {}
    },
    'Interior Part (HQ)': {
      'Resources': { 'Wooden Plank': 45 },
      'Non-HQ': { 'Interior Part': 9 },
      'HQ': {}
    },
    'Mechanical Component (HQ)': {
      'Resources': { 'Gold Ingot': 45 },
      'Non-HQ': { 'Mechanical Component': 9 },
      'HQ': {}
    },
    'Rotor (HQ)': {
      'Resources': { 'Silver Ingot': 30 },
      'Non-HQ': { 'Rotor': 9 },
      'HQ': {}
    },
    'Stabilizer (HQ)': {
      'Resources': { 'Polyester': 15 },
      'Non-HQ': { 'Stabilizer': 3 },
      'HQ': {}
    },
    'Weapon Part (HQ)': {
      'Resources': { 'Iron Ingot': 15, 'Copper Ingot': 15 },
      'Non-HQ': { 'Weapon Part': 3 },
      'HQ': {}
    },
    'Kevlar': {
      'Resources': { 'Iron Plate': 1, 'Iron Ingot': 20 },
      'Non-HQ': {},
      'HQ': {}
    },
  },
  'Components': {
    'Cloth': {
      'Resources': { 'Fabric': 1, 'Polyester': 1 },
      'Non-HQ': {},
      'HQ': {}
    },
    'Iron Plate': {
      'Resources': { 'Iron Ingot': 1, 'Fabric': 1, 'Polyester': 1 },
      'Non-HQ': {},
      'HQ': {}
    },
    'Component': {
      'Resources': { 'Iron Ingot': 1, 'Copper Ingot': 1 },
      'Non-HQ': {},
      'HQ': {}
    },
    'Tempered Glass': {
      'Resources': { 'Glass': 2, 'Polyester': 1 },
      'Non-HQ': {},
      'HQ': {}
    },
    'Weapon Part': {
      'Resources': { 'Iron Ingot': 1, 'Copper Ingot': 1 },
      'Non-HQ': {},
      'HQ': {}
    },
    'Stabilizer': {
      'Resources': { 'Iron Ingot': 2, 'Gold Ingot': 1 },
      'Non-HQ': {},
      'HQ': {}
    },
    'Attachment Part': {
      'Resources': { 'Copper Ingot': 2, 'Silver Ingot': 1 },
      'Non-HQ': {},
      'HQ': {}
    },
    'Ammo': {
      'Resources': { 'Iron Ingot': 1, 'Charcoal': 1 },
      'Non-HQ': {},
      'HQ': {}
    },
    'Mechanical Component': {
      'Resources': { 'Iron Ingot': 2, 'Copper Ingot': 2 },
      'Non-HQ': {},
      'HQ': {}
    },
    'Engine Part': {
      'Resources': { 'Iron Ingot': 1, 'Copper Ingot': 1, 'Petrol': 1 },
      'Non-HQ': {},
      'HQ': {}
    },
    'Interior Part': {
      'Resources': { 'Fabric': 2, 'Polyester': 2 },
      'Non-HQ': {},
      'HQ': {}
    },
    'Rotor': {
      'Resources': { 'Charcoal': 1, 'Polyester': 1 },
      'Non-HQ': {},
      'HQ': {}
    }
  },
}

// ✅ Move this cleanup step after the object definition:
if (itemComponents['Components']?.['Kevlar']) {
  delete itemComponents['Components']['Kevlar'];
}

const componentResources = {
  'Cloth': { 'Fabric': 1, 'Polyester': 1 },
  'Iron Plate': { 'Iron Ingot': 1, 'Fabric': 1, 'Polyester': 1 },
  'Kevlar': { 'Iron Plate': 1, 'Iron Ingot': 20 },
  'Component': { 'Iron Ingot': 1, 'Copper Ingot': 1 },
  'Tempered Glass': { 'Glass': 2, 'Polyester': 1 },
  'Weapon Part': { 'Iron Ingot': 1, 'Copper Ingot': 1 },
  'Stabilizer': { 'Iron Ingot': 2, 'Gold Ingot': 1 },
  'Attachment Part': { 'Copper Ingot': 2, 'Silver Ingot': 1 },
  'Ammo': { 'Iron Ingot': 1, 'Charcoal': 1 },
  'Mechanical Component': { 'Iron Ingot': 2, 'Copper Ingot': 2 },
  'Engine Part': { 'Iron Ingot': 1, 'Copper Ingot': 1, 'Petrol': 1 },
  'Interior Part': { 'Fabric': 2, 'Polyester': 2 },
  'Rotor': { 'Charcoal': 1, 'Polyester': 1 },
  'Component (HQ)': { 'Component': 2, 'Gold Ingot': 15 },
  'Weapon Part (HQ)': { 'Weapon Part': 3, 'Iron Ingot': 15, 'Copper Ingot': 15 },
  'Stabilizer (HQ)': { 'Stabilizer': 3, 'Polyester': 15 },
  'Attachment Part (HQ)': { 'Attachment Part': 3, 'Wooden Plank': 15 },
  'Ammo (HQ)': { 'Ammo': 3, 'Petrol': 1 },
  'Mechanical Component (HQ)': { 'Mechanical Component': 9, 'Gold Ingot': 45 },
  'Engine Part (HQ)': { 'Engine Part': 9, 'Copper Ingot': 45, 'Petrol': 45 },
  'Interior Part (HQ)': { 'Interior Part': 9, 'Wooden Plank': 45 },
  'Rotor (HQ)': { 'Rotor': 9, 'Silver Ingot': 30 },
  'Special Rotor': { 'Special Rotor': 1 },
  'Special Gun Barrel': { 'Special Gun Barrel': 1 },
};

function collectBaseResources(componentName, quantity) {
  const localMap = {};
  const componentsMap = {};

  function helper(compName, qty) {
    const isResource = resourcesList.includes(compName);
    const isComponent = componentsList.includes(compName);

    const sub = componentResources[compName];

    if (isComponent && sub) {
      componentsMap[compName] = (componentsMap[compName] || 0) + qty;
    }

    if (!sub) {
      localMap[compName] = (localMap[compName] || 0) + qty;
      return;
    }

    for (const [subName, subQty] of Object.entries(sub)) {
      helper(subName, subQty * qty);
    }
  }

  helper(componentName, quantity);
  return { resources: localMap, components: componentsMap };
}


function populateItems() {
  const category = document.getElementById('categories').value;
  const items = itemsByCategory[category];
  const itemsDropdown = document.getElementById('items');
  const craftingLevelContainer = document.getElementById("crafting-level");

  itemsDropdown.innerHTML = '';

  items.forEach(item => {
    const option = document.createElement('option');
    option.textContent = item;
    option.value = item;
    itemsDropdown.appendChild(option);
  });

  // Set crafting level for the first item
  const firstItem = itemsDropdown.value;
  const firstLevel = craftingLevels[firstItem] || "NA";
  craftingLevelContainer.textContent = `Crafting Level: ${firstLevel}`;

  // ✅ Add event listener to update crafting level on item change
  itemsDropdown.addEventListener('change', () => {
    const selectedItem = itemsDropdown.value;
    const level = craftingLevels[selectedItem] || "NA";
    craftingLevelContainer.textContent = `Crafting Level: ${level}`;
  });
}


// ✅ Initialize items when the page loads
populateItems();

let breakdownMap = {}; // Store breakdown for nested components

function calculateResources() {
  const category = document.getElementById('categories').value;
  const item = document.getElementById('items').value;
  const quantity = parseInt(document.getElementById('quantity').value) || 1;

  let totalResources = {};
  let totalComponents = {};
  let totalHQComponents = {};
  let hqComponentBreakdown = {};
  let nonHQComponentBreakdown = {};

  const selectedCategory = itemComponents[category];
  const itemData = selectedCategory[item];

  if (itemData['HQ']) {
    for (const hqComponent in itemData['HQ']) {
      const hqQuantity = itemData['HQ'][hqComponent] * quantity;

      totalHQComponents[hqComponent] = (totalHQComponents[hqComponent] || 0) + hqQuantity;

      if (hqComponent !== 'Special Rotor' && hqComponent !== 'Special Gun Barrel') {
        const { resources: resMap, components: compMap } = collectBaseResources(hqComponent, hqQuantity);
        hqComponentBreakdown[hqComponent] = resMap;

        for (const [res, qty] of Object.entries(resMap)) {
          totalResources[res] = (totalResources[res] || 0) + qty;
        }
        for (const [comp, qty] of Object.entries(compMap)) {
          totalComponents[comp] = (totalComponents[comp] || 0) + qty;
        }
      }
    }
  }


  if (itemData['Resources']) {
    for (const resource in itemData['Resources']) {
      const resourceQuantity = itemData['Resources'][resource] * quantity;
      totalResources[resource] = (totalResources[resource] || 0) + resourceQuantity;
    }
  }

  if (itemData['Non-HQ']) {
    for (const nonHQComponent in itemData['Non-HQ']) {
      const nonHQQuantity = itemData['Non-HQ'][nonHQComponent] * quantity;

      totalComponents[nonHQComponent] = (totalComponents[nonHQComponent] || 0) + nonHQQuantity;

      if (componentResources[nonHQComponent]) {
        const { resources: resMap, components: compMap } = collectBaseResources(nonHQComponent, nonHQQuantity);
        nonHQComponentBreakdown[nonHQComponent] = resMap;

        for (const [res, qty] of Object.entries(resMap)) {
          if (!totalResources[res]) {
            totalResources[res] = qty;
          } else {
            totalResources[res] += qty;
          }
        }
      }
    }
  }


  // ✅ Display once at the end
  displayResults(totalResources, totalComponents, totalHQComponents, hqComponentBreakdown, nonHQComponentBreakdown);
}

function displayResults(resources, components, hqComponents, hqComponentBreakdown, nonHQComponentBreakdown) {
  const resList = document.getElementById("resources-list");
  const compList = document.getElementById("components-list");
  const hqList = document.getElementById("hq-components-list");

  resList.innerHTML = "";
  compList.innerHTML = "";
  hqList.innerHTML = "";

  const hqSection = document.getElementById("hq-components-section");
  const compSection = document.getElementById("components-section");
  const currentCategory = document.getElementById("categories").value;

  if (hqSection) {
    hqSection.style.display = Object.keys(hqComponents).length === 0 ? "none" : "block";
  }

  if (compSection) {
    compSection.style.display = currentCategory === "Components" ? "none" : "block";
  }

  for (const [name, qty] of Object.entries(resources)) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${qty}`;
    resList.appendChild(li);
  }

  for (const [name, qty] of Object.entries(components)) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${qty}`;
    compList.appendChild(li);
  }

  for (const [name, qty] of Object.entries(hqComponents)) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${qty}`;
    hqList.appendChild(li);
  }

  displayBreakdown(hqComponentBreakdown, nonHQComponentBreakdown);
}

function displayBreakdown(hqBreakdown, nonHqBreakdown) {
  let breakdownSection = document.getElementById("breakdownSection");
  if (!breakdownSection) {
    breakdownSection = document.createElement("div");
    breakdownSection.id = "breakdownSection";
    breakdownSection.classList.add("hidden", "result"); // Add 'result' class
    document.getElementById("result").appendChild(breakdownSection);
  }

  breakdownSection.innerHTML = `
<h3 style="
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 1rem;
    border-bottom: 2px solid #ccc;
    padding-bottom: 0.25rem;
    margin-bottom: 1rem;  /* ✅ Add spacing after the underline */
">
    Resources by Component:
</h3>`;

  const combineAndRender = (breakdownData) => {
    for (const [component, resources] of Object.entries(breakdownData)) {
      const wrapper = document.createElement("div");
      wrapper.style.marginBottom = "1rem"; // spacing between components

      const header = document.createElement("div");
      header.textContent = component;
      header.style.fontWeight = "bold";
      header.style.fontSize = "1.1rem"; // slightly larger

      const list = document.createElement("ul");
      list.style.listStyleType = "none"; // remove bullet points
      list.style.paddingLeft = "1rem";

      for (const [resName, qty] of Object.entries(resources)) {
        const li = document.createElement("li");
        li.textContent = `${resName}: ${qty}`;
        list.appendChild(li);
      }

      wrapper.appendChild(header);
      wrapper.appendChild(list);
      breakdownSection.appendChild(wrapper);
    }
  };

  combineAndRender(nonHqBreakdown);
  combineAndRender(hqBreakdown);
}

function addToKit() {
  const category = document.getElementById('categories').value;
  const itemDropdown = document.getElementById('items');
  const item = itemDropdown.value;
  const quantity = parseInt(document.getElementById('quantity').value) || 1;

  if (!item || item === "--" || quantity <= 0 || !itemDropdown.options.length) return;

  const existing = kit.find(entry => entry.item === item && entry.category === category);
  if (existing) {
    existing.quantity += quantity;
  } else {
    kit.push({ category, item, quantity });
  }

  // ✅ Ensure sidebar is visible
  const kitSidebar = document.getElementById("kitSidebar");
  if (kitSidebar) {
    kitSidebar.classList.add("active");
  }

  renderKit();
}

function renderKit() {
  const ul = document.getElementById("kit-list");
  ul.innerHTML = "";

  if (kit.length === 0) {
    ul.innerHTML = "<li>No items in kit.</li>";
    return;
  }

  kit.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
  <strong>${entry.item}</strong>
  <span>(x${entry.quantity}) <button class='remove-btn' onclick='removeFromKit(${index})'>Remove</button></span>
`;
    ul.appendChild(li);
  });
}

function clearKit() {
  kit.length = 0;
  renderKit();
  document.getElementById("resources-list").innerHTML = "";
  document.getElementById("components-list").innerHTML = "";
  document.getElementById("hq-components-list").innerHTML = "";
  const breakdownSection = document.getElementById("breakdownSection");
  if (breakdownSection) breakdownSection.classList.add("hidden");
}

function calculateKitQueue() {
  const totalResources = {};
  const totalComponents = {};
  const totalHQComponents = {};
  const hqComponentBreakdown = {};
  const nonHQComponentBreakdown = {};

  kit.forEach(entry => {
    const selectedCategory = itemComponents[entry.category];
    if (!selectedCategory) return;

    const itemData = selectedCategory[entry.item];
    if (!itemData) return;

    const quantity = entry.quantity;

    if (itemData['HQ']) {
      for (const hqComponent in itemData['HQ']) {
        const hqQuantity = itemData['HQ'][hqComponent] * quantity;
        totalHQComponents[hqComponent] = (totalHQComponents[hqComponent] || 0) + hqQuantity;

        if (hqComponent !== 'Special Rotor' && hqComponent !== 'Special Gun Barrel') {
          const { resources: resMap, components: compMap } = collectBaseResources(hqComponent, hqQuantity);

          hqComponentBreakdown[hqComponent] = hqComponentBreakdown[hqComponent] || {};
          for (const [res, qty] of Object.entries(resMap)) {
            hqComponentBreakdown[hqComponent][res] = (hqComponentBreakdown[hqComponent][res] || 0) + qty;
            totalResources[res] = (totalResources[res] || 0) + qty;
          }

          for (const [comp, qty] of Object.entries(compMap)) {
            totalComponents[comp] = (totalComponents[comp] || 0) + qty;
          }
        }
      }
    }

    if (itemData['Resources']) {
      for (const resource in itemData['Resources']) {
        const resourceQuantity = itemData['Resources'][resource] * quantity;
        totalResources[resource] = (totalResources[resource] || 0) + resourceQuantity;
      }
    }

    if (itemData['Non-HQ']) {
      for (const nonHQComponent in itemData['Non-HQ']) {
        const nonHQQuantity = itemData['Non-HQ'][nonHQComponent] * quantity;
        totalComponents[nonHQComponent] = (totalComponents[nonHQComponent] || 0) + nonHQQuantity;

        if (componentResources[nonHQComponent]) {
          const { resources: resMap, components: compMap } = collectBaseResources(nonHQComponent, nonHQQuantity);

          nonHQComponentBreakdown[nonHQComponent] = nonHQComponentBreakdown[nonHQComponent] || {};
          for (const [res, qty] of Object.entries(resMap)) {
            nonHQComponentBreakdown[nonHQComponent][res] = (nonHQComponentBreakdown[nonHQComponent][res] || 0) + qty;
            totalResources[res] = (totalResources[res] || 0) + qty;
          }
        }
      }
    }
  });

  displayResults(totalResources, totalComponents, totalHQComponents, hqComponentBreakdown, nonHQComponentBreakdown);
  const breakdownSection = document.getElementById("breakdownSection");
  if (breakdownSection) breakdownSection.classList.remove("hidden");
  const toggleBtn = document.getElementById("toggleBreakdownBtn");
  if (toggleBtn) toggleBtn.textContent = "Hide Breakdown";
}

function removeFromKit(index) {
  if (index >= 0 && index < kit.length) {
    kit.splice(index, 1);
    renderKit();
  }
}