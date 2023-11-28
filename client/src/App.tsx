import { useEffect, useState } from "react";
import { Button } from "./components/button/button";
// interface AppProps {}
const App: React.FC = () => {
  const [className, setClassName] = useState<string>('buttonComp')
  // const { t } = useTranslation();
    const onClick = () => {
      // setIsModalOpen(true);
    };

  const onHover = () => {
      setClassName('hoverOnButton')
    };
  useEffect(() => {
  setClassName("buttonComp");
 },[])
    return (
      <div>
        <h1>React Button Example</h1>
        <Button className={className} onClick={onClick} onHover={onHover} isDisabled={false} size={"large"} isHidden={false} variant={"outlined"} />
      </div>
    );
}

export default App;

