/// <reference types="cypress" />

describe('Tracalorie automation testing', () => {
    beforeEach(() => {

        cy.visit('https://practice.expandtesting.com/tracalorie')
  
    });

    it('The user performs add meal/food item', () => {

        cy.tracalories();
 
    });

});