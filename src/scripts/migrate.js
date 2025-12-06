import './setupDotenv';
import { sequelize } from '../src/models/index.js';


(async () => {
try {
await sequelize.authenticate();
console.log('DB connected');
await sequelize.sync({ alter: true });
console.log('DB synced (alter true)');
process.exit(0);
} catch (err) {
console.error(err);
process.exit(1);
}
})();