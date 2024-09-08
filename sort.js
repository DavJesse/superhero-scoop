// get data from an API endpoint 
const url = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';

const body = document.querySelector('body');

const pageSizeOptions = [10, 20, 50, 100, 'All'];
let currentPage = 1;
let pageSize = 20;  // Default page size

let superheroes = [];  // To store all data
let filteredData = []; // To store filtered data based on search

export function sort(){
   generateTable(filteredData);  // Initially generate table with full data
}

const createCell = (text, element) => {
    const td = document.createElement('td');
    if (element){
        td.append(element);
    } else {
        td.textContent = text;
    }
    return td;
}

const generateTable = (loadData) => {
    // Clear any existing table
    const existingTable = document.querySelector('table');
    if (existingTable) {
        existingTable.remove();
    }

    // create table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // create header row
    const headers = ["Icon", "Name", "Full Name", "PowerStats", "Race", "Gender", "Height", "Weight", "Place Of Birth", "Alignment"];
    const headerRow = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        const headerName = header.charAt(0).toUpperCase() + header.slice(1);
        th.textContent = headerName;
        headerRow.append(th);
    });

    thead.append(headerRow);

    // loop through array
    loadData.forEach(item => {
        const row = document.createElement('tr');

        // create cells for icon
        const img = document.createElement('img');
        img.src = item.images.xs;
        img.alt = item.name;
        row.append(createCell("", img));

        // Name
        row.append(createCell(item.name));

        // Full Name
        row.append(createCell(item.biography.fullName));

        // Powerstats 
        const powerstats = Object.entries(item.powerstats)
            .map(([key, value]) => `${key}:${value} `);

        row.append(createCell(powerstats));

        // Race
        row.append(createCell(item.appearance.race));

        // Gender
        row.append(createCell(item.appearance.gender));

        // Height
        row.append(createCell(item.appearance.height));

        // Weight
        row.append(createCell(item.appearance.weight));

        // Place of Birth
        row.append(createCell(item.biography.placeOfBirth));

        // Alignment
        row.append(createCell(item.biography.alignment));

        tbody.append(row);
    });

    table.append(thead);
    table.append(tbody);

    body.append(table);
}

// Search function to filter the data
const searchSuperheroes = (query) => {
    query = query.toLowerCase();
    filteredData = superheroes.filter(hero => hero.name.toLowerCase().includes(query));
    generateTable(filteredData);
}

// Create search input field
const createSearchInput = () => {
    const searchDiv = document.createElement('div');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search for a superhero...';

    searchInput.addEventListener('input', (event) => {
        searchSuperheroes(event.target.value);
    });

    searchDiv.append(searchInput);
    body.insertBefore(searchDiv, body.firstChild);
}

// Fetch superhero data and initialize table and search
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        superheroes = data;
        filteredData = superheroes;
        createSearchInput();  // Create the search input
        generateTable(superheroes);  // Generate the initial table
    });
