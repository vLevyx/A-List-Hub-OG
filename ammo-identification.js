document.addEventListener('DOMContentLoaded', () => {
    const data = [
        { weapon: 'AK-47', ammo: '5.45x39mm', type: 'assault' },
        { weapon: 'RPK-74', ammo: '5.45x39mm', type: 'machine-gun' },
        { weapon: 'M16A2', ammo: '5.56x45mm', type: 'assault' },
        { weapon: 'M16A2 - AUTO', ammo: '5.56x45mm', type: 'assault' },
        { weapon: 'M249 SAW', ammo: '5.56x45mm', type: 'machine-gun' },
        { weapon: 'M416', ammo: '5.56x45mm', type: 'assault' },
        { weapon: 'SIG MCX', ammo: '5.56x45mm', type: 'assault' },
        { weapon: 'Stegr AUG', ammo: '5.56x45mm', type: 'assault' },
        { weapon: 'PKM', ammo: '7.62x54mmR', type: 'machine-gun' },
        { weapon: 'SVD', ammo: '7.62x54mmR', type: 'sniper' },
        { weapon: 'SA-58P', ammo: '7.62x39mm', type: 'assault' },
        { weapon: 'Scar-H', ammo: '7.62x51mm', type: 'marksman' },
        { weapon: 'M21 SWS', ammo: '7.62x51mm', type: 'marksman' },
        { weapon: 'SR-25 Rifle', ammo: '7.62x51mm', type: 'marksman' },
        { weapon: 'Colt 1911', ammo: '.45 ACP', type: 'pistol' },
        { weapon: 'PM', ammo: '9x18mm', type: 'pistol' },
        { weapon: 'M9', ammo: '9x19mm', type: 'pistol' },
        { weapon: 'MP5A2', ammo: '9x19mm', type: 'submachine' }
    ];

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
