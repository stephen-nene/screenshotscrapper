const express = require('express');
const cors = require('cors');
const path = require('path');
const {screenShot} = require('./src/screenShot')
const {errors} = require('./src/errors')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Scrapper server' });
});


app.post('/screenshot', async (req, res) => {
  screenShot(req,res)
});

// Serve the images directory statically
app.use('/images', express.static(path.join(__dirname, 'src/images')));

app.get('/*', (req, res) => {
  errors(res)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
