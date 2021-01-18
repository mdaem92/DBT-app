import React from 'react'
import {Button} from 'antd'
import { useState } from 'react'

const AddJournalForm = () => {
    const [state,setState] = useState({
        date:undefined,
        isDeadlineMissed:false,
        lastNightSummary:'',
        goalDescription:'',
        isMorningReport:true,
        mood:undefined,
        tension:undefined,
        selfEsteemReport:'',
        positiveReport:'',
        additionalNotes:''
    })
    return (
        <div>
            <Button type='primary'>Button</Button>
        </div>
    )
}

export default AddJournalForm
