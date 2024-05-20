describe('Dashboard Component', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('opens and closes the dialog', () => {
    cy.contains('.v-btn', 'Add task').click({ force: true });

    cy.get('[data-testid="task-modal"]').should('be.visible');

    cy.contains('.v-btn', 'Cancel').click();

    cy.get('[data-testid="task-modal"]').should('not.exist');
  });

  it('creates a new task when valid input is provided', function () {
    cy.contains('.v-btn', 'Add task').click({ force: true });

    cy.get('label').contains('Title').parent().find('input').type('Test task');

    cy.get('label').contains('Description').parent().find('input').type('This is a new task description');

    cy.get('[data-testid="date-picker"]').should('be.visible').click();

    cy.get('.dp__btn.dp--arrow-btn-nav[aria-label="Next month"]').click();

    cy.get('.dp__cell_inner.dp__pointer.dp--future').contains('20').click();

    cy.get('button[data-test="select-button"]').click();

    cy.contains('.v-btn', 'Create').click();

    cy.contains('.task-list', 'Test').should('exist');
  });

  it('displays the filter chip group', () => {
    cy.get('.v-chip-group').should('exist');
  });

  it('displays a list of tasks', () => {
    cy.get('.task-list').should('exist');
  });

  it('filters tasks based on search query', () => {
    cy.get('input[placeholder="Search"]').type('Test');
    cy.contains('.task-list', 'Test').should('exist');

    cy.contains('.task-list', 'Not exist').should('not.exist');
  });

  it('filters tasks based on active filter', () => {
    cy.contains('.v-chip', 'Active').click();

    cy.contains('.task-list', 'Active',).should('exist');

    cy.contains('.task-list', 'Completed').should('not.exist');
  });

  it('marks a task as completed', () => {
    cy.contains('.v-chip', 'Active').click();
    cy.contains('.v-container', 'Test task').should('exist').click()

    cy.contains('.v-btn', 'mark as complete').click();

    cy.contains('.v-card-text', 'Completed').should('exist');
  });

  it('filters tasks based on completed filter', () => {
    cy.contains('.v-chip', 'Completed').click();
    cy.contains('.task-list', 'Completed',).should('exist');
    cy.contains('.task-list', 'Active').should('not.exist');
  });

  it('marks a task as active', () => {
    cy.contains('.v-btn', 'mark as active').click();

    cy.contains('.v-card-text', 'Active').should('exist');
  });

  it('deletes a task', () => {
    cy.contains('.v-container', 'Test task').should('exist').click()
    cy.get('.v-btn').contains('Delete').click();

    cy.contains('.task-list', 'Test task').should('not.exist');
  });
});