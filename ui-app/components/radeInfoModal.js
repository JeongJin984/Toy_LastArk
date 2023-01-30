import {ButtonGroup, Dropdown, Image, Nav, Navbar, Modal, NavDropdown, Col, Row} from "react-bootstrap";
import {Button, Divider, Input, Label} from "semantic-ui-react";

export default function RadeInfoModal({modalShow, setModalShow, rade}) {
  return (
    <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title style={{width: "90%"}}>{rade.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <b>시작시간</b>
            <div>{rade.startAt}</div>
            <Divider/>
            <div>추가 설명</div>
            <div>{rade.content}</div>
            <Divider/>
            <div>최소 아이템 레벨</div>
            <div>{rade.radeInfo.minLevel}</div>
            <Divider/>
            <div>레이드 컨텐츠</div>
            <div>{rade.radeInfo.bossName}</div>
            <Divider/>
            <div>공대장</div>
            <a href={"https://loawa.com/char/" + rade.radeInfo.radeMaster.characterName}>{rade.radeInfo.radeMaster.characterName}</a>
            <Divider/>
            <div>공대원</div>
            <div>
              {
                rade.radeInfo.radeMembers.map(v => (
                  <div><a href={"https://loawa.com/char/" + v.characterName}>{v.characterName}</a></div>
                ))
              }
            </div>
          </Col>
          <Col>
            <div style={{height: "44%"}}>
              <h2>공대원</h2>
              {
                rade.radeInfo.radeMembers.map(v => (
                  <div><a href={"https://loawa.com/char/" + v.characterName}>{v.characterName}</a></div>
                ))
              }
            </div>
            <Divider/>
            <div style={{height: "50%"}}>
              <h2>신청자</h2>
            </div>
          </Col>
        </Row>
        <Divider/>
        <label>참여하기(닉네임/탬렙)</label>
        <Input style={{width: "100%"}} focus placeholder='Search...' />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => setModalShow(false)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}