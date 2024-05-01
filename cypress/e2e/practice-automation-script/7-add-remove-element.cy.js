/// <reference types = "cypress"/>

describe('should be add and remove element', () => {

    beforeEach('Try to visit website', () => {

        cy.visit('https://practice.expandtesting.com/add-remove-elements')
    });

    it ('Try to add 5 element button', () => {

        for (let i = 0; i < 5; i++){

            cy.get('button.btn.btn-primary.mt-3').click();
        }
    });


    it ('Try to delete 2 element button', () => {

        for (let i = 0; i < 5; i++){

            cy.get('button.btn.btn-primary.mt-3').click();
        }
        cy.get('#elements button.added-manually').eq(0).click()
        cy.get('#elements button.added-manually').eq(1).click()
    })


    it ('Try to delete all element button', () => {

        for (let i = 0; i < 5; i++){

            cy.get('button.btn.btn-primary.mt-3').click();
        }
        cy.get('#elements button.added-manually').each(($button) =>{
            cy.wrap($button).click()
        })
    });

})