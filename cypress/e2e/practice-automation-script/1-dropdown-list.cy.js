/// <reference types="cypress" />

context('Handle Dropdown List', () => {
    beforeEach(() => {

      cy.visit('https://practice.expandtesting.com/dropdown')

    });


    it ('The user performs set a simple dropdown action',() => {
        // Stubbing setElementsPerPage function
        window.setElementsPerPage = () => {};

       cy.dropdown();

        //select the county with value 'Indonesia'
        cy.get('#country').select('Indonesia');
        cy.get('select')
        .find('option[value="ID"]')
        .should('have.attr', 'selected', 'selected');
        
    });

});