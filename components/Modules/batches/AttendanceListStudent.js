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
import { fetchStudentAttendance } from "@/backend/Students/StudentAttendanceDB";
import WarningCard from "@/components/Layout/card/WarningCard";
import { fetchStudentsData } from "@/backend/Students/StudentDB";
// import { fetchChapters } from "@/backend/Chapters/GetChaptersDB";

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

export default function CustomPaginationActionsTable({ batchId, studentsId }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  //attendance data supabase

  const [attendaceList, setAttendanceList] = React.useState();
  const [allStudents, setAllStudents] = React.useState();

  const [id, setId] = React.useState();

  React.useEffect(() => {
    const fetchAttendance = async () => {
      if (batchId) {
        const data = await fetchStudentAttendance(batchId);
        setAttendanceList(data);
      }
    };
    fetchAttendance();
  }, [batchId]);

  React.useEffect(() => {
    const fetchAttendanceStudent = async () => {
      const data = await fetchStudentsData();
      setAllStudents(data);
    };
    fetchAttendanceStudent();
  }, []);

  console.log(attendaceList);
  // console.log(allStudents);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - attendaceList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("value: ", event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    if (allStudents && studentsId) {
      console.log(studentsId);
      let idNew = allStudents
        .filter((all) => all.student_id == +studentsId)
        .map((item) => item.email);
      if (idNew[0]) {
        setId(idNew[0]);
      }
    }
  }, [allStudents, studentsId]);

  console.log(id);
  return (
    <>
      <div className="bg-white rounded-lg shadow-md">
        {attendaceList && attendaceList.length > 0 && (
          <div className=" border-b-2 p-3   ">
            <h1 className="text-2xl pt-2">Students Attendance History</h1>
          </div>
        )}
        {attendaceList && attendaceList.length > 0 && (
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
                      Class {attendance.session_id}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {attendance.starting_time.substring(0, 10)}
                    </TableCell>

                    {allStudents &&
                    attendance.students_present.students.includes(id) ? (
                      <td className="whitespace-nowrap px-3 py-4  text-green-600 text-md">
                        Present
                      </td>
                    ) : (
                      <td className="whitespace-nowrap px-3 py-4  text-red-600 text-md">
                        Absent
                      </td>
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
        {attendaceList && attendaceList.length === 0 && (
          <WarningCard title={`No Session Attendance For The Student`} />
        )}
      </div>
    </>
  );
}
