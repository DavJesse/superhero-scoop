// Pagination functions
let currentPage = 1;
let pageSize = 20;  
let allResults = false;

export const paginate = (array, pageSize, currentPage) => {
    if (allResults) return array;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}

export const generatePaginationControls = (totalItems, pageSize) => {
    const paginationDiv = document.querySelector('.pagination');
    if (paginationDiv) paginationDiv.remove();
    if (allResults) return;

    const totalPages = Math.ceil(totalItems / pageSize);
    const newPaginationDiv = document.createElement('div');
    newPaginationDiv.className = 'pagination';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            generateTable(paginate(filteredData, pageSize, currentPage));
        }
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            generateTable(paginate(filteredData, pageSize, currentPage));
        }
    });

    newPaginationDiv.append(prevButton);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.disabled = i === currentPage;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            generateTable(paginate(filteredData, pageSize, currentPage));
        });
        newPaginationDiv.append(pageButton);
    }
    newPaginationDiv.append(nextButton);
    body.append(newPaginationDiv);
}

export const generatePageSizeSelector = () => {
    const existingSelector = document.querySelector('.page-size-selector');
    if (existingSelector) existingSelector.remove();

    const selectorDiv = document.createElement('div');
    selectorDiv.className = 'page-size-selector';

    const label = document.createElement('label');
    label.textContent = 'Page Size: ';

    const select = document.createElement('select');
    select.innerHTML = `
        <option value="10">10</option>
        <option value="20" selected>20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="all">All</option>
    `;

    select.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        allResults = selectedValue === 'all';
        pageSize = allResults ? filteredData.length : parseInt(selectedValue, 10);
        currentPage = 1;
        generateTable(paginate(filteredData, pageSize, currentPage));
    });

    selectorDiv.append(label, select);
    body.append(selectorDiv);
}
