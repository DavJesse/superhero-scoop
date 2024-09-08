// get data from an API endpoint 
const url = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json'

const body = document.querySelector('body')

export function sort(){
   generateTable()
}
const createCell = (text, element) => {
    const td = document.createElement('td');
    if (element){
        td.append(element)
    }else{
        td.textContent = text
    }
    return td
}

const generateTable = (loadData) => {
        // create table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // create header row
    const headers = ["Icon","Name","Full Name","PowerStats","Race","Gender","Height", "Weight","Place Of Birth","Alignment"]

    const headerRow = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        const headerName = header.charAt(0).toUpperCase() + header.slice(1);
        th.textContent = headerName
        headerRow.append(th)
    });

    thead.append(headerRow);

    // loop through array
    loadData.forEach(item => {
        const row = document.createElement('tr');

        // create cells for name 
        const img = document.createElement('img')
        img.src = item.images.xs;
        img.alt = item.name;
        row.append(createCell("",img))

        // creating input files for others

        tbody.append(row);
    });

    // creates table cells
    

    table.append(thead);
    table.append(tbody);

    body.append(table);

}
fetch(url)
.then((response) => response.json())
.then(generateTable)

