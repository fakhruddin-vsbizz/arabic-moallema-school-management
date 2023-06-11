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
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, Chip, TableHead } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { fetchChapters } from "@/backend/Chapters/GetChaptersDB";

// commenting to resolve merge

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

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

function createData(name, date, calories, fat) {
  return { name, date, calories, fat };
}

const rows = [
  // createData({chapter}, {date}, {totalStudents}, {Status}),
  createData("Huruf", "02/03/2023 at 9:30 Am", 24, "In progress"),
  createData("Huruf", "01/03/2023 at 9:30 Am", 24, "In progress"),
  createData("Hamza", "28/02/2023 at 9:30 Am", 24, "Completed"),
  createData("Hamza", "27/02/2023 at 9:30 Am", 24, "In progress"),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function CustomPaginationActionsTable({
  batchHistory,
  type,
  getAttandanceSelectedSession,
  user,
  getRecordedVideo,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [allChapters, setAllChapters] = React.useState();

  // function tableData(name, date, calories, fat) {
  //   return { name, date, calories, fat };
  // }

  //const rows = data.sort((a, b) => (a.calories < b.calories ? -1 : 1));

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - batchHistory.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // React.useEffect(() => {
  //   const fetchChaptersData = async () => {
  //     const data = await fetchChapters();
  //     setAllChapters(data);
  //   };
  //   fetchChaptersData();
  // }, []);
  return (
    <div className="shadow-md" style={{ backgroundColor:'#015e6d', padding:'3%', borderRadius:'20px' }}>
      
      <center>
      <TableContainer>
        <Table sx={{ width: '80%' }} aria-label="custom pagination table">
          <TableHead>
            <TableRow style={{ backgroundColor:'#fb933c'}}>
              <TableCell className=" font-semibold "><b style={{ fontSize:'120%', fontFamily:'Segoe UI' }}>Date and Time</b></TableCell>
              {user !== "student" && (
                <TableCell className=" font-semibold ">
                  <b style={{ fontSize:'120%', fontFamily:'Segoe UI' }}>Total Students</b>
                </TableCell>
              )}
              <TableCell className=" font-semibold " align="center">
                <b style={{ fontSize:'120%', fontFamily:'Segoe UI' }}>Status</b>
              </TableCell>

              {type === "chapterDetail" && user !== "student" && (
                <TableCell className=" font-semibold " align="center">
                  <b style={{ fontSize:'120%', fontFamily:'Segoe UI' }}>Attendance</b>
                </TableCell>
              )}
              {user === "student" && (
                <TableCell className=" font-semibold " align="center">
                  <b style={{ fontSize:'120%', fontFamily:'Segoe UI' }}>Recorded Video</b>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor:'#b9cfd5' }}>
            {(batchHistory && rowsPerPage > 0
              ? batchHistory.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : rows
            ).map((chapter) => (
              <TableRow key={chapter.session_id} style={{ fontFamily:'Segoe UI' }}>
                <TableCell component="th" scope="row" style={{ fontFamily:'Segoe UI' }}>
                  {chapter.starting_time.substring(0, 10)} ,
                  {new Date(chapter.starting_time).getHours()}:
                  {new Date(chapter.starting_time).getMinutes()}
                </TableCell>
                {user !== "student" && (
                  <TableCell style={{ fontFamily:'Segoe UI' }}>
                    {chapter.students_present.students.length} Students
                  </TableCell>
                )}

                <TableCell style={{ width: 180, fontFamily:'Segoe UI' }} align="center">
                  {chapter.chapter_completion_status === "Completed" ? (
                    <label>
                      <CheckCircleIcon/>
                      &nbsp;&nbsp;&nbsp;
                      <Chip
                        className="border-green-500  text-green-500  bg-green-100 "
                        label="Completed"
                        variant="outlined"
                      />
                    </label>
                    
                  ) : (
                    <label>
                      <CheckCircleIcon/>
                      &nbsp;&nbsp;&nbsp;
                    <Chip
                      className="border-yellow-500  text-yellow-500  bg-yellow-100 "
                      label="Done"
                      variant="outlined"
                    />
                    </label>
                  )}
                </TableCell>

                {type === "chapterDetail" && user !== "student" && (
                  <TableCell align="center" style={{ fontFamily:'Segoe UI' }}>
                    <Button variant="contained" style={{ fontFamily:'Segoe UI' }}
                      onClick={() =>
                        getAttandanceSelectedSession(chapter.session_id)
                      }
                    >
                      Attendance
                    </Button>
                  </TableCell>
                )}
                {user === "student" && (
                  <TableCell align="center" style={{ fontFamily:'Segoe UI' }}>
                    <Button
                      onClick={() => getRecordedVideo(chapter.session_id)}
                    >
                      Video
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow style={{ backgroundColor:'#eaebeb' }}>
              <TablePagination 
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={4}
                count={batchHistory.length}
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
      </center>
      
    </div>
  );
}
