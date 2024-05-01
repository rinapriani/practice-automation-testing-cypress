/// <reference types = "cypress" />

describe('Verifying Browser Information on macOS', () => {
    it('should verify browser information on macOS', () => {
      // Visit any page
      cy.visit('https://practice.expandtesting.com/my-browser');
      cy.get('#browser-toggle').click()
  
      // Get the window object and access browser information
      cy.window().then((win) => {
        const userAgent = win.navigator.userAgent;
        const appCodeName = win.navigator.appCodeName;
        const appVersion = win.navigator.appVersion;
        const cookiesEnabled = win.navigator.cookieEnabled;
        const platform = win.navigator.platform;
        
        // Log the browser information
        cy.log(`User Agent: ${userAgent}`);
        cy.log(`App Code Name: ${appCodeName}`);
        cy.log(`App Version: ${appVersion}`);
        cy.log(`Cookies Enabled: ${cookiesEnabled}`);
        cy.log(`Platform: ${platform}`);

        //verify data
        cy.get('#browser-user-agent').should('contain.text', userAgent)
        cy.get('#browser-code-name').should('contain.text', appCodeName)
        cy.get('#browser-name').should('contain.text', 'Google Chrome')
        cy.get('#browser-version').should('contain.text', appVersion)
        cy.get('#browser-cookie').should('contain.text',cookiesEnabled)
        cy.get('#browser-platform').should('contain.text', platform)
  
      });
      cy.get('#browser-toggle').click();
    });
  });