import {createSelector} from 'reselect'

const friendsOVerviewSelector = state=>state.friendsOverviewPage

export const friendOverviewPageViewSelector = createSelector(
    friendsOVerviewSelector,
    ({showGraph})=>showGraph
)