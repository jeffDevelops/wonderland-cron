require('dotenv').config()

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('task', {
    log(message) {
      console.log(message)
      return null
    },
  })

  if (!process.env.WONDERLAND_API_URL)
    throw new Error('WONDERLAND_API_URL not present in env vars')

  if (!process.env.WONDERLAND_API_KEY)
    throw new Error('WONDERLAND_API_KEY not present in env vars')

  config.env.WONDERLAND_API_URL = process.env.WONDERLAND_API_URL
  config.env.WONDERLAND_API_KEY = process.env.WONDERLAND_API_KEY

  config.defaultCommandTimeout = 30000

  return config
}
