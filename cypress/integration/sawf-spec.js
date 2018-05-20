/**
 * Simple Angular Wetaher Forcast Integration Test
 */
describe('Simple Angular Weather Forecast', function () {
    it('on click of Submit button with entering city name as "england" should populate exactly one row in the table', function () {
       
        cy.visit('http://localhost:9001'); // Visit the page where app is running
       
        // Get the input box where we enter the city name and type england in it
        cy.get('input[name="city"]').type("england");
        
        // Then click on the submit button
        cy.get('.btn').click(); // Since there is only one button with class that why targeting with general classes
        
        // After that check if details of england are fetched by counting the rows in  the table
        cy.get('tbody').children().should('have.length', 1); 
    });
    it('on click of Submit button without entering city name should not populate any extra row in the table', function () {       
        // Get the input box where we enter the city name and clear the field
        cy.get('input[name="city"]').clear();

        // Then click on the submit button
        cy.get('.btn').click(); // Since there is only one button with class that why targeting with general classes
        
        // After that check if any extra row added. It should not add extra row beacuse city name is not given
        cy.get('tbody').children().should('have.length', 1);  // Checking for 1 as 1 row is already present
    });

    it('on click of Submit button with same city name as "england" should not populate duplicate row in the table', function () {
        // Get the input box where we enter the city name and type england in it
        cy.get('input[name="city"]').type("england");
        
        // Then click on the submit button
        cy.get('.btn').click(); // Since there is only one button with class that why targeting with general classes
        
        // After that check if details of england are not duplicated in the table
        cy.get('tbody').children().should('have.length', 1); 
    });
})