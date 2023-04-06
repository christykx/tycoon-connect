import React from 'react'
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function Demopage() {
    return (
        <div>
            <h1>Hii demooooo</h1>

            {/* upload */}
            <Button variant="contained" startIcon={<CameraAltIcon />} component="label">
                Upload
                <input hidden accept="image/*"  multiple type="file" />
            </Button>
            {/* upload */}
          
        </div>
    )
}

export default Demopage
