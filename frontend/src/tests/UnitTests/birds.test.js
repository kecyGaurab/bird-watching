import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { configure, shallow } from 'enzyme';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../redux/store/store';
import Login from '../../components/form/login';
import App from '../../App';
import HomePage from '../../pages/HomePage';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<App />);
});

describe('<HomePage />', () => {
  it('Renders <HomePage /> component correctly', () => {
    const history = createMemoryHistory();
    const component = render(
      <Router history={history} location="/">
        <Provider store={store}>
          <HomePage />
        </Provider>
      </Router>,
    );
    expect(component.container).toHaveTextContent('Add New');
  });
});

describe('<Login />', () => {
  const history = createMemoryHistory();
  it('Renders <Login /> component correctly', () => {
    const tree = renderer
      .create(
        <Router history={history} location="/login">
          <Provider store={store}>
            <Login />
          </Provider>
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
