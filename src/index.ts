import app from './server/App';
import 'dotenv/config';

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running');
});