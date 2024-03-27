/// <reference types="cypress" />

describe('Hanle Dropdown List', () => {
    beforeEach(() => {

      cy.visit('https://practice.expandtesting.com/inputs',{ visitOnlyOnce: true })

    });

    it ('The user perform input data for processing', () => {

        cy.fixture('datatest').then((data) => {

            const validUser = data.dataWebInput.validData;

            cy.inputDataForProcessing(validUser);
            
            //verify number 
            cy.get('strong.output-box#output-number')
            .should('be.visible') 
            .invoke('text') 
            .then(text => {
                // Assert that the text content is correct
                expect(text.trim()).to.equal(validUser.userNumber); 
            });

            //verify input text
            cy.get('strong.output-box#output-text')
            .should('be.visible') 
            .invoke('text') 
            .then(text => {
                // Assert that the text content is correct
                expect(text.trim()).to.equal(validUser.userName); 
            });

            //verify input password
            cy.get('strong.output-box#output-password')
            .should('be.visible') 
            .invoke('text') 
            .then(text => {
                // Assert that the text content is correct
                expect(text.trim()).to.equal(validUser.userPassword); 
            });

            //verify input date
            cy.get('strong.output-box#output-date')
            .should('be.visible') 
            .invoke('text') 
            .then(text => {
                // Assert that the text content is correct
                expect(text.trim()).to.equal('2024-03-25'); 
            });
        }); 
    });
        
});