import { Button } from "./components/button/button";
const App: React.FC = () => {
  const onClick = () => {
    };

  const onHover = () => {
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
          loaderPosition="right"
        />
      </div>
    );
}

export default App;

