const express = require('express');

const app = express();

app.get('/users', (req, response) => {
  return response.json({
    Users: [{ name: 'Galdino' }, { name: 'Ricardo' }, { name: 'Stella' }]
  });
});

app.listen(3333);
