import React from 'react';
import {Tabs, Card} from 'antd';

import BasicSettings from './contents/basic.settings';
import AdvanceSettings from './contents/advanced.settings';
import AccountBindings from './contents/account.bindings';
import NotificationCenter from './contents/notification.center';

const { TabPane } = Tabs;



function SettingsComponent() {
    return (
      <Card>
      <Tabs defaultActiveKey="1" tabPosition="top">
          <TabPane tab="Basic" key="1">
         <BasicSettings/>
        </TabPane>
        <TabPane tab="Security" key="2">
          <AdvanceSettings/>
        </TabPane>
        <TabPane tab="Account" key="3">
          <AccountBindings/>
        </TabPane>
        <TabPane tab="Notification" key="4">
          <NotificationCenter/>
        </TabPane>
      </Tabs>
      </Card>
      );
}


export default SettingsComponent