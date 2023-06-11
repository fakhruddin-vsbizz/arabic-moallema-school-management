import * as React from "react";
import Link from "next/link";
import CardLayout from "@/components/Layout/card/CardLayout";
import MUISlider from "@/components/Layout/slider/MUISlider";
import MUIMiniCard from "@/components/Layout/card/MUIMiniCard";
import { Button, Chip, Grow, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import AuthContext from "@/components/Context/store/auth-context";
// import { fetchChapters } from "@/backend/Chapters/GetChaptersDB";
import { fetchTeacherBatches } from "@/backend/Batches/BatchesForTeachersStudentsDB";
import {
  fetchBatcheIdBasedOnBatchName,
  fetchIndividualBatch,
} from "@/backend/Batches/BatchesDB";
import LoadingSpinner from "@/components/Layout/spinner/LoadingSpinner";
import WarningCard from "@/components/Layout/card/WarningCard";
import { fetchSessionData } from "@/backend/Session/SessionDB";

const ClassDetais = ({ batchName, user }) => {
  const [sessionData, setSessionData] = React.useState([]);
  const [batchId, setBatchId] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [nextSession, setNextSession] = React.useState("");

  const authCtx = React.useContext(AuthContext);
  const email = authCtx.userEmail;

  let totalCompleted;

  React.useEffect(() => {
    const setBatchIdData = async () => {
      const idData = await fetchBatcheIdBasedOnBatchName(batchName);
      if (idData[0]) {
        setBatchId(idData[0].batch_id);
      }
    };
    setBatchIdData();
  }, [batchName]);

  React.useEffect(() => {
    const teacherBatches = async () => {
      const data = await fetchTeacherBatches(email);
      authCtx.setBatchesData(data);
    };
    teacherBatches();
  }, [email]);

  React.useEffect(() => {
    const fetchSession = async () => {
      if (batchId) {
        const data = await fetchSessionData(batchId);
        setSessionData(data);
        setNextSession(data.length+1)
      }
    };
    fetchSession();
  }, [batchId]);

  console.log(sessionData);
  console.log(batchId);
  return (
    <div className="">
      <div className="px-3 lg:px-8 w-full">
        <div className=" w-full animate-popupSlide ">
          <CardLayout
            firstComp=<div className="animate-popupSlide">
              <h2 className="text-2xl lg:text-3xl text-white ">
                {batchName} 
              </h2>
              <h4 className="text-2xl lg:text-xl text-white " >Next Session: session{nextSession} </h4>
            </div>
            secondComp=<div className="animate-popupSlide  ">
              <h2 className="text-2xl lg:text-xl text-white ">
                Date: xx/xx/xxxx
              </h2>
              <Link href={`/${user}/class`}>
                  <Button
                    size="medium"
                    style={{ backgroundColor: 'rgb(132 204 22)', color: 'white',    }}
                    className="text-center w-48 border-2 border-white bg-lime-500 text-white hover:bg-orange-500 "
                  >
                    Go to Class
                  </Button>
                </Link>
            </div>

           
          />
        </div>
        <h1 className="text-lg  mt-10">Completed Classes</h1>
        {!loading && sessionData && sessionData.length === 0 && (
          <WarningCard title={`No Class Conducted`} />
        )}

        <div className="mt-4  relative">{loading && <LoadingSpinner />}</div>
        {user !== "student" && (
          <MUISlider
            card={
              !loading &&
              sessionData &&
              sessionData.map((chapter) => (
                <div className="px-2">
                    <Box
                      component="polygon"
                      // sx={{
                      //   fill: (theme) => theme.palette.common.white,
                      //   stroke: (theme) => theme.palette.divider,
                      //   strokeWidth: 1,
                      // }}
                      points="0,100 50,00, 100,100"
                    >
                      <MUIMiniCard
                        title={`session ${chapter.session_id}`}
                        disc={chapter.starting_time.substring(0, 10)}
                        isBtn={true}
                        btnText="View"
                        link={`/teacher/chapter-detail/${chapter.session_id}/${chapter.batch_id}`}
                      />
                    </Box>
                </div>
              ))
            }
          />
        )}
        {user === "student" && (
          <MUISlider
            card={
              !loading &&
              sessionData &&
              sessionData.map((chapter) => (
                <div className="px-2">
                  <MUIMiniCard
                    title={`session ${chapter.session_id}`}
                    disc={chapter.starting_time}
                    isChip={true}
                    chipLable="Attended"
                    // link={`/student/chapter-detail/${chapter}/${batchName}`}
                  />
                </div>
              ))
            }
          />
        )}
      </div>
    </div>
  );
};

export default ClassDetais;
