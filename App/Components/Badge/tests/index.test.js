import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Badge from '../index';
import StyledText from '../../../components/StyledText';

describe('Badge', () => {
  const mockProps = {
    hidden: false,
    i18nKey: 'live',
  };

  it('should render correctly', () => {
    const tree = renderer.create(<Badge {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render StyledText & View correctly', () => {
    const component = shallow(
      <Badge hidden={mockProps.hidden} i18nKey={mockProps.i18nKey} />,
    );
    expect(component.find('View').length).toEqual(1);
    expect(component.find('Image').length).toEqual(1);
    expect(component.find(StyledText).length).toEqual(1);
  });
});
