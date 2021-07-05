import{createSelector} from 'reselect'

const stateSelector = state=>state

export const formSelector = createSelector(
    stateSelector,
    ({form})=>form
)
