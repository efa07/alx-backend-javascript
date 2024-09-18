const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 1245;

const countStudents = async (dataPath) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const reportParts = [];
    const fileLines = data.trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1];
      if (!Object.keys(studentGroups).includes(field)) {
        studentGroups[field] = [];
      }
      const studentEntries = studentPropNames.map((propName, idx) => [propName,
        studentPropValues[idx]]);
      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    const totalStudents = Object.values(studentGroups).reduce((pre,
      cur) => (pre || []).length + cur.length, 0);
    reportParts.push(`Number of students: ${totalStudents}`);
    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push(`Number of students in ${field}: ${group.length}. List: ${group.map((student) => student.firstname).join(', ')}`);
    }

    return reportParts.join('\n');
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const dbFile = process.argv[2] || '';
  try {
    const studentReport = await countStudents(dbFile);
    res.setHeader('Content-Type', 'text/plain');
    res.send(`This is the list of our students\n${studentReport}`);
  } catch (error) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = app;
