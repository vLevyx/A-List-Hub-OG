document.addEventListener('DOMContentLoaded', () => {
    const data = [
    
    // Assault Rifles
    { weapon: 'AK-74', ammo: '5.45x39mm 30rnd AK Mag and 5.45x39mm 45rnd RPK-74 Tracer Mag', type: 'assault' },
    { weapon: 'AKS74U', ammo: '5.45x39mm 30rnd AK Mag and 5.45x39mm 45rnd RPK-74 Tracer Mag', type: 'assault' },
    { weapon: 'M16A2', ammo: '5.56x45mm 30rnd STANAG Mag', type: 'assault' },
    { weapon: 'M16A2 - AUTO', ammo: '5.56x45mm 30rnd STANAG Mag', type: 'assault' },
    { weapon: 'M416', ammo: '5.56x45mm 30rnd STANAG Mag', type: 'assault' },
    { weapon: 'SA-58P', ammo: '7.62x39mm 30rnd Sa-58 Mag', type: 'marksman' },
    { weapon: 'Scar-H', ammo: '7.62x51mm FMJ', type: 'assault' },    

    // Machine Guns
    { weapon: 'RPK-74', ammo: '5.45x39mm 45rnd RPK-74 Tracer Mag', type: 'machine-gun' },
    { weapon: 'M249 SAW', ammo: '5.56x45mm 200rnd M249 Belt', type: 'machine-gun' },
    { weapon: 'PKM', ammo: '7.62x54mmR 100rnd PK Belt', type: 'machine-gun' },  
    
    // Submachine Guns
    { weapon: 'MP5A2', ammo: '9x19mm 30rnd MP5 Mag', type: 'submachine' },
    { weapon: 'MP7A2', ammo: '4.6x40mm 40rnd Mag', type: 'submachine' },
    { weapon: 'M16 Carbine', ammo: '5.56x45mm 30rnd STANAG Mag', type: 'submachine' },

    // Snipers
    { weapon: 'M21 SWS', ammo: '7.62x51mm 20rnd M14 Mag', type: 'sniper' },
    { weapon: 'SR-25 Rifle', ammo: 'SR25 7.62x51mm 20rnd', type: 'sniper' },
    { weapon: 'SVD', ammo: '7.62x54mmR 10rnd SVD Mag', type: 'sniper' },
    { weapon: 'SSG10A2', ammo: '5rnd .338 FMJ', type: 'sniper' },

    // Shotguns
    { weapon: 'MP-43', ammo: '12/70 7mm Buckshot', type: 'shotgun' },
    
    // Pistols
    { weapon: 'Colt 1911', ammo: '.45 ACP 8rnd PM Mag', type: 'pistol' },
    { weapon: 'PM', ammo: '9x18mm 8rnd PM Mag', type: 'pistol' },
    { weapon: 'M9', ammo: '9x19mm 15rnd M9 Mag', type: 'pistol' },
    { weapon: 'Desert Eagle', ammo: '.50 AE 7rnd Mag', type: 'pistol' },

];

// Ensure your data processing function is able to handle these entries correctly.


    const tableBody = document.querySelector('#compatibilityTable tbody');
    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('.filter-button');

    function populateTable(filter = '', selectedTypes = []) {
        tableBody.innerHTML = '';
        const filteredData = data.filter(item => 
            (item.weapon.toLowerCase().includes(filter.toLowerCase()) || 
            item.ammo.toLowerCase().includes(filter.toLowerCase())) && 
            (selectedTypes.length === 0 || selectedTypes.includes(item.type))
        );
        filteredData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.weapon}</td><td>${row.ammo}</td>`;
            tableBody.appendChild(tr);
        });
    }

    function sortTable(column) {
        data.sort((a, b) => {
            const aVal = Object.values(a)[column].toLowerCase();
            const bVal = Object.values(b)[column].toLowerCase();
            return aVal.localeCompare(bVal);
        });
        populateTable(searchInput.value, getSelectedTypes());
    }

    function getSelectedTypes() {
        return Array.from(filterButtons)
            .filter(button => button.classList.contains('selected'))
            .map(button => button.dataset.type);
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('selected');
            populateTable(searchInput.value, getSelectedTypes());
        });
    });

    searchInput.addEventListener('input', () => populateTable(searchInput.value, getSelectedTypes()));

    document.getElementById('darkModeButton').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.container').classList.toggle('dark-mode');
        document.querySelector('.select-box').classList.toggle('dark-mode');
        tableBody.closest('table').classList.toggle('dark-mode');
    });

    populateTable();
});
