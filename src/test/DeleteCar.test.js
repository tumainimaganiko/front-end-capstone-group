import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import DeleteCar from '../pages/DeleteCar';

it('Render a DeleteCar', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <DeleteCar />
        </MemoryRouter>
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
