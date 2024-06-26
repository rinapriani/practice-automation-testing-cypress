// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('dropdown', () => {
    cy.get('#dropdown').select('Option 2').should('have.value', '2');

    
   cy.get('select') 
   .find('option[value="2"]')  
   .should('have.attr', 'selected', 'selected');

   // Stubbing the onchange event to prevent it from causing errors
   cy.get('#elementsPerPageSelect').then($select => {
   $select[0].removeAttribute('onchange');
   });

   // Select the option with value '20'
   cy.get('#elementsPerPageSelect') 
   .select('20'); 
})

Cypress.Commands.add('inputDataForProcessing', (userData) => {

    cy.get('#input-number').type(userData.userNumber);
    cy.get('#input-text').type(userData.userName);
    cy.get('#input-password').type(userData.userPassword);

    cy.get('#input-date').then($input => {
        // Clear any existing value
        cy.wrap($input).clear();
    
        // Enter the desired date
        cy.wrap($input).type('2024-03-25');
        
    });
    cy.get('#btn-display-inputs').click();

});


Cypress.Commands.add('clickYouTubeLink', () => {
    // Get the iframe element
    cy.get('iframe#iframe-youtube').then(($iframe) => {
      // Extract the src attribute containing the URL
      const src = $iframe.attr('src');
  
      // Ensure that the src attribute contains the YouTube URL
      if (src.includes('youtube.com')) {
        // Visit the YouTube URL directly
        cy.visit(src);
        
        cy.get('div.html5-video-container').click();
      } else {
        
        cy.log('The iframe does not contain a YouTube video.');
      }
    });
});

Cypress.Commands.add('TinyMCEEditor', () => {

    cy.visit('https://practice.expandtesting.com/iframe');

    cy.get('#mce_0_ifr').scrollIntoView();

    cy.get('#mce_0_ifr').then(function($iframe){

        let iframebody = $iframe.contents().find('body');
        cy.wrap(iframebody).clear()
        .type('Welcome to cypress automation testing for iframe')
        .type('{selectall}')

        cy.get('[aria-label = "Bold"]').click();

        cy.get('button[title="Format Bold"]').click();

         
        cy.get('.tox-tiered-menu')
        .contains('Headings')
        .click();

        
        cy.get('.tox-tiered-menu')
        .contains('Heading 1')
        .click();

        cy.get('[aria-label="Align center"]').click();
        cy.get('#mce_0_ifr').scrollIntoView().click();
    });
})

Cypress.Commands.add('subscription', () => {

     // Visit the page containing the iframe
     cy.visit('https://practice.expandtesting.com/iframe');

     cy.scrollTo('bottom');

     // Get the iframe
     cy.get('#email-subscribe').then(($iframe) => {
         const iframe = $iframe.contents().find('body');

         
         cy.wrap(iframe).find('input[type="email"]').type('rina.apriani498@gmail.com');
         cy.wrap(iframe).find('#btn-subscribe').click();

         
         cy.wrap(iframe).find('#success-message')
             .should('have.text', 'You are now subscribed!');
     });
});

Cypress.Commands.add('tracalories', () => {
    cy.fixture('datatest').then((data) => {

        const tracalorie = data.tracaloriesData.validDataTracalories;

        //add item calories of Bakso
        cy.get('#item-name').type(tracalorie.itemName1);
        cy.get('#item-calories').type(tracalorie.calories1);
        cy.get('button.add-btn').click();

        // Verify the total calories element with the data from the fixture
        cy.get('.total-calories').should('have.text', tracalorie.calories1);

        // Verify the item details element with the data from the fixture
        cy.get('#item-0').should('contain', tracalorie.itemName1);
        cy.get('#item-0').should('contain', tracalorie.calories1);

        //add item calories of Pizza
        cy.get('#item-name').type(tracalorie.itemName2);
        cy.get('#item-calories').type(tracalorie.calories2);
        cy.get('button.add-btn').click();

        // Calculate the expected total calories
        const expectedTotalCalories = tracalorie.calories1 + tracalorie.calories2;

        // Verify the total calories element with the data from the fixture
        cy.get('.total-calories').should('have.text', expectedTotalCalories);

        // Verify the item details element with the data from the fixture
        cy.get('#item-1').should('contain', tracalorie.itemName2);
        cy.get('#item-1').should('contain', tracalorie.calories2);

        //update meals 
        cy.get('i.edit-item.fa.fa-pencil').click({multiple : true});
        cy.get('#item-name').clear().type(tracalorie.itemName3);
        cy.get('#item-calories').clear().type(tracalorie.calories3);
        cy.get('button.update-btn').click();

        const newExpectedTotalCalories = tracalorie.calories1 + tracalorie.calories3

         // Verify the new total calories element with the data from the fixture
         cy.get('.total-calories').should('have.text', newExpectedTotalCalories);

         cy.get('a.clear-btn.btn').click();


    });
})

Cypress.Commands.add('formValidation', (formDataValid) => {

        cy.get('#validationCustom01').clear().type(formDataValid.name);
        cy.get('#validationCustom05').type(formDataValid.phoneNumber);
        cy.get('#validationCustom04').select('cashondelivery');
        cy.get('button[type="submit"]').should('contain', 'Register').click();
        cy.get('div.invalid-feedback').should('contain', 'Please provide valid Date.');

})