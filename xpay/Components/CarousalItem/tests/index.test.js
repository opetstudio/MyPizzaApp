import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import CarousalItem from '../base';

const mock = {
  list: {
    categoryList: [
      {
        id: 1309,
        categoryName: 'TV Shows',
        type: 'category',
        sequence: 1,
        contentItems: [
          {
            id: 1310,
            title: 'Fun Task Tik',
            images: {
              portrait: {
                xhdpi: 'https://i.ytimg.com/vi/tgBbT2c0hiI/hqdefault.jpg',
              },
            },
            provider: 'YouTube',
            free: 1,
          },
          {
            id: 1311,
            title: 'Parodi Sule Menjadi Lambad',
            images: {
              portrait: {
                xhdpi: 'https://i.ytimg.com/vi/tgBbT2c0hiI/sddefault.jpg',
              },
            },
            provider: 'HOOQ',
          },
          {
            id: 1312,
            title: 'Ini Talk Show Kedatangan Ahok',
            images: {
              portrait: {
                xhdpi: 'https://i.ytimg.com/vi/iurhMcyudgk/sddefault.jpg',
              },
            },
            provider: 'CatchPlay',
          },
          {
            id: 1313,
            title: 'Semua Tentang Rizky Febian',
            images: {
              portrait: {
                xhdpi: 'https://i.ytimg.com/vi/QJyWRZwlL4Y/hqdefault.jpg',
              },
            },
            provider: 'YouTube',
          },
        ],
      },
    ],
  },
};

describe('Carousal Item', () => {
  const mockOnPress = jest.fn();

  it('should render correctly', () => {
    const tree = shallow(
      <CarousalItem item={mock.list.categoryList[0].contentItems[0]} />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should simulate button click', () => {
    const component = shallow(
      <CarousalItem
        item={mock.list.categoryList[0].contentItems[0]}
        onPress={mockOnPress}
      />,
    );
    const ButtonComponent = component.find('StyledTouchableOpacity');
    ButtonComponent.simulate('Press');
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
