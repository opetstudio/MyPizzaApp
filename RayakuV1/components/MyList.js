import React from 'react';
import {
  FlatList
} from 'react-native';

import MyListItem from './MyListItem';

class MyList extends React.Component {

  state = { selected: (new Map(): Map<string, boolean>) };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (uid: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(uid, !selected.get(uid)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => (
    <MyListItem
      id={item.uid}
      item={item}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.uid)}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
export default MyList;
