import React from 'react';
import { shallow } from 'enzyme';
import Posts from './Posts';

describe('<Posts />', () => {
  test('renders', () => {
    const wrapper = shallow(<Posts />);
    expect(wrapper).toMatchSnapshot();
  });
});
