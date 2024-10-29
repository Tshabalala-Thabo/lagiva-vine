// This is a CommonJS wrapper for the ES module config
const getConfig = async () => {
  const { default: config } = await import('./migrate-mongo-config.js');
  return config;
};

module.exports = getConfig(); 