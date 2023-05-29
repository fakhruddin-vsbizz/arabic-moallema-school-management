import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Box, Modal, Button } from "@mui/material";
import RemoveUser from "@/components/Modules/batches/RemoveUser";
import { fetchBatchesData } from "@/backend/Announcement/AnnouncementDB";
import { useRouter } from "next/router";
import { fetchBatcheIdBasedOnBatchName } from "@/backend/Batches/BatchesDB";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const names = [
  "Batch 1",
  "Batch 2",
  "Batch 3",
  "Batch 4",
  "Batch 5",
  "Batch 6",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ batchesData }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [allBatches, setAllBatches] = React.useState();
  const [selectedBatch, setSelectedBatch] = React.useState();
  const [batchIdNew, setBatchIdNew] = React.useState();

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const handleOpen = (batchName) => {
    router.replace(`/admin/batches/batches-detail/${batchName}`);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  React.useEffect(() => {
    const fetchBatch = async () => {
      const data = await fetchBatchesData();
      setAllBatches(data);
    };
    fetchBatch();
  }, []);

  let filteredBatches;
  if (allBatches && batchesData) {
    filteredBatches = allBatches
      .filter((batch) => {
        return !batchesData.some(
          (data) => data.batch_name === batch.batch_name
        );
      })
      .concat(
        batchesData.filter((data) => {
          return !allBatches.some(
            (batch) => batch.batch_name === data.batch_name
          );
        })
      );
  }
  console.log(filteredBatches);

  const handleDelete = async (value) => {
    console.log(value);
    console.info("You clicked the delete icon.");

    let batchId;
    const idData = await fetchBatcheIdBasedOnBatchName(value);
    if (idData[0]) {
      batchId = idData[0].batch_id;
    }
    setBatchIdNew(batchId);

    setSelectedBatch(value);
    setOpen(true);
    setPersonName((prevSelected) =>
      prevSelected.filter((val) => val !== value)
    );
  };
  console.log(personName);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div className=" m-4">
        <h1 className="m-2 mb-4">Assigned Batches</h1>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {batchesData.map((batch) => (
            <Chip
              key={batch.batch_name}
              label={batch.batch_name}
              value={selectedBatch}
              onClick={() => handleOpen(batch.batch_name)}
              onDelete={() => handleDelete(batch.batch_name)}
              className="bg-dark-purple text-white p-3"
            />
          ))}
        </Box>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {batchesData[0] && batchIdNew && (
            <RemoveUser
              setOpen={setOpen}
              batchId={batchIdNew}
              batchName={selectedBatch}
              user="Batch 1"
              isReplace={false}
              type="Batch"
              action="Remove"
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
