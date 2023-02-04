import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NavigationBar from "../components/NavigationBar";
import {
  Button,
  Divider,
  Header,
  Icon,
  Input, List,
  Table,
} from "semantic-ui-react";
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getRade} from "../reducer/radeReducer";
import RadeInfoModal from "../components/radeInfoModal";
import RadePostModal from "../components/radePostModal";
import timestamp from "../lib/utils/timeFormat";
import {getFixedRadeApply, getPendingRadeApply, getUser} from "../reducer/userReducer";

export default function index() {
  const dispatch = useDispatch()

  const { rade } = useSelector(state => state.RadeReducer)
  const { user, fixedApply, pendingApply } = useSelector(state => state.UserReducer)

  const [radeInfoModalShow, setRadeInfoModalShow] = useState(false);
  const [curRadeInfo, setCurRadeInfo] = useState(null)
  const [postRadeModalShow, setPostRadeModalShow] = useState(false);
  const [value, onChange] = useState(null);

  useEffect(() => {
    dispatch(getUser({}))
    dispatch(getFixedRadeApply({state: "fixed"}))
    dispatch(getPendingRadeApply({state: "pending"}))
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

  const onClickRadePost = () => {
    setPostRadeModalShow(true)
  }

  const handlePostRadeModalClose = () => {
    setPostRadeModalShow(false)
  }


  return (
    <div style={{height: "100vh"}}>
      <NavigationBar userData={user.data}/>
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
                  <Table.HeaderCell>번호</Table.HeaderCell>
                  <Table.HeaderCell>제목</Table.HeaderCell>
                  <Table.HeaderCell>공대장</Table.HeaderCell>
                  <Table.HeaderCell>시작시간</Table.HeaderCell>
                  <Table.HeaderCell>남은자리</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  rade.data ? rade.data.map((v, i) => (
                    <Table.Row key={i} style={{cursor: "pointer"}} onClick={handleRadeInfoModalShow(v)}>
                      <Table.Cell textAlign={"center"} width={1}>{v.radeId}</Table.Cell>
                      <Table.Cell width={5}>{v.title}</Table.Cell>
                      <Table.Cell textAlign={"center"} width={2}><a href={"https://loawa.com/char/" + v.radeInfo.radeMaster.characterName}>{v.radeInfo.radeMaster.characterName}</a></Table.Cell>
                      <Table.Cell textAlign={"center"} width={3}>{v.startAt.substring(0,10) + " " + v.startAt.substring(11,16)}</Table.Cell>
                      <Table.Cell textAlign={"center"} width={2}>{(v.radeInfo.maxMemberNum - v.apply.filter(v2 => v2.state === "fixed").length)   + "/" + v.radeInfo.maxMemberNum}</Table.Cell>
                    </Table.Row>
                  )) :
                    rade.loading ?
                      <Table.Row key={0}>
                        <Table.Cell textAlign={"center"} width={1}>None</Table.Cell>
                        <Table.Cell width={5}>로딩중</Table.Cell>
                        <Table.Cell textAlign={"center"} width={2}>None</Table.Cell>
                        <Table.Cell textAlign={"center"} width={3}>None</Table.Cell>
                        <Table.Cell textAlign={"center"} width={2}>None</Table.Cell>
                      </Table.Row> :
                      <Table.Row key={0}>
                        <Table.Cell textAlign={"center"} width={1}>None</Table.Cell>
                        <Table.Cell width={5}>No Data</Table.Cell>
                        <Table.Cell textAlign={"center"} width={2}>None</Table.Cell>
                        <Table.Cell textAlign={"center"} width={3}>None</Table.Cell>
                        <Table.Cell textAlign={"center"} width={2}>None</Table.Cell>
                      </Table.Row>
                }
              </Table.Body>
            </Table>
          </div>
        </Col>
        <Col lg={3}>
          <div style={{height: "93vh", width: "90%", float: "right", overflowY: "auto"}}>
            <div style={{textAlign: "center", marginTop: "5px", marginBottom: "5px"}}>
              <b>레이드 일정</b>
            </div>
            <Divider style={{margin: "10px"}} clearing />
            <div style={{height: "44%", overflowY: "auto", scrollbarColor: "black"}}>
              <Table basic='very' selectable={true} >
                <Table.Header>
                  <Table.Row textAlign={"center"}>
                    <Table.HeaderCell>번호</Table.HeaderCell>
                    <Table.HeaderCell>컨텐츠</Table.HeaderCell>
                    <Table.HeaderCell>시작시간</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    fixedApply.data && fixedApply.data.map((v, i) => (
                      <Table.Row key={i} style={{cursor: "pointer"}} onClick={handleRadeInfoModalShow(v)}>
                        <Table.Cell textAlign={"center"} width={2}>{v.radeId}</Table.Cell>
                        <Table.Cell textAlign={"center"} width={5}>{v.title}</Table.Cell>
                        <Table.Cell textAlign={"center"} width={5}>{v.startAt.substring(0,10) + " " + v.startAt.substring(11,16)}</Table.Cell>
                      </Table.Row>
                    ))
                  }
                </Table.Body>
              </Table>
            </div>
            <div style={{textAlign: "center", paddingTop: "5px", paddingBottom: "-20px"}}>
              <b>지원 현황</b>
            </div>
            <Divider style={{margin: "10px"}}/>
            <div style={{height: "44%", overflowY: "auto", scrollbarColor: "black"}}>
              <Table basic='very' selectable={true}>
                <Table.Header>
                  <Table.Row textAlign={"center"}>
                    <Table.HeaderCell>번호</Table.HeaderCell>
                    <Table.HeaderCell>컨텐츠</Table.HeaderCell>
                    <Table.HeaderCell>시작시간</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    pendingApply.data && pendingApply.data.map((v, i) => (
                      <Table.Row key={i} style={{cursor: "pointer"}} onClick={handleRadeInfoModalShow(v)}>
                        <Table.Cell textAlign={"center"} width={2}>{v.radeId}</Table.Cell>
                        <Table.Cell textAlign={"center"} width={5}>{v.radeInfo.bossName}</Table.Cell>
                        <Table.Cell textAlign={"center"} width={5}>{v.startAt.substring(0,10) + " " + v.startAt.substring(11,16)}</Table.Cell>
                      </Table.Row>
                    ))
                  }
                </Table.Body>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
      { (user.data && curRadeInfo) && <RadeInfoModal modalShow={radeInfoModalShow} setModalShow={setRadeInfoModalShow} rade={curRadeInfo} userData={user.data}/> }
      { user.data && <RadePostModal handlePostRadeModalClose={handlePostRadeModalClose} postRadeModalShow={postRadeModalShow} setPostRadeModalShow={setPostRadeModalShow} curDate={value} userData={user.data}/>}
    </div>
  );
}