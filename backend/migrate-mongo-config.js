import dotenv from 'dotenv';

dotenv.config();

const config = {
  mongodb: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017', // Use environment variable or default
    databaseName: process.env.DB_NAME || 'your_database_name', // Use environment variable or default
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
};

export default config; // Use export default