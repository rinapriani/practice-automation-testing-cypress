/// <reference types="cypress" />

describe('Click YouTube link within iframe', () => {

    it('Clicks a YouTube link within an iframe', () => {
      // Visit the page containing the iframe
      cy.visit('https://practice.expandtesting.com/iframe');

      it('Clicks YouTube link within iframe', () => {
        // Get the iframe element
        cy.clickYoutubeLink();

        });
  
    }); 

    it('Handling iFrame containing the TinyMCE Editor', () => {

       cy.TinyMCEEditor();
        
    });

    it('Should type email into the input field inside the iframe', () => {

        cy.subscription();
    });
});