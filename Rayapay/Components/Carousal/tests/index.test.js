import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import CarouselSection from '../index';

const mock = {
  isModified: 'true',
  videos: [
    {
      contentItems: [
        {
          title: 'Ada Apa Dengan Cinta 2',
          provider: '5333',
          free: '0',
          images: {
            banner: {
              ldpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
              mdpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
              hdpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
              xhdpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
              xxhdpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
              xxxhdpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
            },
            search: {
              ldpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
              mdpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
              hdpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
              xhdpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
              xxhdpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
              xxxhdpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
            },
            carousel: {
              ldpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
              mdpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
              hdpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
              xhdpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
              xxhdpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
              xxxhdpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
            },
          },
          id: '1904',
        },
      ],
      type: 'categories',
      resourceId: '8506',
      displayType: 'banner',
      displayMore: 0,
    },
    {
      contentItems: [
        {
          title: 'Ada Apa Dengan Cinta 2',
          provider: '5336',
          free: '0',
          images: {
            banner: {
              ldpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
              mdpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
              hdpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
              xhdpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
              xxhdpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
              xxxhdpi:
                '/sites/default/files/hooq/banner_banner_ada_apa_dengan_cinta_2.jpg',
            },
            search: {
              ldpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
              mdpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
              hdpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
              xhdpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
              xxhdpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
              xxxhdpi:
                '/sites/default/files/hooq/search_search_ada_apa_dengan_cinta_2.jpg',
            },
            carousel: {
              ldpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
              mdpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
              hdpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
              xhdpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
              xxhdpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
              xxxhdpi:
                '/sites/default/files/hooq/_carousal_ada_apa_dengan_cinta_2.jpg',
            },
          },
          id: '1906',
        },
      ],
      type: 'categories',
      resourceId: '8507',
      displayType: 'banner',
      displayMore: 1,
    },
  ],
};

describe('Carousel Section', () => {
  const mockProps = {
    item: mock.videos[0],
  };

  it('should render correctly', () => {
    const tree = renderer
      .create(
        <CarouselSection onPress={jest.fn()} item={{ contentItems: [] }} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with mocked props', () => {
    const tree = renderer
      .create(<CarouselSection onPress={jest.fn()} {...mockProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with mocked props with icon', () => {
    const tree = renderer
      .create(<CarouselSection onPress={jest.fn()} {...mockProps} icon />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with mocked props with titleInfo', () => {
    const tree = renderer
      .create(
        <CarouselSection onPress={jest.fn()} {...mockProps} titleInfo="test" />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with mocked props with displayMore', () => {
    const tree = renderer
      .create(
        <CarouselSection
          onPress={jest.fn()}
          {...mockProps}
          displayMore="test"
          item={mock.videos[1]}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
