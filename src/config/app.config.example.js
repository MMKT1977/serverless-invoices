// Example configuration - copy this to app.config.js and modify
export default {
  storageType: 'local', // 'local' or 'session'
  base_url: process.env.BASE_URL || '/',
  api_url: process.env.VUE_APP_API_URL || 'https://api.example.com',
  app_name: 'Invoice App',
  default_locale: 'en',
  features: {
    offline_mode: true,
    pdf_export: true,
  },
};
