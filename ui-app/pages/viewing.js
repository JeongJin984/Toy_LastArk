import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import {ButtonGroup, Col, Container, Dropdown, Form, Image, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {Button, Divider, Header, Icon, Input, Item} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {Device} from "mediasoup-client";
import NavigationBar from "../components/NavigationBar";

const socket = io("192.168.201.136:3000/mediasoup")

socket.on('connection-success', ({ socketId }) => {
  console.log(socketId)
})

export default function Viewing() {
  const [clientStream, setClientStream] = useState(null)
  const [streamer, setStreamer] = useState("test")
  const [viewer, setViewer] = useState("testee")

  const onClickView = () => {
    socket.emit("get-rtpCapabilities", viewer, streamer, async (data) => {
      const device = new Device()
      let consumerTransport;
      await device.load({
        routerRtpCapabilities: data.rtpCapabilities
      })

      socket.emit("create-recv-webRtc-transport", viewer, streamer, async ({params}) => {
        // The server sends back params needed
        // to create Send Transport on the client side
        if (params.error) {
          console.log(params.error)
          return
        }

        consumerTransport = device.createRecvTransport(params)
        console.log(consumerTransport)

        consumerTransport.on('connect', async ({dtlsParameters}, callback, errback) => {
          try {
            await socket.emit('transport-recv-connect', viewer, streamer, {
              dtlsParameters,
            })
            callback()
          } catch (error) {
            errback(error)
          }
        })

        await socket.emit('consume', viewer, streamer, {
          rtpCapabilities: device.rtpCapabilities
        }, async ({params}) => {
          if (params.error) {
            console.log('Cannot Consume')
            return
          }
          console.log(params.rtpParameters)

          const consumer = await consumerTransport.consume({
            id: params.id,
            producerId: params.producerId,
            kind: params.kind,
            rtpParameters: params.rtpParameters
          })
          await socket.emit('consumer-resume', viewer, streamer)
          const {track} = consumer
          setClientStream(new MediaStream([track]))
        })
      })
    })
  }

  return (
    <div>
      <NavigationBar/>
      <div style={{display: "flex", paddingTop: "49px", height: "100vh"}}>
        <div style={{height: "100%", width: "80px", float: "left", textAlign: "center", backgroundColor: "#EFEFF1"}}>
          <Image roundedCircle={true} style={{marginTop: "10px"}}  width={50} src='https://pbs.twimg.com/media/FMQYq6BVcAEjZjf?format=jpg&name=360x360'/>
          <Image roundedCircle={true} style={{marginTop: "10px"}}  width={50} src='https://pbs.twimg.com/media/FMQYq6BVcAEjZjf?format=jpg&name=360x360'/>
          <Image roundedCircle={true} style={{marginTop: "10px"}}  width={50} src='https://pbs.twimg.com/media/FMQYq6BVcAEjZjf?format=jpg&name=360x360'/>
          <Image roundedCircle={true} style={{marginTop: "10px"}}  width={50} src='https://pbs.twimg.com/media/FMQYq6BVcAEjZjf?format=jpg&name=360x360'/>
          <Image roundedCircle={true} style={{marginTop: "10px"}}  width={50} src='https://pbs.twimg.com/media/FMQYq6BVcAEjZjf?format=jpg&name=360x360'/>
        </div>
        <div className={"hide"} style={{height: "100%", float: "left", width: "100%", backgroundColor: "#f7f7f8", overflowY: "auto"}}>
          {
            clientStream ?
              <ReactPlayer controls={true} width={"100%"} height={"830px"} url={clientStream} /> :
              <div>시작하기를 눌러주세요</div>
          }

          <Row style={{margin: "20px", }}>
            <Col>
              <Item.Group >
                <Item>
                  <Item.Image circular={true} size='tiny' src='https://pbs.twimg.com/media/FMQYq6BVcAEjZjf?format=jpg&name=360x360' />
                  <Item.Content>
                    <Item.Header as='a'>모이면 따뜻해지는</Item.Header>
                    <Item.Description>
                      <div>모코코 환영!</div>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Col>
            <Col style={{textAlign: "right"}}>
              <Button onClick={onClickView}>시청하기</Button>
              <Button>팔로우</Button>
              <Button>커뮤니티</Button>
            </Col>
          </Row>
          <h2>sergsegsetgf</h2>
          <h2>sergsegsetgf</h2>
          <h2>sergsegsetgf</h2>
          <h2>sergsegsetgf</h2>
          <h2>sergsegsetgf</h2>
          <h2>sergsegsetgf</h2>
        </div>
        <div style={{height: "100%", width: "400px", float: "right", overflowY: "auto"}}>
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
      </div>
    </div>
  )
}
