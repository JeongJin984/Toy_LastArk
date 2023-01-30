import NavigationBar from "../components/NavigationBar";
import {Col, Pagination, Placeholder, Row, Table} from "react-bootstrap";
import {Header, Icon, Card, Menu, Image, Divider, List} from "semantic-ui-react";
import HoveredItem from "../components/HoveredItem";
import {useEffect, useState} from "react";
import HoverTableCell from "../components/HoverTableCell";
import {getUser} from "../reducer/userReducer";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.UserReducer)

  useEffect(() => {
    dispatch(getUser({
      username: "test1"
    }))
  }, [dispatch])

  const onClickHeader = (title) => () => {
    router.push("/community/" + title)
  }

  return(
    <div>
      {user.data ?
        <div>
          <NavigationBar/>
          <Row style={{paddingTop: "60px"}}>
            <Col lg={1} style={{padding: "10px"}}>
            </Col>
            <Col lg={10} style={{paddingTop: "5%", paddingBottom: "5%"}}>
              <Header as='h2' icon textAlign='center' style={{cursor: "pointer"}} onClick={onClickHeader("모이면따뜻해요")}>
                <Icon name='users' circular />
                <Header.Content>대표 캐릭터: COVAX</Header.Content>
                <Header.Subheader>
                  모이면따뜻해요
                </Header.Subheader>
              </Header>
              <div>
                <Header as='h2' style={{marginTop: "5%"}}>
                  <Icon name='plug' />
                  <Header.Content>길드</Header.Content>
                </Header>
                <Card.Group>
                  {
                    user.data.userLostArkProfile.map((v, i) => (
                      v.guildName &&
                      <Card key={i} href='/community/moddat' style={{textDecorationLine: "none"}}>
                        <Header as='h3' style={{margin: "10px"}}>
                          <Image size={"tiny"} circular src={v.characterImage} /> {v.guildName}
                        </Header>
                        <Card.Content description={<Image size={"medium"} src={v.characterImage} />} />
                        <Card.Content extra>
                          <Icon name='user' />{v.characterName + "(" + v.GuildMemberGrade + ")"}
                        </Card.Content>
                      </Card>
                    ))
                  }
                </Card.Group>
              </div>
              <Divider />
            </Col>
            <Col lg={1}/>
          </Row>
        </div> :
        user.loading ?
          <div>로딩중</div> :
          <div>유저 로딩 실패</div>
      }
    </div>
  )
}