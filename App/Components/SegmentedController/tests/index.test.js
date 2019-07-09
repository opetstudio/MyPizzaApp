import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';
import SegmentedController from '../index';

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <SegmentedController
      tabs={[
        {
          i18nKey: 'tab-1-title',
          id: 'tab-1',
          content: <View id={'tab-1-content'} />,
        },
        {
          i18nKey: 'tab-2-title',
          id: 'tab-2',
          content: <View id={'tab-2-content'} />,
        },
      ]}
      selectedId={'tab-1'}
    />,
  );
});

it('renders SegmentedController correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('has two tabs', () => {
  const tabs = wrapper.findWhere(n => {
    return n.prop('i18nKey') && n.prop('i18nKey').match(/^tab-.-title$/);
  });
  expect(tabs).toHaveLength(2);
});

it('has two content segments', () => {
  const segments = wrapper.findWhere(n => {
    return n.prop('id') && n.prop('id').match(/^tab-.-content$/);
  });
  expect(segments).toHaveLength(2);
});

it('shows only tab 1 and hides tab 2', () => {
  const segmentOne = wrapper.findWhere(n => {
    return n.prop('id') && n.prop('id').match(/^tab-1-content$/);
  });
  const segmentTwo = wrapper.findWhere(n => {
    return n.prop('id') && n.prop('id').match(/^tab-2-content$/);
  });
  expect(segmentOne.parent().prop('style').display).not.toBe('none');
  expect(segmentTwo.parent().prop('style').display).toBe('none');
});
