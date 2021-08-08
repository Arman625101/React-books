import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../utils/Routes";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import "./App.scss";

function App() {
  const [isShowModal, setIsShowModal] = useState(false);
  // const setPathname = (pathname) => {
  //   console.log("**", pathname);
  // };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <button onClick={() => setIsShowModal(true)}>Add new</button>
          <Routes />
          {/* setPathname={setPathname} */}
        </div>
      </div>
      {isShowModal && <Modal handleCloseModal={() => setIsShowModal(false)} />}
    </Router>
  );
}

export default App;
