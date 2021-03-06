import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import titleImg from '../img/title.png'
import SearchBar from './SearchBar'
import ProfileImg from '../img/profile.png'
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import { logout } from '../apis/AuthApi'
import { getCash } from '../apis/CashApi'
import { getUserId } from '../utils/AuthUtil'

const AppHeader = ({authenticated, unAuthenticate, ...props} ) => {
    const [totalCash, setTotalCash] = useState(0)
    const [expiresImminentCashAmount, setExpiresImminentCashAmount] = useState(0)

    useEffect( () => {
        const userId = getUserId()
        if (userId)
            getUserCash()
    }, [])

    const onLogout = () => {
        logout()
        .then(response => window.location.replace("/") )
        .catch(response => window.location.replace("/") )
        
        unAuthenticate()
    }   

    const getUserCash = async () =>{
        try{
            let response = await getCash(getUserId())
            const cashList = response.data.cashList
            const afterWeek = new Date()
            afterWeek.setDate(afterWeek.getDate() + 7)

            const expiresImminentCashAmount = cashList.reduce((a, c) => {
                if ( c.freeExpiredDate && afterWeek >= new Date(c.freeExpiredDate) )
                    return a + c.free
                return a
            }, 0)
            setExpiresImminentCashAmount(expiresImminentCashAmount)
            setTotalCash(response.data.total)
            
        }catch(error){
            setTotalCash(0)
        }
    }



    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <Image style={{ margin: 0, height: '70px', width: '120px', cursor : 'pointer'}} src={titleImg}/>
                </Navbar.Brand>
                <Nav className="justify-content-end">
                    <Nav.Item className="mx-3 align-self-center">
                        <SearchBar/>
                    </Nav.Item>

                    <Nav.Item className="mx-2 align-self-center">
                    {authenticated ?
                        <NavDropdown id="basic-nav-dropdown" 
                                     title= {<Image style={{height: '40px', width: '40px'}} src={ProfileImg}/>} >
                            <div className='text-center'>
                                <NavDropdown.ItemText><Link to="/my_cash">?????? ??????</Link></NavDropdown.ItemText>
                                <NavDropdown.ItemText>{totalCash}</NavDropdown.ItemText>
                                {expiresImminentCashAmount != 0 ? <NavDropdown.ItemText style={{fontSize : "10px"}}>???????????? ?????? ??????</NavDropdown.ItemText> : <></>}
                                <NavDropdown.Divider />    
                                <NavDropdown.ItemText><Link to="/my_info">??? ????????????</Link></NavDropdown.ItemText>
                                <NavDropdown.ItemText><Link to="/my_creation">??? ????????????</Link></NavDropdown.ItemText>
                                <NavDropdown.ItemText><Link to="/cash/charge">?????? ??????</Link></NavDropdown.ItemText>
                                <NavDropdown.ItemText><Link to="/usage-history">?????? ??????</Link></NavDropdown.ItemText>
                                <NavDropdown.Divider />
                                <NavDropdown.ItemText onClick={onLogout} 
                                                    style={{"cursor":"pointer"}}>????????????</NavDropdown.ItemText>
                            </div>
                        </NavDropdown>    
                        :   
                        <Link to='/sign'>????????? | ????????????</Link>}
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default AppHeader;