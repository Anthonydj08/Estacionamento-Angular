///  <reference types="cypress" />
import Chance from 'chance';
const chance = new Chance();

describe('Login test', () => {

  const email = chance.email();
  const senha = "teste123";

  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it('ter um título', () => {
    cy.contains('Login');
  });

  it('bloqueio de rotas protegidas', () => {
    cy.visit('http://localhost:4200/pages/inicio');
    cy.url().should('eq', 'http://localhost:4200/auth/login');
  });

  it('Negar login de usuário não registrado', () => {
    cy.url().should('include', 'login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=senha]').type(senha);
    cy.get('button[type=submit]').click();
    cy.get('nb-toastr-container').children()
      .should('contain', 'Usuário não encontrado')
      .and('be.visible');
  });

  it('login de usuário registrado', () => {
    cy.url().should('include', 'login');
    cy.get('input[name=email]').type('teste@gmail.com');
    cy.get('input[name=senha]').type(senha);
    cy.get('button[type=submit]').click();
    cy.url().should('eq', 'http://localhost:4200/pages/inicio');
  });

  it('Deslogar usuário', () => {
    cy.visit('http://localhost:4200/pages/inicio').wait(4000);
    cy.get('.user-container').click();
    cy.get('.ng-tns-c7-7 > .menu-title').click();
    cy.url().should('eq', 'http://localhost:4200/auth/login');
  });

});