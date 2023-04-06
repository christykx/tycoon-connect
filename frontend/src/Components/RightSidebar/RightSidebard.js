import React from 'react'

function RightSidebar() {
    return (
        <div style={{ marginLeft: '75%' }}>


            {/* <p>Left side bar</p> */}
            <div style={{ width: '250px', position: 'fixed', height: '300px', backgroundColor: 'white', border: '2px solid grey', borderRadius: '8px' }}>
                <br /><br />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', textAlign: 'center' }}>

                    <h5>Suggestions For You</h5>
                    <br/>
                    <p>Jerom</p>
                    <p>Jennifer</p>


                </div>


            </div>

        </div>
    )
}

export default RightSidebar
