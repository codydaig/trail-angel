'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import listingActions from '../actions/listing-actions';
import FavoriteList from '../components/favorite/favoriteList.component';

const Favorites = (props) => {
  const { state, actions } = props;
  // todo: tree-shake for unnecessary state
  return (
    <FavoriteList isFetching={state.favoritesReducer.isFetching}
                  listings={state.listingsReducer.cache}
                  userId={state.userReducer.userId}
                  userLocation={state.appReducer.geolocation}
                  navigator={props.navigator}
                  favorites={state.listingsReducer.collection.favorites}
                  {...actions} />
  );
};

const mapStateToProps = function(state) {
  return {
    state: state
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(listingActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);