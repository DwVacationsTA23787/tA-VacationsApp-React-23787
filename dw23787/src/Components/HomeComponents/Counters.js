import React from 'react'

function Counters({numUsers, numTrips}) {
    return (
        <div
            className="container-fluid"
            style={{
                padding: '50px 0',
                textAlign: 'center',
                marginTop: '1rem'
            }}
        >
            <div className="d-flex justify-content-center align-items-center">
                <div className="col-md-5" style={{ margin: '20px 0' }}>
                    <h1 style={{ fontSize: '3rem', color: '#2f3e23' }}>{numUsers}</h1>
                    <h5>Number Users</h5>
                    <p style={{ color: '#060a0d' }}>
                        Number of Users Register in the App
                    </p>
                </div>
                <div style={{ height: '100px', borderLeft: '1px solid #ccc', margin: '0 20px' }}></div>
                <div className="col-md-5" style={{ margin: '20px 0' }}>
                    <h1 style={{ fontSize: '3rem', color: '#2f3e23' }}>{numTrips}</h1>
                    <h5>Number Trips</h5>
                    <p style={{ color: '#060a0d' }}>
                        Number of Trips Created by our Users.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Counters
