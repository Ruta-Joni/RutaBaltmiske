import { Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import StatisticsElement from '../../component/StatisticsElement'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useTheme } from '@mui/material'
import CardElement from '../../component/CardElement'

const UserDashboard = () => {
    const { palette } = useTheme();
    const { user } = useSelector(state => state.userProfile);
    return (
        <>
            <Box sx={{width:"95%", m:3, mb:15}}>
                <Typography variant="h4" sx={{ color: palette.primary.main, fontWeight:600, pb: 3 }}>
                    Kandidato aplinka
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <StatisticsElement
                        value={user && moment(user.createdAt).format('YYYY - MM - DD')}
                        icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Registruotas (-a) sistemoje nuo"/>
                    <StatisticsElement
                        value={user && user.jobsHistory.length}
                        icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Kandidatuota į darbo skelbimų:"/>
                    
                </Stack>
            <Typography variant="h4" sx={{ color: palette.primary.main, fontWeight:600, mt: 3 }}>
                    Išsaugoti skelbimai:
                </Typography>
                <Box>
                {
                        user && user.jobsHistory.map((history, i) => (
                            <CardElement
                                key={i}
                                id={history.jobID}
                                jobTitle={history.title}
                                description={history.description}
                                location={history.location}
                                jobSen={history.jobSen}
                                salary={history.salary}
                                category={history.jobType}
                            />
                        ))
                    }
                </Box>
            </Box>
        </>
    )
}

export default UserDashboard