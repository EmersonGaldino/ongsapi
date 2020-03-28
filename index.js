const express = require('express');

const app = express();
app.use(express.json());
app.get('/users', (req, response) => {
  return response.json({
    Users: [
      { name: 'Galdino', stacks: [{ stack: '.Net' }, { stack: 'ReacJs' }] },
      {
        name: 'Ricardo',
        stacks: [{ stack: 'ReactNative' }, { stack: 'Angular' }]
      },
      { name: 'Stella', stakcs: [{ stack: 'SQL' }, { stack: 'JS' }] }
    ]
  });
});

app.listen(3333);
