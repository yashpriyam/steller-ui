import { Button } from "./components/button/button";
// interface AppProps {}
const App:React.FC = () => {
  // const { t } = useTranslation();
    const onClick = () => {
      // setIsModalOpen(true);
    };

    const onHover = () => {
      // setIsModalOpen(false);
    };

    return (
      <div>
        <h1>React Button Example</h1>
        <Button className="buttonComp" onClick={onClick} onHover={onHover} isDisabled={false} size={"large"} isHidden={false} variant={"outlined"} />
      </div>
    );
}

export default App;

