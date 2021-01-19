import React from 'react'
import AddJournalForm from '../../components/AddJournalForm/AddJournalForm.component'
import DeadlineCountdown from '../../components/DeadlineCountdown/DeadlineCountdown.component'
import { PageLayout } from './AddJournalPage.styles'

const AddJournalPage = () => {
    return (
        <PageLayout>
            <AddJournalForm/>
            <DeadlineCountdown/>
        </PageLayout>
    )
}

export default AddJournalPage
