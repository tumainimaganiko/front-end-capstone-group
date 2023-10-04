import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login.jsx';

it('Render a Login', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
