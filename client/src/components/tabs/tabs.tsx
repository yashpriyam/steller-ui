import { Tab } from "../../components/tab/tab";
import {
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import "./tabs.scss";

export const Tabs: React.FC<TabsProps> = (props) => {
  const { dataList, className="", style={} } = props;
  const [tabSwitchMap, setTabSwitchMap] = useState<Record<string, boolean>>();
  const [tabSliderWidth, setTabSliderWidth] = useState<string>();
  const handleTabSwitch: MouseEventHandler<HTMLDivElement> = (e) => {
    const id = String(e.currentTarget.id);
    if (!dataList[Number(id)].disabled) {
      setTabSwitchMap({ [String(id)]: true });
    }
  };
  const setDefaultSelected = () =>{
    const defaultSelectedObj : Record<number, boolean>= {};
    dataList?.forEach((val,idx)=>{
        if(val.selected) defaultSelectedObj[idx] = val.selected;
    });
    setTabSwitchMap({...defaultSelectedObj});
  }
  const getXYOrigin : MouseEventHandler<HTMLDivElement> = (e)=>{
    setTabSliderWidth(String(e.clientX))
  }
  useEffect(()=>{
    setDefaultSelected();
  },[])
  return (
    <><div className={`tabs-main-wrapper ${className}`} style={style}>
      {dataList.map((data, idx) => {
        const {text,value,disabled,selected,onClick=()=>{}, className="",selectedClass="",style={}} = data;
        return <Tab
          key={idx}
          index={idx}
          label={text ?? value}
          disabled={disabled}
          value={value}
          isSelected={(tabSwitchMap && tabSwitchMap[idx])}
          onClick={(e) => {
            getXYOrigin(e);
            handleTabSwitch(e);
            onClick(e);
          }}
          className={className}
          selectedClass={selectedClass}
          style={style}
        />
        })}
    </div>
    {/* <span style={{height: "2px", backgroundColor:"#26b3d7", display: "block", width: tabSliderWidth}} className="tab-slider-indicator"></span> */}
    </>
  );
};
