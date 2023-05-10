import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App';

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({results: 'hello there'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

xtest('Should display count, pagination and results to be visible', async () => {

  render(<App />)

  let testUrl = screen.getByTestId('test-url');
  fireEvent.change(testUrl, { target: {value: '/greeting'}});
  let testMethod = screen.getByTestId('methods');
  fireEvent.change(testMethod, { target: { value: 'GET'}});
  fireEvent.click(screen.getByText(/GO/m));
  const displayed = screen.getByTestId('test-results');
  console.log(displayed)
  expect(displayed).toHaveTextContent(/hello/m)
  // expect(screen.getByRole('button')).toBeDisabled()
})

xtest('handles server error', async () => {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(<App url="/greeting" />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await screen.findByRole('alert')

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
  expect(screen.getByRole('button')).not.toBeDisabled()
})