import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../pages/SignUp';

describe('Should render correctly', () => {
  it('It should render a SignUp', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
