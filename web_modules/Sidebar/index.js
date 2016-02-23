import React, { PropTypes } from "react"
import Button from "Button"
import Tabs from "Tabs"
import TabList from "Tabs/TabList"
import Tab from "Tabs/Tab"
import TabPanel from "Tabs/TabPanel"
import SidebarPaths from "SidebarPaths"
import SidebarPoint from "SidebarPoint"
import "./styles"

const Sidebar = (props) => (
  <div className="ad-Sidebar">
    <Tabs selected={ 0 }>
      <TabList>
        <Tab>
          <Button
            icon="paths"
            type="tab">
            Paths
          </Button>
        </Tab>
        <Tab>
          <Button
            icon="point"
            type="tab">
            Point
          </Button>
        </Tab>
        <Tab>
          <Button
            icon="settings"
            type="tab">
            Settings
          </Button>
        </Tab>
      </TabList>

      <TabPanel>
        <SidebarPaths { ...props } />
      </TabPanel>
      <TabPanel>
        <SidebarPoint { ...props } />
      </TabPanel>
      <TabPanel></TabPanel>
    </Tabs>
  </div>
)

Sidebar.propTypes = {
  keyActions: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
}

export default Sidebar
