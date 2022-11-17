const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration

  viewportWidth: 1600,
  viewportHeight: 900,
  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      // include any other plugin code...
      
      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    }
  }
})
