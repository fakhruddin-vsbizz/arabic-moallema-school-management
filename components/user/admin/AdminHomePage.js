import React, { useContext, useEffect, useState } from "react";
import grayBgImg from "@/components/src/img/grayBgImg.png";
import Sidebar from "@/components/Layout/navigation/Sidebar";
import CreateBatch from "@/components/user/admin/CreateBatch";
import SelectDropdown from "@/components/Layout/elements/SelectDropdown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BackButton from "@/components/Layout/elements/BackButton";
import Button from "@mui/material/Button";
import CardList from "@/components/user/admin/CardList";
import { fetchBatchesData } from "@/backend/Announcement/AnnouncementDB";
import AuthContext from "@/components/Context/store/auth-context";
import BatchContext from "@/components/Context/store/batch-context";
import SuccessPrompt from "@/components/Layout/elements/SuccessPrompt";
import Spinner from "@/components/Layout/spinner/Spinner";
import WarningCard from "@/components/Layout/card/WarningCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AdminHomePage = () => {
  const [open, setOpen] = React.useState(false);
  const [filteredBatch, setFilteredBatch] = React.useState([]);
  const [warning, setWarning] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("sdf");
  const auth = useContext(AuthContext);
  const batchCtx = useContext(BatchContext);

  useEffect(() => {
    const fetchBatches = async () => {
      const data = await fetchBatchesData();
      auth.setBatchesData(data);
    };
    fetchBatches();
  }, [batchCtx.submitted]);

  const handleSelectedItem = (batchData) => {
    if (auth.batchesList) {
      let selectedBatch = auth.batchesList.filter(
        (batch) => batch.batch_name === batchData
      );
      setFilteredBatch(selectedBatch);
    }
  };

  const dataToDisplay =
    filteredBatch.length === 0 ? auth.batchesList : filteredBatch;

  useEffect(() => {
    if (dataToDisplay && dataToDisplay.length > 0) {
      setWarning(false);
    } else {
      setWarning(true);
    }
  }, [dataToDisplay]);

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${grayBgImg.src})`,
        backgroundAttachment: "fixed",
        backgroundSize: "100%",
        backgroundPosition: "center top",
        widows: "100vw",
        minHeight: "100vh",
      }}
    >
      <div className="flex min-h-screen h-full">
        <Sidebar nav_index={0} />
        <div className="flex-1 p-7  ">
          <div className="m-0 p-10 w-full h-fit">
            <div className="grid grid-cols-5 lg:grid-cols-3 w-full mx-auto my-5 gap-10">
              <div className="lg:col-span-1 col-span-5">
                <h1 className=" my-auto text-2xl mt-3 ">
                  <BackButton /> Batches
                </h1>
              </div>
              <div className="col-span-3 lg:col-span-1">
                <div className="px-2 w-full ">
                  <SelectDropdown
                    handleSelectedItem={handleSelectedItem}
                    allItems={auth.batchesList}
                    value="class"
                    lable="Select Batch"
                  />
                </div>
              </div>
              <div className="lg:col-span-1 col-span-2">
                <div className="text-end w-full mt-2">
                  <Button
                    variant="contained"
                    className="bg-dark-purple"
                    onClick={handleOpen}
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    Create Batch
                  </Button>
                </div>
              </div>
            </div>
            <Divider variant="middle" />
            {warning && <WarningCard title="No batch is been created" />}
          </div>
          <div className="m-0 p-10 w-full h-fit">
            {batchCtx.submitted && (
              <SuccessPrompt
                type="add"
                title="Batch Created Successfully"
                setSubmitted={batchCtx.setSubmittedHandler}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mx-auto my-10 gap-10">
              {dataToDisplay &&
                dataToDisplay.map((batch) => (
                  <CardList
                    subTitle={batch.book_name}
                    title={batch.batch_name}
                    id={batch.id}
                    link={`/admin/batches/batches-detail/${batch.batch_name}`}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{ width: "760px" }}
          className="pb-5 px-10 border-2 border-gray-400 rounded-lg "
        >
          <CreateBatch setOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
};

export default AdminHomePage;
