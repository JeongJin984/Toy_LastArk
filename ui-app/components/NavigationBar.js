import {ButtonGroup, Dropdown, Image, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Button, Input, Form} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {getOrSaveUser, logOut, updateLostArkInfo} from "../reducer/userReducer";

export default function NavigationBar({ userData }) {
  const dispatch = useDispatch()

  const [showLogInModal, setLogInModal] = useState(false)
  const [username, setUsername] = useState("")
  const [repCharacterName, setRepCharacterName] = useState("")

  const onClickGetOrSave = () => {
    setLogInModal(false)
    dispatch(getOrSaveUser({username, repCharacterName}))
  }

  const onClickLogOut = () => {
    dispatch(logOut({}))
  }

  const onClickUpdateLostArkInfo = () => {
    dispatch(updateLostArkInfo({}))
  }

  return (
    <div>
      <Navbar bg="light" variant="light" style={{position: "fixed", width: "100%", paddingLeft: "1%"}}>
        <Navbar.Brand href="/">LastArk</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>레이드</Nav.Link>
          <div style={{position: "fixed", right: 0, marginRight: "20px"}}>
            {userData ?
              <span>
                <Image roundedCircle={true} width={35} height={35} src='https://pbs.twimg.com/media/FMQYq6BVcAEjZjf?format=jpg&name=360x360'/>
                <Dropdown style={{position: "fixed", right: 0, marginRight: "20px"}} as={ButtonGroup} align={"end"}>
                  <Dropdown.Toggle style={{opacity: "0", width: "40px"}} split id="dropdown-custom-2"/>
                  <Dropdown.Menu className="super-colors">
                    <Dropdown.Item eventKey="1" onClick={onClickUpdateLostArkInfo}>강화 성공함!</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4" onClick={onClickLogOut}>로그아웃</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </span>:
              <div>
                <Button onClick={() => setLogInModal(true)}>시작하기</Button>
              </div>
            }
          </div>
        </Nav>
      </Navbar>
      <Modal show={showLogInModal} onHide={() => setLogInModal(false)}>
        <Modal.Body>
          <Form>
            <Form.Field>
              <label>닉네임</label>
              <input style={{width: "60%"}} value={username} onChange={(e) => setUsername(e.target.value)} placeholder='닉네임' />
              <Button style={{marginLeft: "10%", width: "100px"}}>중복체크</Button>
            </Form.Field>
            <Form.Field>
              <label>대표 캐릭터</label>
              <input value={repCharacterName} onChange={(e) => setRepCharacterName(e.target.value)} placeholder='대표 캐릭터' />
            </Form.Field>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClickGetOrSave}>
            저장 / 불러오기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}