import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';

describe('Unit testing React components', () => {
  describe('LabeledButton', () => {
    let app;
    const mockStore = configureMockStore();
    const initialState = {
      list: { listTrails: [1, 2, 3], moreInfo: { test: 'test' } },
    };
    const store = mockStore(initialState);

    beforeAll(() => {
      app = render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });

    test('Submit button should be rendered', () => {
      const submitButton = screen.getByRole('button', { name: /SUBMIT/i });
      expect(submitButton).toBeInTheDocument();
    });
  });
});
