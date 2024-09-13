import { BottomNavBar } from "@/modules"
import { Layout } from "antd"
import {
  Content,
  Footer,
} from "antd/es/layout/layout"
import { Outlet } from "react-router-dom"

const HomePage = () => {
  return (
    <Layout className="h-full bg-primary">
      <Content className="h-full">
        <Outlet />
      </Content>
      <Footer className="!p-0">
        <BottomNavBar />
      </Footer>
    </Layout>
  )
}

export default HomePage
