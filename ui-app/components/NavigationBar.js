import {ButtonGroup, Dropdown, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar bg="light" variant="light" style={{position: "fixed", width: "100%", paddingLeft: "1%"}}>
      <Navbar.Brand href="/">LastArk</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/rade/123">레이드</Nav.Link>
        <Nav.Link href="/streaming">방송하기</Nav.Link>
        <Nav.Link href="/viewing">방송보기</Nav.Link>
        <NavDropdown title="길드 커뮤니티" id="basic-nav-dropdown">
          <NavDropdown.Item href="/community/moddat">모이면 따뜻해지는</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">혈석 길드1</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">혈석 길드2</NavDropdown.Item>
        </NavDropdown>
        <Image style={{position: "fixed", right: 0, marginRight: "20px"}} roundedCircle={true} width={35} height={35} src='https://pbs.twimg.com/media/FMQYq6BVcAEjZjf?format=jpg&name=360x360'/>
        <Dropdown style={{position: "fixed", right: 0, marginRight: "20px"}} as={ButtonGroup} align={"end"}>
          <Dropdown.Toggle style={{opacity: "0", width: "40px"}} split id="dropdown-custom-2"/>
          <Dropdown.Menu className="super-colors">
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  )
}