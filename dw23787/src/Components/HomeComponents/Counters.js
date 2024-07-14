import React from 'react';
import {HomePagephrases} from '../../Utils/language';
import { useAppContext } from '../AppContext';


function Counters({numUsers, numTrips}) {

    // App context variables for language conversion.
    const { language } = useAppContext();
    const {
        Nusers,
        NusersR,
        NTrips,
        NTripsR,
    } = HomePagephrases[language];

    // This component is responsible for displaying the number of users and trips created in the app.
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
                    <h5>{Nusers}</h5>
                    <p style={{ color: '#060a0d' }}>
                        {NusersR}
                    </p>
                </div>
                <div style={{ height: '100px', borderLeft: '1px solid #ccc', margin: '0 20px' }}></div>
                <div className="col-md-5" style={{ margin: '20px 0' }}>
                    <h1 style={{ fontSize: '3rem', color: '#2f3e23' }}>{numTrips}</h1>
                    <h5>{NTrips}</h5>
                    <p style={{ color: '#060a0d' }}>
                        {NTripsR}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Counters
