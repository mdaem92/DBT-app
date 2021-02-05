import { connect } from 'react-redux'
import React from 'react'
import { createStructuredSelector } from 'reselect'
import { journalsArraySelector } from '../../Redux/journals/journals.selectors'
import Journal from '../../components/Journal/Journal.component'

const JournalsPage = ({journals}) => {
    return (
        <div>
            {
                journals.map((journal,index)=><Journal {...journal} key={index}/>)
            }
            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    journals:journalsArraySelector
})

export default connect(mapStateToProps)(JournalsPage)
