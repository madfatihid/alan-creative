// import logo from './logo.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import './App.css';
import PointOfSale from './PointOfSale';
import Edit from './Edit';

function App() {
  return (
    <Tabs>
      <TabPanel>
        <PointOfSale />
      </TabPanel>
      <TabPanel>
        <Edit />
      </TabPanel>
      <TabList>
        <Tab className="button">Point of Sale</Tab>
        <Tab className="button">Edit</Tab>
      </TabList>
    </Tabs>
  );
}

export default App;
