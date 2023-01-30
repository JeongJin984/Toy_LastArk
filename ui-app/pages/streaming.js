import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import {ButtonGroup, Col, Container, Dropdown, Form, Image, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {Button, Divider, Header, Icon, Input, Item} from "semantic-ui-react";
import {useState} from "react";
import {Device} from "mediasoup-client";
import {io} from "socket.io-client";
import {
  Level4_1,
  ProfileConstrainedHigh,
  ProfileHigh,
  profileLevelIdToString,
  ProfileMain
} from "h264-profile-level-id";
import NavigationBar from "../components/NavigationBar";

const socket = io("192.168.201.136:3000/mediasoup")

export default function Stream() {
  const [streamer, setStreamer] = useState("test")
  const [testStream, setTestStream] = useState()

  const onClickStream = () => {
    navigator.mediaDevices.getDisplayMedia({
      video: {
        width: {ideal: 1280},
        height: {ideal: 720}
      },
      audio: true
    }).then(stream => {
      setTestStream(stream)
      const track = stream.getVideoTracks()[0]

      const device = new Device()
      socket.emit("start-and-get-rtpCapabilities", streamer, async (data) => {
        await loadDevice(device, data)
        if(device.canProduce("video")) {
          socket.emit("create-webRTC-transport", streamer, async ({params}) => {
            if (params.error) {
              console.log(params.error)
              return
            }
            const producerTransport = device.createSendTransport(params)
            producerTransport.on("connect", async ({dtlsParameters}, callback, errback) => {
              try {
                socket.emit("send-transport-connect", streamer, {dtlsParameters})
                callback()
              } catch (error) {
                errback(error)
              }
            })

            producerTransport.on("produce", async (parameters, callback, errback) => {
              try {
                socket.emit("transport-produce", streamer, {
                  transportId: producerTransport.id,
                  kind: parameters.kind,
                  rtpParameters: parameters.rtpParameters,
                  appData: parameters.appData
                }, ({id}) => {
                  callback({id})
                })
              } catch (error) {
                errback(error)
              }
            })

            const producer = await producerTransport.produce({
              track       : track,
              encodings   :
                [
                  { maxBitrate: 900000 }
                ],
              codecOptions :
                {
                  videoGoogleStartBitrate : 40000
                },
              codec: {
                kind: "video",
                mimeType: "video/H264",
                clockRate: 90000,
                parameters: {
                  "packetization-mode"      : 1,
                  "profile-level-id"        : profileLevelIdToString({
                    level: Level4_1,
                    profile: ProfileMain
                  }),
                  "level-asymmetry-allowed" : 0
                }
              }
            })
            producer.on('trackended', () => {
              console.log('track ended')
              // close video track
            })

            producer.on('transportclose', () => {
              console.log('transport ended')
              // close video track
            })
          })
        } else {
          console.log("FUFUFFFFFFFFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCKKKKKKKKKK")
        }
      })
    })
  }

  async function loadDevice(device, data) {
    console.log("asdfasdf", data.rtpCapabilities)
    await device.load({
      routerRtpCapabilities: data.rtpCapabilities
    })

    if(!device.canProduce("video")) {
      console.warn("cannot produce video")
    }
  }

  return(
    <div>
      <NavigationBar/>
      <div style={{display: "flex", paddingTop: "49px", height: "100vh", paddingLeft: "1px"}}>
        <div className={"hide"} style={{height: "100%", float: "left", width: "100%", backgroundColor: "#f7f7f8", overflowY: "auto"}}>
          {
            testStream ?
              <ReactPlayer controls={true} width={"100%"} height={"830px"} url={testStream} /> :
              <div>방송 시작 버튼을 눌러 주세요!</div>
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
              <Button onClick={onClickStream}>방송시작</Button>
              <Button>방종하기</Button>
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
        <div style={{height: "100%", width: "480px", float: "right", overflowY: "auto"}}>
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