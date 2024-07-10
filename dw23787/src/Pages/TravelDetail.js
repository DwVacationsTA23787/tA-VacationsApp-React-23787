import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetTravelDetail, GetTravelsForUser } from '../Services/TravelsService';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NotFoundTest from '../Components/NotFoundPage';
import { AddUserToGroup } from '../Services/GroupsService';
import { useAppContext } from '../Components/AppContext';
import { TravelDetailsphrases } from '../Utils/language';

function TravelDetail() {

  const { language } = useAppContext();
  const {
    KeyPoints,
      TripName,
      Transport,
      BudgetI,
      BudgetF,
      Category,
      Location,
      Description,
      Age,
      Gender,
      Nationality,
      TripsCreated,
      EnterGroup,
  } = TravelDetailsphrases[language];

  const { id } = useParams();
  const [travelDetail, setTravelDetail] = useState(null);
  const [travelsUser, setTravelsUser] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingTwo, setLoadingTwo] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setLoadingTwo(true);

    GetTravelDetail(id)
      .then((data) => {
        setTravelDetail(data);
        return GetTravelsForUser(data.user.id);
      })
      .then((userData) => {
        if (userData != null) {
          setTravelsUser(userData);
        } else {
          setTravelsUser(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setTravelDetail(null);
        setTravelsUser([]);
      })
      .finally(() => {
        setLoading(false);
        setLoadingTwo(false);
      });
  }, [id]);

  // Event Handler Functions
  const handleGroupAdd = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    AddUserToGroup(travelDetail.groupId, storedUser.id)
      .then((response) => {
          navigate("/chat");
      })
      .catch((error) => {
        console.error("Error adding user to group:", error);
      });
  }

  return (
    <div>
      {loading || loadingTwo ? (
        <div>Loading...</div>
      ) : travelDetail ? (
        <div className='container-fluid mt-4'>
          <div className='row h-100 align-items-stretch'>
            <div className='col-md-6 d-flex align-items-stretch'>
              <img src={travelDetail.banner === null || travelDetail.banner === "" ? "/default.webp" : "/default.webp"} className="img-thumbnail w-100" alt="Travel Thumbnail" />
            </div>

            <div className='col-md-6'>
              <div className='h-100 d-flex flex-column justify-content-between'>
                <Card className='border p-4'>
                  <Card.Header className='text-center'>
                    <h3>{KeyPoints}</h3>
                  </Card.Header>
                  <Card.Body>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='border p-4 m-2 rounded'><strong>{TripName}:</strong> {travelDetail.tripName}</div>
                        <div className='border p-4 m-2 rounded'><strong>{BudgetI}:</strong> {travelDetail.inicialBudget}</div>
                        <div className='border p-4 m-2 rounded'><strong>{Category}:</strong> {travelDetail.category}</div>
                      </div>
                      <div className='col-md-6'>
                        <div className='border p-4 m-2 rounded'><strong>{Transport}:</strong> {travelDetail.transport}</div>
                        <div className='border p-4 m-2 rounded'><strong>{BudgetF}:</strong> {travelDetail.finalBudget}</div>
                        <div className='border p-4 m-2 rounded'><strong>{Location}:</strong> {travelDetail.location}</div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                <Card className='border p-4 mt-4'>
                  <Card.Header className='text-center'>
                    <h3>{Description}</h3>
                  </Card.Header>
                  <Card.Body>
                    <p>{travelDetail.description}</p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
          <div className='row justify-content-center mt-4'>
            <Button
              className='rounded-circle bg-transparent border-0 p-0'
              style={{
                width: '40px',
                height: '40px',
                border: '2px solid #ced4da',
                outline: 'none',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </Button>
          </div>

          {/* Section for user */}
          <section className="text-center mt-5 mb-5">
            <div className="row">
              <div className="col-lg-4 mb-5 mb-lg-0 position-relative">
                {travelDetail.user && (
                  <>
                    <div className='border p-4 m-2 rounded'><strong>{Age}:</strong> {travelDetail.user.age}</div>
                    <div className='border p-4 m-2 rounded'><strong>{Gender}:</strong> {travelDetail.user.gender}</div>
                    <div className='border p-4 m-2 rounded'><strong>{Nationality}:</strong> {travelDetail.user.nationality}</div>
                  </>
                )}
                <div className="vr vr-blurry position-absolute my-0 h-100 d-none d-lg-block top-0 end-0"></div>
              </div>

              <div className="col-lg-4 mb-5 mb-lg-0 position-relative d-flex justify-content-center align-items-center">
                <div className='text-center'>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle shadow-4"
                    style={{ width: '150px' }}
                    alt="Avatar"
                  />
                  <h4 className="mt-3 tracking-wide"><strong>{travelDetail.user.name}</strong></h4>
                  <h5 className="mt-3 tracking-wider font-italic">{travelDetail.user.quote === "" ? "" : '"' + travelDetail.user.quote + '"'}</h5>
                </div>
                <div className="vr vr-blurry position-absolute my-0 h-100 d-none d-lg-block top-0 end-0"></div>
              </div>


              <div className="col-lg-4 position-relative">
                <div>
                  <h3 className='p-2 m-2'><strong>{TripsCreated}</strong></h3>
                  <Link to={`/UserTravels/${travelDetail.user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <p role="button" className='font-weight-bold h2 mt-4'>{travelsUser}</p>
                  </Link>
                </div>
                <div className="vr vr-blurry position-absolute my-0 h-100 d-none d-lg-block top-0 end-0"></div>
              </div>
            </div>
          </section>
          <div class="d-grid gap-2 col-4 mx-auto mb-4">
           <button onClick={handleGroupAdd} type="button" class="btn btn-success btn-rounded p-2">{EnterGroup}</button>
          </div>
        </div>
      ) : (
        <NotFoundTest info="Travel detail not found" option="Back to Home" to="/"/>
      )}
    </div>
  );
}

export default TravelDetail;
