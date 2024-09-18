const fs = require('fs').promises;

const readDatabase = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.trim().split('\n');
    // const headers = lines[0].split(',');
    const students = {};

    lines.slice(1).forEach((line) => {
      const [firstname, , field] = line.split(',');
      if (firstname && field) {
        if (!students[field]) {
          students[field] = [];
        }
        students[field].push(firstname);
      }
    });

    return students;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = { readDatabase };
