import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import { MenuItem, Select } from "@mui/material";
import { Label } from "@mui/icons-material";
import { fetchTeachersAttendance } from "@/backend/Students/StudentAttendanceDB";
import WarningCard from "@/components/Layout/card/WarningCard";
import { fetchBatcheIdBasedOnBatchName } from "@/backend/Batches/BatchesDB";
import { fetchChapters } from "@/backend/Chapters/GetChaptersDB";
import { fetchBatchesData } from "@/backend/Announcement/AnnouncementDB";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange, chapter, date, lastCol } =
    props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

export default function AttendanceListStudentSnd({ batchId, studentsId }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [selectedOption, setSelectedOption] = React.useState();
  const [attendaceList, setAttendanceList] = React.useState();
  const [allChapters, setAllChapters] = React.useState();
  const [allBatches, setAllBatches] = React.useState();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - attendaceList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSelectedBatch = async (value) => {
    setSelectedOption(value);
    let batchId;
    const idData = await fetchBatcheIdBasedOnBatchName(value);
    if (idData[0]) {
      batchId = idData[0].batch_id;
    }

    const data = await fetchTeachersAttendance(batchId, teacherId);
    setAttendanceList(data);
  };

  React.useEffect(() => {
    const fetchChaptersData = async () => {
      const data = await fetchChapters();
      setAllChapters(data);
    };
    fetchChaptersData();
  }, []);
  React.useEffect(() => {
    const getBatches = async () => {
      const data = await fetchBatchesData();
      setAllBatches(data);
    };
    getBatches();
  }, []);

  // console.log(allChapters);

  // console.log(attendaceList);
  // console.log(batchDataTeacher);
  return (
    <>
      <div className="bg-white rounded-lg shadow-md">
        <div className=" border-b-2 p-3 ">
          <h1 className="text-2xl pt-2">Student Attendance History</h1>
        </div>

        {/* {batchDataTeacher && (
          <Box>
            <div className="col-span-1 mt-3">
              <label className=" mt-3 ml-4 p-4 text-gray-700">
                Select Batch
              </label>
            </div>
            <Select
              style={{ width: "90%" }}
              className=" m-6"
              value={selectedOption}
              onChange={(e) => getSelectedBatch(e.target.value)}
            >
              {batchDataTeacher.map((batch) => (
                <MenuItem key={batch.id} value={batch.batch_name}>
                  {batch.batch_name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )} */}
        { attendaceList && attendaceList.length > 0 && (
          <TableContainer>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                {(rowsPerPage > 0
                  ? attendaceList.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((attendance) => (
                  <TableRow key={attendance.session_id}>
                    <TableCell component="th" scope="row">
                      {allChapters &&
                        allChapters
                          .filter(
                            (batch) =>
                              batch.chapter_id === attendance.chapter_id
                          )
                          .map((item) => item.chapter_name)}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {attendance.starting_time.substring(0, 10)}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {allBatches &&
                        allBatches
                          .filter(
                            (batch) => batch.batch_id === attendance.batch_id
                          )
                          .map((item) => item.batch_name)}
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      6,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={attendaceList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}

        { attendaceList && attendaceList.length === 0 && (
          <WarningCard title={`No Session Attendance For ${selectedOption}`} />
        )}
      </div>
    </>
  );
}
