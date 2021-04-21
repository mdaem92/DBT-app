import {createSelector} from 'reselect'

const membersSelector = state=>state.members

export const membersListSelector = createSelector(
    membersSelector,
    ({members})=>members
)

export const isMembersFetchedSelector = createSelector(
    membersSelector,
    ({isMembersFetched})=>isMembersFetched
)

