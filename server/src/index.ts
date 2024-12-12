import express from 'express'
import router from './router.js';
import cors from 'cors'
const PORT = 8080;

declare global {
  interface BigInt {
      toJSON(): Number;
  }
}
BigInt.prototype.toJSON = function () { return Number(this) }

const app = express();

app.use(cors());
app.use(express.json())

app.use('/api', router);

app.listen(PORT, () => {
  console.log("App is listening at",PORT);
})