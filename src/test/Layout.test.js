import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/Layout';

it('Render a Layout', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
