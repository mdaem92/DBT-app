import React from 'react'
import { SummaryItemContainer, ItemContainer, ValueContainer } from './SummaryItem.styles'
import { FiMoon, FiSun } from 'react-icons/fi'
import { SmileOutlined, FireOutlined } from '@ant-design/icons'

const SummaryItem = ({ morning, mood, tension }) => {
    return (
        <SummaryItemContainer>
            <ItemContainer>
                {
                    !!morning ?
                        <FiSun size={24} color='white' />
                        :
                        <FiMoon size={24} color='white' />
                }
            </ItemContainer>

            <ItemContainer>
                <SmileOutlined style={{color:'white'}} />
                <ValueContainer>
                    {mood}
                </ValueContainer>
            </ItemContainer>
            <ItemContainer>
                <FireOutlined style={{color:'white'}} />
                <ValueContainer>
                    {tension}
                </ValueContainer>
            </ItemContainer>
        </SummaryItemContainer>
    )
}

export default SummaryItem
