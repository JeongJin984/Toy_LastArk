import {ButtonGroup, Dropdown, Image, Nav, Navbar, Modal, NavDropdown, Col, Row} from "react-bootstrap";
import {Button, Divider, Input, Label} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  radeApplyAccept,
  radeApplyCancel,
  radeApplyReject,
  radeCancel,
  radeMemberAbort
} from "../reducer/radeReducer";
import {radeApply} from "../lib/api/rade";

export default function RadeInfoModal({modalShow, setModalShow, rade, userData}) {
  const dispatch = useDispatch()
  const { radeApplied } = useSelector(state => state.RadeReducer)

  const [characterName, setCharacterName] = useState("")
  const [itemLevel, setItemLevel] = useState(0)
  const [pendingApply, setPendingApply] = useState(rade.apply.filter(v => v.state === "pending"))
  const [fixedApply, setFixedApply] = useState(rade.apply.filter(v => v.state === "fixed"))
  const [isRadeMaster, setIsRadeMaster] = useState(false)
  const [isApplied, setIsApplied] = useState(false)

  useEffect(() => {
    let flag = false
    userData.userLostArkCharacters.forEach(v => {
      if(v.characterName === rade.radeInfo.radeMaster.characterName) {
        setIsRadeMaster(true)
        flag = true
      }
    })
    if(!flag) {
      setIsRadeMaster(false)
    }

    let flag2 = false
    rade.apply.forEach(v => {
      if(v.username === userData.username) {
        console.log(v.username, userData.username)
        setIsApplied(true)
        flag2 = true
      }
    })

    userData.userLostArkCharacters.forEach(v => {
      rade.apply.forEach(v2 => {
        if(v.characterName === v2.characterName) {
          setIsApplied(true)
          flag2 = true
        }
      })
    })

    if(!flag2) {
      setIsApplied(false)
    }
  }, [userData, rade, isRadeMaster])

  const onClickSubmitApplication = async () => {
    const result = await radeApply({characterName, itemLevel, radeId: rade.radeId, username: userData.username}, {})
    console.log(result)
    setPendingApply([...pendingApply, result])
  }

  const onClickRejectApply = (index) => () => {
    const target = pendingApply.splice(index, 1)
    setPendingApply([...pendingApply])
    dispatch(radeApplyReject({applyId: target[0].applyId}, {}))
  }

  const onClickAcceptApply = (index) => () => {
    const target = pendingApply.splice(index, 1)
    setPendingApply([...pendingApply])
    setFixedApply([...fixedApply, ...target])
    dispatch(radeApplyAccept({applyId: target[0].applyId}, {}))
  }

  const onClickCancelApply = (index) => () => {
    const target = pendingApply.splice(index, 1)
    setPendingApply([...pendingApply])
    dispatch(radeApplyCancel({applyId: target[0].applyId}, {}))
  }

  const onClickCancelRade = () => {
    dispatch(radeCancel({radeId: rade.radeId}, {}))
    setModalShow(false)
  }

  const onClickAbortMember = (index) => () => {
    const target = fixedApply.splice(index, 1)
    setFixedApply([...fixedApply])
    dispatch(radeMemberAbort({applyId: target[0].applyId}, {}))
  }

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
                fixedApply.map((v, i) => (
                  <Label key={i}>
                    <a href={"https://loawa.com/char/" + v.characterName}>{v.characterName}</a>
                    {
                      (isRadeMaster && v.characterName !== rade.radeInfo.radeMaster.characterName) && <Label.Detail style={{cursor: "pointer"}}>x</Label.Detail>
                    }
                  </Label>
                ))
              }
            </div>
          </Col>
          <Col>
            <div style={{height: "44%"}}>
              <h2>공대원</h2>
              {
                fixedApply.map((v, i) => (
                  <Label key={i}>
                    <a href={"https://loawa.com/char/" + v.characterName}>{v.characterName}</a>
                    { isRadeMaster && v.characterName !== rade.radeInfo.radeMaster.characterName && <Label.Detail onClick={onClickAbortMember(i)} style={{cursor: "pointer"}}>x</Label.Detail> }
                  </Label>
                ))
              }
            </div>
            <Divider/>
            <div style={{height: "50%"}}>
              <h2>신청자</h2>
              {
                pendingApply.map((v, i) => (
                      <Label key={i}>
                        <a href={"https://loawa.com/char/" + v.characterName}>{v.characterName}</a>
                        {
                          isRadeMaster ?
                            <Label.Detail >
                              <span style={{marginRight: "5px", cursor: "pointer"}} onClick={onClickAcceptApply(i)}>o</span>
                              <span style={{cursor: "pointer"}} onClick={onClickRejectApply(i)}>x</span>
                            </Label.Detail> :
                              v.username === userData.username &&
                                <Label.Detail >
                                  <span style={{cursor: "pointer"}} onClick={onClickCancelApply(i)}>x</span>
                                </Label.Detail>
                        }
                      </Label>
                ))
              }
            </div>
          </Col>
        </Row>
        <Divider/>
        <div style={{textAlign: "center"}}>
          {
            (!isRadeMaster && !isApplied) &&
              <div>
                <div>
                  <Label>캐릭터 이름</Label>
                  <Input value={characterName} onChange={(e) => setCharacterName(e.target.value)} style={{width: "30%", marginBottom: "10px"}} focus placeholder='캐릭터 이름' />
                </div>
                <div>
                  <Label>아이템 레벨</Label>
                  <Input type={"number"} value={itemLevel} onChange={(e) => setItemLevel(e.target.value)} style={{width: "30%"}} focus placeholder='아이템 레벨' />
                </div>
              </div>
          }

        </div>
      </Modal.Body>
      <Modal.Footer>
        {
          isRadeMaster && (
            <Button onClick={onClickCancelRade} variant="primary">
              해산!
            </Button>
          )
        }
        {
          (!isRadeMaster && !isApplied) &&
            <Button variant="primary" onClick={onClickSubmitApplication}>
              참가하기
            </Button>
        }

      </Modal.Footer>
    </Modal>
  )
}