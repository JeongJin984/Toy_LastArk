import {Header, Menu} from "semantic-ui-react";

export default function SideLinkMenu({activeItem, setActiveItem, handleItemClick}) {
  return (
    <Menu style={{position: "fixed", width: "12%", marginLeft: "30px", zIndex: -10}} vertical>
      <Menu.Item
        name='promotions'
        active={activeItem === 'promotions'}
        onClick={handleItemClick}
        style={{backgroundColor: "beige"}}
      >
        <Header as='h4'>메뉴</Header>
      </Menu.Item>
      <Menu.Item
        name='coupons'
        active={activeItem === 'coupons'}
        onClick={handleItemClick}
      >
        <Header as='h4'>레이드 모집</Header>
      </Menu.Item>

      <Menu.Item
        name='rebates'
        active={activeItem === 'rebates'}
        onClick={handleItemClick}
      >
        <Header as='h4'>자유게시판</Header>
      </Menu.Item>
    </Menu>
  )
}