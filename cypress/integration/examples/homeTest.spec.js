///  <reference types="cypress" />

describe('Home test', () => {

  const email = 'teste@gmail.com';
  const senha = "teste123";

  beforeEach(() => {
    cy.visit("http://localhost:4200/")
  });

  it('login', () => {
    cy.url().should('include', 'login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=senha]').type(senha);
    cy.get('button[type=submit]').click();
    cy.url().should('eq', 'http://localhost:4200/pages/inicio')
  });

  it('textos informativos', () => {
    cy.contains('Vagas');
    cy.contains('Usuários Registrados');
    cy.contains('Veículos Registrados');
    cy.contains('Ao Vivo');
  });

  it('Deslogar usuário', () => {
    cy.visit('http://localhost:4200/pages/inicio').wait(8000);
    cy.get('.user-container').click();
    cy.get('.ng-tns-c7-7 > .menu-title').click();
    cy.url().should('eq', 'http://localhost:4200/auth/login');
  });
});