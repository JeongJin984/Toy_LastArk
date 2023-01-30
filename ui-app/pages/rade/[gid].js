import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NavigationBar from "../../components/NavigationBar";
import {
  Button,
  Divider,
  Header,
  Icon,
  Input,
  Table,
} from "semantic-ui-react";
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getRade} from "../../reducer/radeReducer";
import RadeInfoModal from "../../components/radeInfoModal";
import RadePostModal from "../../components/radePostModal";
import timestamp from "../../lib/utils/timeFormat";

export default function rade() {
  const dispatch = useDispatch()
  const router = useRouter()

  const { rade } = useSelector(state => state.RadeReducer)
  const {gid} = router.query

  const [radeInfoModalShow, setRadeInfoModalShow] = useState(false);
  const [curRadeInfo, setCurRadeInfo] = useState(null)
  const [postRadeModalShow, setPostRadeModalShow] = useState(false);
  const [value, onChange] = useState(null);


  useEffect(() => {
    onChange(new Date())
  }, [])

  const onClickRadeGet = () => {
    dispatch(getRade({
      startTime: timestamp(value.toString())
    }))
  }

  const handleRadeInfoModalShow = (data) => () => {
    setCurRadeInfo(data)
    setRadeInfoModalShow(true)
  }

  const handleRadeInfoModalClose = () => {
    setRadeInfoModalShow(false)
  }

  const onClickRadePost = () => {
    setPostRadeModalShow(true)
  }

  const handlePostRadeModalClose = () => {
    setPostRadeModalShow(false)
  }


  return (
    <div style={{height: "100vh"}}>
      <NavigationBar/>
      <Row style={{paddingTop: "60px"}}>
        <Col lg={2} style={{padding: "10px"}}>
        </Col>
        <Col lg={7} style={{paddingBottom: "2%"}}>
          <Header as='h2' style={{marginTop: "1%"}}>
            <Icon name='plug' />
            <Header.Content>레이드</Header.Content>
          </Header>
          <Row style={{height: "35vh", overflowY: "auto"}}>
            <div style={{float: "left", width: "350px"}}>
              {value && <Calendar onChange={onChange} value={value} />}
            </div>
            <div style={{float: "right", width: "calc(100% - 350px)", textAlign: "center", marginTop: "10%"}}>
              {value && <h3>{value.toString()}</h3>}
              <Button style={{marginTop: "10%"}} onClick={onClickRadeGet}>레이드 조회</Button>
              <Button style={{marginTop: "10%"}} onClick={onClickRadePost}>레이드 모집</Button>
            </div>
          </Row>
          <div>
            <Table basic='very' selectable={true}>
              <Table.Header>
                <Table.Row textAlign={"center"}>
                  <Table.HeaderCell>작성자</Table.HeaderCell>
                  <Table.HeaderCell>제목</Table.HeaderCell>
                  <Table.HeaderCell>시작시간</Table.HeaderCell>
                  <Table.HeaderCell>남은자리</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  rade.data ? rade.data.map(v => (
                    <Table.Row key={v.radeId} style={{cursor: "pointer"}} onClick={handleRadeInfoModalShow(v)}>
                      <Table.Cell textAlign={"center"} width={2}><a href={"https://loawa.com/char/" + v.radeInfo.radeMaster.characterName}>{v.radeInfo.radeMaster.characterName}</a></Table.Cell>
                      <Table.Cell width={8}>{v.title}</Table.Cell>
                      <Table.Cell textAlign={"center"} width={3}>{v.startAt.substring(0,10) + " " + v.startAt.substring(11,16)}</Table.Cell>
                      <Table.Cell textAlign={"center"} width={3}>{(v.radeInfo.maxMemberNum - v.radeInfo.radeMembers.length)   + "/" + v.radeInfo.maxMemberNum}</Table.Cell>
                    </Table.Row>
                  )) :
                    rade.loading ?
                      <Table.Row key={0}>
                        <Table.Cell textAlign={"center"} width={2}>None</Table.Cell>
                        <Table.Cell width={8}>로딩중</Table.Cell>
                        <Table.Cell textAlign={"center"} width={3}>None</Table.Cell>
                        <Table.Cell textAlign={"center"} width={3}>None</Table.Cell>
                      </Table.Row> :
                      <Table.Row key={0}>
                        <Table.Cell textAlign={"center"} width={2}>None</Table.Cell>
                        <Table.Cell width={8}>No Data</Table.Cell>
                        <Table.Cell textAlign={"center"} width={3}>None</Table.Cell>
                        <Table.Cell textAlign={"center"} width={3}>None</Table.Cell>
                      </Table.Row>
                }
              </Table.Body>
            </Table>
          </div>
        </Col>
        <Col lg={3}>
          <div style={{height: "93vh", width: "90%", float: "right", overflowY: "auto"}}>
            <div style={{textAlign: "center", marginTop: "5px", marginBottom: "5px"}}>
              <b>Chat</b>
            </div>
            <Divider style={{margin: "0px"}} clearing />
            <div style={{height: "86%", overflowY: "auto", scrollbarColor: "black"}}>
              <div style={{paddingLeft: "13px", paddingRight: "13px", paddingBottom: "3px"}}>
                <b style={{color: "red"}}>셈호: </b>
                <span style={{wordWrap: "break-word", fontSize: "13px"}}>ㅁㄷㅈㄱㅎㅁㄸㄸㄸㄸㄷㅍㄷㄱㄴㄹㅇㅍㄷㅁㄴㄱㅎㄴㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</span>
              </div>
            </div>
            <div style={{textAlign: "right", paddingLeft: "10px", paddingRight: "10px"}}>
              <Input style={{width: "100%", marginBottom: "10px"}} placeholder='Search...' />
              <Button size='mini'>채팅</Button>
            </div>
          </div>
        </Col>
      </Row>
      { curRadeInfo && <RadeInfoModal modalShow={radeInfoModalShow} setModalShow={setRadeInfoModalShow} rade={curRadeInfo}/> }
      <RadePostModal handlePostRadeModalClose={handlePostRadeModalClose} postRadeModalShow={postRadeModalShow} setPostRadeModalShow={setPostRadeModalShow} curDate={value}/>
    </div>
  );
}