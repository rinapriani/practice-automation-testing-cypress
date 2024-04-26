/// <reference types="cypress" />

describe('Handle Form validation', () => {

    beforeEach('User try to visit the practice website', () => {

        cy.visit('https://practice.expandtesting.com/form-validation')
    })

    it ("user try to create form validation", () => {
        
        cy.fixture('datatest').then((dataform) => {

            const formDataValid = dataform.formValidationData.formValidationDataValid;
            cy.formValidation(formDataValid);
        })
       

    })
 
})

