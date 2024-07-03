interface Student {
    firstName: string,
    lastName: string,
    age: number,
    location: string
}

const student1: Student = {
    firstName: "Efa",
    lastName: 'Tariku',
    age: 23,
    location: 'Ethiopia'
}
const student2: Student = {
    firstName: 'sifan',
    lastName: 'Hailu',
    age: 22,
    location: 'Oromia'
}

const studentsList: Student[] = [student1, student2];

const body: HTMLBodyElement = document.getElementsByTagName("body")[0];
const table: HTMLTableElement = document.createElement('table');
const thead: HTMLTableSectionElement = document.createElement('thead');
const th1: HTMLTableCellElement = document.createElement('th');
const th2: HTMLTableCellElement = document.createElement('th');

th1.innerText = 'First Name';
th2.innerText = 'Location';
th1.style.border = '1px solid black';
th2.style.border = '1px solid black';
th1.style.padding = '.4.5rem';
th2.style.padding = '.4.5rem';
table.style.border = '1px solid black';
table.style.borderCollapse = 'collapse';

thead.append(th1);
thead.append(th2);
table.append(thead);

studentsList.forEach((student) => {
  const row: HTMLTableRowElement = document.createElement('tr');

  const column1: HTMLTableCellElement = document.createElement('td');
  const column2: HTMLTableCellElement = document.createElement('td');

  column1.innerText = student.firstName;
  column2.innerText = student.lastName;

  column1.style.border = '1px solid black';
  column2.style.border = '1px solid black';
  column1.style.padding = '4.5rem';
  column2.style.padding = '4.5rem';

  row.append(column1);
  row.append(column2)

  table.append(row);
});

body.append(table)
