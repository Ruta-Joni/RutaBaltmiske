import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../component/Footer';
import LoadingBox from '../component/LoadingBox';
import Navbar from '../component/Navbar';
import { jobLoadSingleAction, jobTypeLoadAction } from '../redux/actions/jobAction';
import Button from '@mui/material/Button';
import { userApplyJobAction } from '../redux/actions/userAction';
import { useTheme } from '@emotion/react';

const SingleJob = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { singleJob, loading } = useSelector(state => state.singleJob);
  const { id } = useParams();
  const { jobType } = useSelector(state => state.jobTypeAll);

  useEffect(() => {
    dispatch(jobTypeLoadAction());
    dispatch(jobLoadSingleAction(id));
  }, [dispatch, id]);

  const applyForAJob = () => {
    const selectedJobType = getCategoryName(singleJob?.jobType);
    dispatch(
      userApplyJobAction({
        title: singleJob?.title,
        description: singleJob?.description,
        salary: singleJob?.salary,
        location: singleJob?.location,
        jobSen: singleJob?.jobSen,
        jobID: id,
        jobType: selectedJobType
      })
    );
  };

  const getCategoryName = (jobTypeId) => {
    if (jobType && jobType.length > 0) {
      const jobTypeObj = jobType.find(type => type._id === jobTypeId);
      return jobTypeObj ? jobTypeObj.jobTypeName : "";
    }
    return "";
  };

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa" }}>
        <Navbar />
        <Box sx={{ height: '85vh' }}>
          <Container sx={{ pt: '30px' }}>
            <Box sx={{ flex: 4, p: 2 }}>
              {loading ? (
                <LoadingBox />
              ) : (
                <Card sx={{ bgcolor: palette.primary.white }}>
                  <CardContent>
                    <Typography variant="h5" component="h3">
                      {singleJob?.title}
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        Atlyginimas
                      </Box>
                      : {singleJob?.salary} eur.
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        Sritis
                      </Box>
                      : {getCategoryName(singleJob?.jobType)}
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        Vieta
                      </Box>
                      : {singleJob?.location}
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        Tipas
                      </Box>
                      : {singleJob?.jobSen}
                    </Typography>
                    <Typography variant="body2" sx={{ pt: 2 }}>
                      <h3>Aprašymas</h3>
                      {singleJob?.description}
                    </Typography>
                  </CardContent>
                </Card>
              )}
              <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                <Button
                  onClick={applyForAJob}
                  sx={{ fontSize: "13px" }}
                  variant="contained"
                >
                  Išsaugoti
                </Button>
              </Card>
            </Box>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default SingleJob;
