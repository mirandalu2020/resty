import { render, screen, fireEvent} from '@testing-library/react'
import Form from '../Form';

describe('Test form features', ()=>{
  test('Should call handle submit function when submit button is clicked', ()=>{
    
    const handleSubmit = jest.fn();
    
    render(
      <Form handleApiCall={handleSubmit}/>
    )

    let submitButton = screen.getByText(/GO/);
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();
  });

  test('Should have URL input and submit button to be visible', ()=>{
    render(
      <Form />
    )
    let testUrl = screen.getByTestId('test-url');
    expect(testUrl).toBeVisible();
    let submitButton = screen.getByText(/GO/);
    expect(submitButton).toBeVisible();
  });
});