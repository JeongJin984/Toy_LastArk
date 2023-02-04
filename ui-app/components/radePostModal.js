import {Modal} from "react-bootstrap";
import {Button, Form, Message, TextArea} from "semantic-ui-react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {getRade, postRade} from "../reducer/radeReducer";
import timestamp from "../lib/utils/timeFormat";

export default function RadePostModal({postRadeModalShow, handlePostRadeModalClose, setPostRadeModalShow, curDate, userData}) {
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [bossName, setBossName] = useState("")
  const [maxNum, setMaxNum] = useState(0)
  const [radeMasterName, setRadeMasterName] = useState("")
  const [content, setContent] = useState("")
  const [startAt, setStartAt] = useState("00:00")
  const [members, setMembers] = useState("")

  const onChangeTitle = (e) => { setTitle(e.target.value) }
  const onChangeBossName = (e) => { setBossName(e.target.value) }
  const onChangeMaxNum = (e) => { setMaxNum(e.target.value) }
  const onChangeRadeMasterName = (e) => { setRadeMasterName(e.target.value) }
  const onChangeContent = (e) => { setContent(e.target.value) }
  const onChangeStartAt = (e) => { setStartAt(e.target.value) }
  const onChangeMembers = (e) => { setMembers(e.target.value) }


  const onClickSubmit = () => {
    setPostRadeModalShow(false)
    const target = new Date(curDate.toString())
    target.setHours(parseInt(startAt.split(":")[0]), parseInt(startAt.split(":")[1]))
    const result = timestamp(target.toString())

    dispatch(postRade({
      writer: userData.username,
      title, bossName, maxNum, content,
      startAt: result,
      members: members,
      radeMasterName: radeMasterName
    }))
  }

  return(
    <Modal show={postRadeModalShow} onHide={handlePostRadeModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>레이드 모집</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form success={true}>
          <Form.Field>
            <label>제목*</label>
            <input required={true} value={title} onChange={onChangeTitle}/>
            <label>레이드 종류*</label>
            <input required={true} value={bossName} onChange={onChangeBossName}/>
            <label>모집 인원*</label>
            <input type={"number"} required={true} value={maxNum} onChange={onChangeMaxNum}/>
            <label>공대장 캐릭터 닉네임*</label>
            <input required={true} value={radeMasterName} onChange={onChangeRadeMasterName}/>
            <label>내용(최소 스펙등)</label>
            <TextArea value={content} onChange={onChangeContent} placeholder='자유롭게 입력 가능' />
            <label>시작시간(HH:MM)</label>
            <input type={"time"} value={startAt} onChange={onChangeStartAt}/>
            <label>기본 참여(닉네임/닉네임....)</label>
            <TextArea value={members} onChange={onChangeMembers } placeholder='기본 참여 공대원' />
            <Message
              success
              header='Form Completed'
              content="You're all signed up for the newsletter"
            />
          </Form.Field>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handlePostRadeModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onClickSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}