import { 
  RecentItemsAction, 
  GetRecentProducts,
  SetRecentProducts, 
} 
from '../actions/recently-viewed.actions'

export interface IState {
  recentlyViewedItemsIds: Array<string>
}

export const initialState: IState = {
  // recentlyViewedItems: JSON.parse(localStorage.getItem('recentlyViewed')),
  recentlyViewedItemsIds: []
}

// debugger

export function recentItemsReducer(state = initialState, action: RecentItemsAction): IState {
  const recentItemsArr = state.recentlyViewedItemsIds
  const {payload, type} = action
    switch (type) {
      case SetRecentProducts.TYPE:
        return {
          ...state,
          recentlyViewedItemsIds: [...JSON.stringify(localStorage.setItem('recentlyViewed', payload))]
        }
      case GetRecentProducts.TYPE:
        return {
          ...state,
          recentlyViewedItemsIds: JSON.parse(localStorage.getItem('recentlyViewed'))
        }
        default:
         return state;
    }
}