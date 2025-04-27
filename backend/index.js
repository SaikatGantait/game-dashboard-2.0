const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const gameRoutes = require('./routes/game');
app.use('/api/game', gameRoutes);

app.listen(5000, () => console.log('Backend running at http://localhost:5000'));
