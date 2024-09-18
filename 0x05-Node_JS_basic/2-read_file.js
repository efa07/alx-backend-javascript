const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');

    const rows = data.split('\n').filter((line) => line.trim() !== '');

    if (rows.length <= 1) {
      console.log('No valid students in the file.');
      return;
    }

    const students = rows.slice(1);
    console.log(`Number of students: ${students.length}`);

    const fields = {};

    students.forEach((row) => {
      const [firstname, , , field] = row.split(',');

      if (fields[field]) {
        fields[field].push(firstname);
      } else {
        fields[field] = [firstname];
      }
    });

    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
