import { Tabs } from '../../components/tabs/tabs';
import React from 'react'

/*TODO: @dhananjay - this page is WIP, adding here for example  */

const HomePage = () => {
  const dataList = [
    {
      text: " Tab 1",
      value: "value1",
      selected: true,
    },
    {
      text: " Tab 2",
      value: "value2",
      disabled: true,
    },
    {
      text: " Tab 3",
      value: "value3",
    },
    {
      text: " Tab 4",
      value: "value4",
    },
  ];
  console.log({ Map });
  return (
    <div>
      <Tabs dataList={dataList} />
    </div>
  );
};

export default HomePage;
