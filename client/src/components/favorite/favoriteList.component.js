import React, { Component } from 'react';
import { View, ListView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Row from '../favorite/favoriteListItem.component';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  container: {

  },
  centering: { alignItems: 'center', justifyContent: 'center', padding: 8, },
  gray: { backgroundColor: '#cccccc', },
  horizontal: { flexDirection: 'row', justifyContent: 'space-around', padding: 8, }
});



export default class FavoriteList extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds
    };
  }

  componentDidMount() {
    const that = this;
    this.props.fetchFavorites(this.props.userId)
      .then((data) => {
        if (data !== undefined) {
          this.setState({
            dataSource: this.ds.cloneWithRows(data.favorites)
          });
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.favorites !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.favorites)
      });
    }
  }

  render() {
    return (
      <View>
        <ActivityIndicator animating={this.props.isFetching}
                           style={[styles.centering, styles.horizontal, { height: this.props.isFetching ? 260 : 0 }]}
                           color='darkgreen'
                           size='large' />
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data}/>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>

    );
  }
}