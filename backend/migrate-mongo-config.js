import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

// Get current directory using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  mongodb: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    databaseName: process.env.DB_NAME || 'your_database_name',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  // Use absolute path for migrations directory
  migrationsDir: `${__dirname}/migrations`,
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  moduleSystem: 'esm'
};

export default config;