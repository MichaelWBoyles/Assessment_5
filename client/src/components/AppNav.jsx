import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


const AppNav=()=>{
    return(
        <Navbar>
            <Nav>
                <Nav.Link href="/" >Home</Nav.Link>
                <br/>
                <Nav.Link href="/#/signIn" >Sign In</Nav.Link>
                <br/>
                <Nav.Link href="/#/signUp" >Sign Up</Nav.Link>
            </Nav>
        </Navbar>
    )
}
export default AppNav