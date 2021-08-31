import React from 'react'
import {Container} from './Pagination.styles'
import {Pagination as PaginationANT} from 'antd'
import {connect,useSelector} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { currentPageSelector, pageSizeSelector } from '../../Redux/pagination/pagination.selectors'
import { setCurrentPage, setPageCount } from '../../Redux/pagination/pagination.actions'

const Pagination = ({isOwnJournals , total , setCurrentPage,setPageCount}) => {
    const currentPage = useSelector((state) => currentPageSelector(state, isOwnJournals?'ownCurrentPage':'friendCurrentPage'))
    const pageSize = useSelector((state)=>pageSizeSelector(state,isOwnJournals?'ownPageCount':'friendPageCount'))
 
    const handleSizeChange =(current,size)=>{
        console.log('changing size');
        setCurrentPage(isOwnJournals?'ownCurrentPage':'friendCurrentPage',1)
        setPageCount(isOwnJournals?'ownPageCount':'friendPageSize',size)
        

        
    }
    const handleChange = (number)=>{
        console.log('changing');
        setCurrentPage(isOwnJournals?'ownCurrentPage':'friendCurrentPage',number)
    }
   
    return (
        <Container>
            <PaginationANT 
                current={currentPage}
                total={total}
                defaultPageSize={pageSize}
                showSizeChanger
                size={'small'}
                onShowSizeChange={handleSizeChange}
                pageSizeOptions={isOwnJournals?['10','20','30','40','50']:['10']}
                onChange={handleChange}
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    // total:journalsTotalCountSelector,
    
})
const mapDispatchToProps = (dispatch)=>({
    setCurrentPage:(fieldName,currentPage)=>dispatch(setCurrentPage(fieldName,currentPage)),
    setPageCount:(fieldName,pageCount)=>dispatch(setPageCount(fieldName,pageCount))
})
export default connect(mapStateToProps,mapDispatchToProps)(Pagination)
