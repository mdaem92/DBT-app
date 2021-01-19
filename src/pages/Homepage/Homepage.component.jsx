import React from 'react'
import { ChartContainer, Container, DateAndTimeContainer, TabsContainer, UserNameAvgsContainer } from './Homepage.styles'
import { firestore } from '../../firebase/firebase.utils'
import UserNameAvgs from '../../components/Username-averages/UserNameAvgs.component'
import DateAndTime from '../../components/Date-Time/DateAndTime.component'
import HomepageTabs from '../../components/HomepageTabs/HomepageTabs.component'
// import MyResponsiveLine from '../../components/Responsive-Chart/ResponsiveChart.component'
// import AddJournalForm from '../../components/AddJournalForm/AddJournalForm.component'

const Homepage = () => {

    return (
        <div >
            <Container>
                <UserNameAvgsContainer>
                    <UserNameAvgs/>
                </UserNameAvgsContainer>
                <DateAndTimeContainer>
                    <DateAndTime/>
                </DateAndTimeContainer>
                <TabsContainer>
                    <HomepageTabs/>
                </TabsContainer>
                
            </Container>
        </div>


    )
}

export default Homepage
