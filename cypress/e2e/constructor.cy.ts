const selectors = {
  bunItem: '[data-testid="bun-item"]',
  mainItem: '[data-testid="main-item"]',
  constructorBunTop: '[data-testid="constructor-bun-top"]',
  constructorBunBottom: '[data-testid="constructor-bun-bottom"]',
  constructorIngredient: '[data-testid="constructor-ingredient"]',
  modal: '[data-testid="modal"]',
  modalOverlay: '[data-testid="modal-overlay"]',
  modalCloseButton: '[data-testid="modal-close-button"]',
  orderButton: 'button[type="button"]',
  orderNumber: '[data-testid="order-number"]',
};

describe('Burger Builder', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });


  describe('Adding ingredients to the builder', () => {
    it('adds a block to the builder', () => {
      cy.get(selectors.bunItem).first().find('button').click();

      cy.get(selectors.constructorBunTop)
        .should('contain', 'Краторная булка N-200i')
        .and('contain', '(верх)');

      cy.get(selectors.constructorBunBottom)
        .should('contain', 'Краторная булка N-200i')
        .and('contain', '(низ)');
    });

    it('adds a filling to the construction set', () => {
      cy.get(selectors.mainItem).first().find('button').click();

      cy.get(selectors.constructorIngredient)
        .should('have.length.at.least', 1)
        .and('contain', 'Биокотлета из марсианской Магнолии');
    });

    it('adds the bun and the filling at the same time', () => {
      cy.get(selectors.bunItem).first().find('button').click();
      cy.get(selectors.mainItem).first().find('button').click();

      cy.get(selectors.constructorBunTop).should('exist');
      cy.get(selectors.constructorIngredient).should('have.length.at.least', 1);
    });
  });


  describe('Ingredient modal window', () => {
    it('opens when you click on an ingredient', () => {
      cy.get(selectors.bunItem).first().find('a').click();

      cy.get(selectors.modal).should('be.visible');
    });

    it('displays information specifically about the ingredient that was clicked on', () => {
      cy.get(selectors.bunItem).first().find('a').click();

      cy.get(selectors.modal).within(() => {
        cy.contains('Краторная булка N-200i').should('be.visible');
        cy.contains('420').should('be.visible');
      });
    });

    it('closes when you click the X', () => {
      cy.get(selectors.bunItem).first().find('a').click();
      cy.get(selectors.modal).should('be.visible');

      cy.get(selectors.modalCloseButton).click();

      cy.get(selectors.modal).should('not.exist');
    });

    it('closes when you click on the overlay', () => {
      cy.get(selectors.bunItem).first().find('a').click();
      cy.get(selectors.modal).should('be.visible');

      cy.get(selectors.modalOverlay).click({ force: true });

      cy.get(selectors.modal).should('not.exist');
    });

    it('closes when you press Escape', () => {
      cy.get(selectors.bunItem).first().find('a').click();
      cy.get(selectors.modal).should('be.visible');

      cy.get('body').type('{esc}');

      cy.get(selectors.modal).should('not.exist');
    });
  });


  describe('Create an order', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'Bearer fake-access-token');
      localStorage.setItem('refreshToken', 'fake-refresh-token');

      cy.intercept('GET', '**/auth/user', {
        fixture: 'user.json',
      }).as('getUser');

      cy.intercept('POST', '**/orders', {
        fixture: 'order.json',
      }).as('createOrder');

      cy.visit('/');
      cy.wait('@getIngredients');
      cy.wait('@getUser');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });

    it('creates an order, displays the order number, and clears the builder', () => {
      cy.get(selectors.bunItem).first().find('button').click();
      cy.get(selectors.mainItem).first().find('button').click();

      cy.get(selectors.constructorBunTop).should('exist');
      cy.get(selectors.constructorIngredient).should('have.length.at.least', 1);

      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@createOrder');

      cy.get(selectors.modal).should('be.visible');
      cy.get(selectors.orderNumber).should('contain', '12345');

      cy.get(selectors.modalCloseButton).click();
      cy.get(selectors.modal).should('not.exist');

      cy.get(selectors.constructorBunTop).should('not.exist');
      cy.get(selectors.constructorBunBottom).should('not.exist');
      cy.get(selectors.constructorIngredient).should('not.exist');
    });
  });
});