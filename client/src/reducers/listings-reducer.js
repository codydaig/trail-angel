'use strict';

import * as _ from 'lodash';
import { AsyncStorage } from 'react-native';

import actionTypes from '../actions/action-types';

const initialState = {
  isFetching: false,
  isFetchCancelled: false,
  cache: {},
  searchResults: [],
  searches: {}
};

const listingsReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case actionTypes.FETCH_LISTINGS:
      return {
        ...state,
        isFetching: true
      };

    case actionTypes.CANCEL_REQUEST:
      return {
        ...state,
        isFetching: false,
        isFetchCancelled: true
      };

    case actionTypes.LOAD_SAVED_LISTINGS:
      return {
        ...state,
        cache: action.loadedListings
      };

    case actionTypes.LOAD_SAVED_SEARCHES:
      return {
        ...state,
        searches: action.loadedSearches
      }

    case actionTypes.UPDATE_LISTINGS:
      return {
        ...state,
        cache: {
          ...state.cache,
          ...action.updatedListings
        }
      }

    case actionTypes.RECEIVE_LISTINGS:
      let cache = {}, searches;

      if (action.searchToSave) {
        _.each(action.searchResults, (result) => {
          if (state.cache[result.id] === undefined) {
            cache[[result.id]] = result;
          }
        });

        cache = {
          ...state.cache,
          ...cache
        }

        searches = {
          ...state.searches,
          [action.searchToSave.search]: {
            search: action.searchToSave.search,
            results: action.searchToSave.results
          }
        };

        return {
          ...state,
          isFetching: false,
          isFetchCancelled: false,
          searchResults: action.searchResults,
          cache,
          searches
        };

      } else {
        cache = state.cache;
        searches = false;

        return {
          ...state,
          isFetching: false,
          isFetchCancelled: false,
          searchResults: action.searchResults,
          cache
        };
      };

    default: {
      return state;
    }
  }
};

export default listingsReducer;