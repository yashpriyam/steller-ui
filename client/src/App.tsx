import { useTranslation } from "react-i18next";
import { Modal } from './components/modal/modal'
import React,{useState} from "react";


const App = () => {
  const { t } = useTranslation();
  const[isOpen, setIsOpen] = useState<boolean>(false);

    const handleModalOpen = () =>{
        setIsOpen(true);
    }
  return (
    <div>
      <h1>{t("greeting")}</h1>
      <button onClick={handleModalOpen}> to active modal</button>

      <Modal isClosable ={true} onClose = { ()=>{setIsOpen(false)}} isOpen = {isOpen}>
        <div>
          operating from outside the model component
        </div>
      </Modal>
    </div>
  );
};

export default App;
