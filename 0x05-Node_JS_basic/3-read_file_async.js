const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const rows = data.split('\n').filter((line) => line.trim() !== '');
      if (rows.length <= 1) {
        console.log('No valid students in the file.');
        resolve();
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

      resolve();
    });
  });
}

module.exports = countStudents;
