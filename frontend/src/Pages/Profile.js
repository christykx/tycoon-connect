import { Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import LeftSidebar from '../Components/LeftSidebar/LeftSidebar'
import Profile from '../Components/Profile/Profile'
import RightProfile from '../Components/RightProfile/RightProfile'
import RightSidebar from '../Components/RightSidebar/RightSidebar'
import Topbar from '../Components/Topbar/Topbar'

function ProfilePage() {
  return (
    <Box>
    <Topbar />
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <LeftSidebar/>
     <Profile/>
     <RightProfile/>
    </Stack>
  </Box>
  )
}

export default ProfilePage
