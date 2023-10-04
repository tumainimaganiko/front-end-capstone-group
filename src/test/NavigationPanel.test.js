import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import NavigationPanel from '../components/NavigationPanel';

it('Render a Navigation Panel', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <NavigationPanel />
      </MemoryRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
