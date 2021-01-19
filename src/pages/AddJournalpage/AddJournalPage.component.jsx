import React from 'react'
import AddJournalForm from '../../components/AddJournalForm/AddJournalForm.component'
import { PageLayout } from './AddJournalPage.styles'
import DeadlineCountdown from '../../components/DeadlineCountdown/DeadlineCountdown.component'

const AddJournalPage = () => {
    return (
        <PageLayout>
            <AddJournalForm/>
            <DeadlineCountdown/>
        </PageLayout>
    )
}

export default AddJournalPage
