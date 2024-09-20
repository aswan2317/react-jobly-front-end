import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders JobsPage for /jobs route', () => {
  render(
    <MemoryRouter initialEntries={['/jobs']}>
      <App />
    </MemoryRouter>
  );

  // Expect something specific to JobsPage to be in the document
  expect(screen.getByText('Jobs List')).toBeInTheDocument();
});

test('renders CompaniesPage for /companies route', () => {
  render(
    <MemoryRouter initialEntries={['/companies']}>
      <App />
    </MemoryRouter>
  );

  // Expect something specific to CompaniesPage to be in the document
  expect(screen.getByText('Companies List')).toBeInTheDocument();
});
