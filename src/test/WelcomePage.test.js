import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import WelcomePage from '../pages/WelcomePage';

describe('Should render correctly', () => {
  it('It should render a WelcomePage', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <WelcomePage />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
