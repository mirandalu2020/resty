import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Testing form component features', ()=>{
  test('Should assert that upon form submission the resulting data will be rendered in the output area', ()=>{
    render(
      <App />
    )
    let testUrl = screen.getByTestId('test-url');
    fireEvent.change(testUrl, { target: {value: 'test url'}});
    let testMethod = screen.getByTestId('methods');
    fireEvent.change(testMethod, { target: { value: 'get'}});
    fireEvent.click(screen.getByText(/GO/gm));
    
    const resultsBlock = screen.getByTestId('test-results')
    expect(resultsBlock).toHaveTextContent(/test url/gm);
    expect(resultsBlock).toBeVisible();

  })
})