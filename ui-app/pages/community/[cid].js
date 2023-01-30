import {Icon, Item, Label, Button, List, Menu, Header, Divider, Input, Pagination, Table} from "semantic-ui-react";
import {ButtonGroup, Col, Dropdown, Image, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import HoveredItem from "../../components/HoveredItem";
import {useDispatch} from "react-redux";
import {getUser} from "../../reducer/userReducer";
import NavigationBar from "../../components/NavigationBar";
import SideLinkMenu from "../../components/SideLinkMenu";
import {useRouter} from "next/router";

export default function Community() {
  const router = useRouter()
  const { cid } = router.query

  const [activeItem, setActiveItem] = useState()
  const handleItemClick = (e, { name }) => setActiveItem(name)


  const items = [
    {
      id: 1,
      title: "소서 개사기인듯",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 2,
      title: "구라치지 마셈",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 3,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 4,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 5,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 6,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 7,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 8,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 9,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 10,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 11,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 12,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 13,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 14,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },
    {
      id: 15,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    },{
      id: 16,
      title: "흠... 그정돈가?",
      content: "ggggggggggggggggggggggg",
      hashtag: ["소서", "성능"]
    }
  ]

  return (
    <div style={{height: "100vh"}}>
      <NavigationBar/>
      <Row style={{paddingTop: "60px"}}>
        <Col lg={2} style={{padding: "10px"}}>
        </Col>
        <Col lg={7} style={{paddingBottom: "2%"}}>
          <div className={"hide"} style={{height: "84vh", overflowY: "auto", marginTop: "1%"}}>
            <Table basic='very' selectable={true}>
              <Table.Header>
                <Table.Row textAlign={"center"}>
                  <Table.HeaderCell>작성자</Table.HeaderCell>
                  <Table.HeaderCell>제목</Table.HeaderCell>
                  <Table.HeaderCell>등록시간</Table.HeaderCell>
                  <Table.HeaderCell>조회수</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  items.map(v => (
                    <Table.Row key={v.id} style={{cursor: "pointer"}}>
                      <Table.Cell textAlign={"center"} width={2}>John</Table.Cell>
                      <Table.Cell width={10}>{v.title}</Table.Cell>
                      <Table.Cell textAlign={"center"} width={2}>None</Table.Cell>
                      <Table.Cell textAlign={"center"} width={2}>None</Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          </div>
          <div style={{textAlign: "center"}}>
            <Pagination
              defaultActivePage={1}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={3}
            />
          </div>
        </Col>
        <Col lg={3}>
          <div style={{height: "93vh", width: "90%", float: "right", overflowY: "auto"}}>
            <div style={{textAlign: "center", marginTop: "5px", marginBottom: "5px"}}>
              <b>Guild Chat</b>
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
    </div>
  )
}