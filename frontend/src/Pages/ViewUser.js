import { Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import LeftSidebar from '../Components/LeftSidebar/LeftSidebar'
import Topbar from '../Components/Topbar/Topbar'
import ViewUser from '../Components/ViewUser/ViewUser'

function ViewUserPage() {
  return (
    <Box>
      <Topbar/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
      <LeftSidebar/>
      <ViewUser/>
      </Stack>
    </Box>
  )
}

export default ViewUserPage
