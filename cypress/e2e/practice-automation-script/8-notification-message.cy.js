/// <reference types = "cypress" />

describe('should handle notification messsage', () => {

    beforeEach('try to visit to website', () => {
        cy.visit('https://practice.expandtesting.com/notification-message-rendered')
    })

    it ('Try to handle unsuccessful notification message', () => {
        cy.get('a[href="/notification-message"]').click();
        cy.get('#flash').should('contain.text', 'Action unsuccessful, please try again');
        cy.get('button.btn-close').click();
    })

    it('Try to handle successful notification message', () => {
        cy.get('a[href="/notification-message"]').click();
        cy.get('#flash').should('contain.text', 'Action successful');
        cy.get('button.btn-close').click();
    })

})