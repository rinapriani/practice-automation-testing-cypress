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

    // Assert that Option 2 is selected
   cy.get('select')  // Assuming the select element has no unique identifier
   .find('option[value="2"]')  // Find the option with value "2"
   .should('have.attr', 'selected', 'selected');

   // Stubbing the onchange event to prevent it from causing errors
   cy.get('#elementsPerPageSelect').then($select => {
   $select[0].removeAttribute('onchange');
   });

   // Select the option with value '20'
   cy.get('#elementsPerPageSelect') // Assuming the select element has id "elementsPerPageSelect"
   .select('20'); // Select option with value '20'
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
        
        // You can now perform any interactions with the YouTube video
        // For example, you can click on the video player to play it
        cy.get('div.html5-video-container').click();
      } else {
        // Handle cases where the src attribute does not contain a YouTube URL
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

         // Click on the "Heading" option
        cy.get('.tox-tiered-menu')
        .contains('Headings')
        .click();

        // Click on the "Heading 1" option
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

         // Type email into the input field inside the iframe
         cy.wrap(iframe).find('input[type="email"]').type('rina.apriani498@gmail.com');
         cy.wrap(iframe).find('#btn-subscribe').click();

         // Verify the success message text inside the iframe
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