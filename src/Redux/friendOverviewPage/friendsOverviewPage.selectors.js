import {createSelector} from 'reselect'

const friendsOVerviewSelector = state=>state.friendsOverviewPage

export const friendOverviewPageViewSelector = createSelector(
    friendsOVerviewSelector,
    ({showGraph})=>showGraph
)

export const friendOverviewDateFromSelector = createSelector(
    friendsOVerviewSelector,
    ({dateFrom})=>dateFrom
)
export const friendOverviewDateToSelector = createSelector(
    friendsOVerviewSelector,
    ({dateTo})=>dateTo
)