const { readDatabase } = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    const dbFile = process.argv[2] || '';
    try {
      const students = await readDatabase(dbFile);
      const responseLines = ['This is the list of our students'];

      Object.keys(students).sort((a,
        b) => a.toLowerCase().localeCompare(b.toLowerCase())).forEach((field) => {
        responseLines.push(`Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`);
      });

      res.status(200).send(responseLines.join('\n'));
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const major = req.params.major;
    const dbFile = process.argv[2] || '';

    if (!['CS', 'SWE'].includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const students = await readDatabase(dbFile);
      if (!students[major]) {
        return res.status(500).send('Cannot load the database');
      }

      res.status(200).send(`List: ${students[major].join(', ')}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
