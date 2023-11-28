import { Button } from "./components/button/button";
// interface AppProps {}
const App: React.FC = () => {
  // const { t } = useTranslation();
  const onClick = () => {
      // setClassName("clickOnButton")
    };

  const onHover = () => {
      // setClassName('hoverOnButton')
    };
    return (
      <div>
        <h1>React Button Example</h1>
        <Button
          className={"buttonComp"}
          onClick={onClick}
          onHover={onHover}
          isDisabled={true}
          size={"large"}
          isHidden={false}
          variant={"outlined"}
          isLoading={true}
          loaderPosition="left"
        />
      </div>
    );
}

export default App;

