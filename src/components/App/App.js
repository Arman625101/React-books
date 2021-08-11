import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../utils/Routes";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import { useFetch } from "../../utils/useFetch";
import { DataContext } from "../../contexts/Data";
import "./App.scss";

function App() {
  const [dataContext, setDataContext] = useState({});
  const [toRefresh, setToRefresh] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [mode, setMode] = useState("");
  const [editItem, setEditItem] = useState({});

  const { data } = useFetch(toRefresh);

  useEffect(() => {
    if (
      toRefresh ||
      (Object.entries(data).length !== 0 && data.constructor === Object)
    ) {
      setDataContext({ ...data, editModal, deleteModal });
      setToRefresh(false);
      setIsShowModal(false);
    }
  }, [data, toRefresh]);

  const handleRefresh = () => {
    setToRefresh(true);
    setEditItem({});
  };
  const editModal = (item) => {
    setIsShowModal(true);
    setEditItem(item);
    setMode("edit");
  };

  const deleteModal = (id) => {
    setIsShowModal(true);
    setDeleteId(id);
    setMode("delete");
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setEditItem({});
  };

  return (
    <DataContext.Provider value={dataContext}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            {(window.location.pathname === "/genres" ||
              window.location.pathname === "/authors" ||
              window.location.pathname === "/books") && (
              <button
                className="create"
                onClick={() => {
                  setIsShowModal(true);
                  setMode("create");
                }}
              >
                Add new
              </button>
            )}

            <Routes handleRefresh={handleRefresh} toRefresh={toRefresh} />
          </div>
        </div>
        {isShowModal && (
          <Modal
            deleteId={deleteId}
            editItem={editItem}
            handleRefresh={handleRefresh}
            mode={mode}
            handleCloseModal={handleCloseModal}
          />
        )}
      </Router>
    </DataContext.Provider>
  );
}

export default App;
