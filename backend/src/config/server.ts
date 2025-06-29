import app from '../app';
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);
});
