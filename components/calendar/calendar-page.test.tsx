import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { CalendarPage } from './calendar-page';

describe('CalendarPage', () => {
  it('renders the calendar header', () => {
    render(<CalendarPage />);
    expect(screen.getByText('Content Calendar')).toBeInTheDocument();
  });
});
