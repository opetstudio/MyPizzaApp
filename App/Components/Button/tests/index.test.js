import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import Button from '../index';

describe('Button', () => {
  const mockOnPress = jest.fn();

  it('should render correctly', () => {
    const tree = shallow(<Button />);
    expect(tree).toMatchSnapshot();
  });

  it('should simulate button click', () => {
    const component = shallow(<Button onPress={mockOnPress} />);
    const ButtonComponent = component.find('StyledTouchableOpacity');
    ButtonComponent.simulate('Press', {
      nativeEvent: { timestamp: Date.now() },
    });
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should render the link type Button', () => {
    const tree = shallow(<Button onPress={mockOnPress} type="link" />);
    expect(tree).toMatchSnapshot();
  });

  it('should render isInactive type Button', () => {
    const tree = shallow(<Button isInactive />);
    expect(tree).toMatchSnapshot();
  });

  it('should render noFeedback type Link', () => {
    const tree = shallow(<Button noFeedback type="link" />);
    expect(tree).toMatchSnapshot();
  });
});
