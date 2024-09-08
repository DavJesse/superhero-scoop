const pageSizeOptions = [10, 20, 50, 100, 'All'];
let currentPage = 1;
let pageSize = 20;  // Default page size

export const createPages = () => {
    const pageDiv = document.createElement('div');

    // Create page size slect input

    const select = document.createElement('select');

    pageSizeOptions.forEach( size => {
        const option = document.createElement('option')
    })


}