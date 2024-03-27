/// <reference types="cypress" />

describe('Broken Images Test', () => {
    it('Should check for broken images', () => {
        // Visit the page with broken images
        cy.visit('https://practice.expandtesting.com/broken-images');

        // Get all image elements
        cy.get('img').each(($img) => {
            const imageUrl = $img.prop('src');

            // Load image and check status
            cy.request({
                url: imageUrl,
                failOnStatusCode: false // Prevent Cypress from failing the test if the request fails
            }).then((response) => {
                // Check if the image loaded successfully
                if (response.status === 200) {
                    // Assert that the image is not broken
                    cy.log(`Image ${imageUrl} is not broken.`);
                } else {
                    // Image loaded with an error status code
                    cy.log(`Image ${imageUrl} is broken. Status code: ${response.status}`);
                }
            });
        });
    });
});