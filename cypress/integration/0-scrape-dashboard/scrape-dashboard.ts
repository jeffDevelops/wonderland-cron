import * as dashboardSchema from '../../fixtures/dashboard.json'
import { POST_DASHBOARD_UPDATE } from '../../../networking/graphql/PostDashboardUpdate'

type Payload = { [key: string]: string | number }

describe('Scrape dashboard', () => {
  before(() => {
    cy.visit('/#/dashboard')
  })

  it('scrapes the dashboard', () => {
    // Wait for the dashboard to load
    cy.get('.dashboard-view').should('be.visible', { timeout: 15000 })

    // Assert the expected layout
    cy.waitUntil(() =>
      cy
        .get('.dashboard-view .dashboard-infos-wrap .MuiGrid-container')
        .children()
        .should('have.length', 8)
        .then(async () => {
          // Assert all values present in the DOM (page hasn't been reworked)
          const payload: Payload = await Object.keys(dashboardSchema).reduce(
            async (acc: Promise<Payload>, current: string) => {
              let nextPromise = await acc

              const labelNode = Cypress.$(`.card-title:contains(${current})`)
              const value = (() => {
                // Format / type values appropriately

                if (current === 'APY') {
                  return parseFloat(
                    labelNode
                      .siblings('.card-value')[0]
                      .textContent.replaceAll(/[\$,%]/g, '')
                  )
                }

                if (current === 'Runway') {
                  return parseFloat(
                    labelNode
                      .siblings('.card-value')[0]
                      .textContent.replaceAll(/(?![\d\.].*)/g, '')
                  )
                }

                return labelNode.siblings('.card-value')[0].textContent
              })()

              return { ...nextPromise, [dashboardSchema[current]]: value }
            },
            Promise.resolve({})
          )

          cy.request({
            url: Cypress.env('WONDERLAND_API_URL'),
            method: 'POST',
            headers: {
              Authorization: `Bearer ${Cypress.env('WONDERLAND_API_KEY')}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: {
              query: POST_DASHBOARD_UPDATE,
              variables: {
                data: payload,
              },
            },
          }).then((response) => {
            if (response.body.errors) {
              console.log(JSON.stringify(response.body.errors))

              cy.log(JSON.stringify(response.body.errors))
            }

            console.log(response.body.errors)

            expect(response.body.errors).to.equal(undefined)
          })
        })
    )
  })
})
