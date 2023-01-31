import {Button, Checkbox, Form} from "semantic-ui-react";
import {Col, Row} from "react-bootstrap";
import {useState} from "react";
import  * as userDispatch from "../reducer/userReducer"

export default function signUp() {
  const [userId, setUserId] = useState()
  const [password, setPassword] = useState()
  const [username, setUsername] = useState()
  const [repCharacterName, setRepCharacterName] = useState()
  const [profileImage, setProfileImage] = useState()

  const onChangeUserId = (e) => { setUserId(e.target.value) }
  const onChangePassword = (e) => { setPassword(e.target.value) }
  const onChangeUsername = (e) => { setUsername(e.target.value) }
  const onChangeRepCharacterName = (e) => { setRepCharacterName(e.target.value) }

  const onClickSignUp = () => {
    userDispatch.signUp({userId, password, username, repCharacterName, profileImage: null}, {})
  }

  return (
    <div>
      <Row>
        <Col/>
        <Col>
          <Form style={{marginTop: "30%"}}>
            <Form.Field>
              <label>아이디</label>
              <input type={"text"} placeholder='아이디' onChange={onChangeUserId} value={userId}/>
            </Form.Field>
            <Form.Field>
              <label>비밀번호</label>
              <input type={"password"} placeholder='비밀번호' onChange={onChangePassword} value={password}/>
            </Form.Field>
            <Form.Field>
              <label>닉네임</label>
              <input type={"text"} placeholder='닉네임' onChange={onChangeUsername} value={username}/>
            </Form.Field>
            <Form.Field>
              <label>대표 캐릭터명</label>
              <input type={"text"} placeholder='대표 캐릭터명' onChange={onChangeRepCharacterName} value={repCharacterName}/>
            </Form.Field>
            <Form.Field>
              <Checkbox label='재밌게 즐겨봐용' />
            </Form.Field>
            <Button onClick={onClickSignUp} style={{width: "100%"}} type='submit'>가입하기!</Button>
          </Form>
        </Col>
        <Col/>
      </Row>
    </div>

  )
}