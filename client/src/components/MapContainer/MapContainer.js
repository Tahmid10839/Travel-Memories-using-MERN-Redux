import React, { useEffect, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Room } from '@material-ui/icons'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { deletePin, getPins } from '../../actions/pins';
import moment from 'moment'
import './mapContainer.css'
import CreatePin from '../CreatePin/CreatePin';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { logOut } from '../../actions/users';
import { Avatar } from '@material-ui/core';
import LikePins from '../LikePins/LikePins';

// import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
// import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'; // Load worker code separately with worker-loader
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX

const MapContainer = () => {
    const { pins } = useSelector((state) => state.pins)
    const [viewState, setViewState] = useState({
        longitude: 40,
        latitude: 17,
        zoom: 2.5,
    })
    const dispatch = useDispatch()
    const [placeId, setPlaceId] = useState(null)
    const [newPlace, setNewPlace] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const { accessToken, user } = useSelector((state) => state.auth)
    const [currentUser, setCurrentUser] = useState('')
    const [updatePlaceId, setUpdatePlaceId] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: "mapbox://styles/tahmid10839/cl13r94ox000b14o437p0futi", // style URL
            // center: [-74.5, 40],
            // zoom: 9
            ...viewState,
        });
    }, [])

    useEffect(() => {
        dispatch(getPins())
    }, [pins])

    useEffect(() => {
        if (accessToken && user) {
            setCurrentUser(user?.username)
            setUserId(user?._id)
        } else {
            setCurrentUser('')
            setUserId(null)
        }
    }, [accessToken, user, currentUser, userId, showLogin, showRegister])
    // latitude = { 21.434514} longitude = { 91.974356}

    const handleAddPlaceClick = (e) => {
        console.log('clicked');
        if (currentUser !== '') {
            const { lat, lng } = e.lngLat
            setNewPlace({
                lat,
                lng
            })
        } else {
            setShowLogin(true)
        }
    }

    const handleMarkerClick = (id, lat, long) => {
        setPlaceId(id)
        setViewState({ ...viewState, latitude: lat, longitude: long })
    }

    const handleUpdatePin = (id, lat, long) => {
        setPlaceId(null)
        setNewPlace({
            lat,
            lng: long,
        })
        setUpdatePlaceId(id)
    }

    return (
        <>
            <div id='map' style={{ width: '100vw', height: '90vh' }} onDoubleClick={handleAddPlaceClick}>

            </div>
            {/* <Map
                id='map'
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100vw', height: '100vh' }}
                // mapStyle="mapbox://styles/mapbox/streets-v9"
                mapStyle="mapbox://styles/tahmid10839/cl13r94ox000b14o437p0futi"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                onDblClick={handleAddPlaceClick}
            >
                {pins.map((pin) => (
                    <React.Fragment key={pin._id}>
                        <Marker latitude={pin?.lat} longitude={pin?.long}
                            offsetLeft={-viewState.zoom * 5}
                            offsetTop={-viewState.zoom * 10}>
                            <Room style={{
                                fontSize: viewState.zoom * 10,
                                cursor: 'pointer',
                                color: pin.username === currentUser ? 'tomato' : 'blue'
                            }} onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)} />
                        </Marker>
                        {pin._id === placeId && (
                            <Popup latitude={pin.lat} longitude={pin.long} anchor="left"
                                closeButton={true}
                                style={{ marginLeft: 8 }}
                                closeOnClick={false}
                                onClose={() => setPlaceId(null)}>
                                <div className="card">
                                    <div className='justify-container'>
                                        <label htmlFor="">
                                            Place
                                        </label>
                                        {pin.username === currentUser && (
                                            <div className='update-delete-card'>
                                                <BiEditAlt className='update-delete-icons update-icon' onClick={() => handleUpdatePin(pin._id, pin.lat, pin.long)} />
                                                <RiDeleteBinLine className='update-delete-icons delete-icon' onClick={() => dispatch(deletePin(pin._id))} />
                                            </div>
                                        )}
                                    </div>
                                    <h4 className='place'>
                                        {pin.title}
                                    </h4>
                                    <label htmlFor="">
                                        Review
                                    </label>
                                    <p className='desc'>
                                        {pin.desc}
                                    </p>
                                    <label htmlFor="">
                                        Rating
                                    </label>
                                    <div>
                                        {pin.rating === 1 ? (
                                            <>
                                                <BsStarFill className='star star-fill' />
                                                <BsStar className='star' />
                                                <BsStar className='star' />
                                                <BsStar className='star' />
                                                <BsStar className='star' />
                                            </>
                                        ) : pin.rating === 2 ? (
                                            <>
                                                <BsStarFill className='star star-fill' />
                                                <BsStarFill className='star star-fill' />
                                                <BsStar className='star' />
                                                <BsStar className='star' />
                                                <BsStar className='star' />
                                            </>
                                        ) : pin.rating === 3 ? (
                                            <>
                                                <BsStarFill className='star star-fill' />
                                                <BsStarFill className='star star-fill' />
                                                <BsStarFill className='star star-fill' />
                                                <BsStar className='star' />
                                                <BsStar className='star' />
                                            </>
                                        ) : pin.rating === 4 ? (
                                            <>
                                                <BsStarFill className='star star-fill' />
                                                <BsStarFill className='star star-fill' />
                                                <BsStarFill className='star star-fill' />
                                                <BsStarFill className='star star-fill' />
                                                <BsStar className='star' />
                                            </>
                                        ) : (
                                            <>
                                                <BsStarFill className='star star-fill' />
                                                <BsStarFill className='star star-fill' />
                                                <BsStarFill className='star star-fill' />
                                                <BsStarFill className='star star-fill' />
                                                <BsStarFill className='star star-fill' />
                                            </>
                                        )}
                                    </div>
                                    <label htmlFor="">
                                        Information
                                    </label>
                                    <span className='username'>
                                        Created By <b>{pin.username}</b>
                                    </span>
                                    <span className='date'>{moment(pin.createdAt).fromNow()}</span>
                                    <LikePins pinId={pin?._id} like={pin?.likes} />
                                </div>
                            </Popup>
                        )}
                    </React.Fragment>
                ))}
                {newPlace && (
                    <Popup latitude={newPlace.lat} longitude={newPlace.lng} anchor="left"
                        closeButton={true}
                        style={{ marginLeft: 8 }}
                        closeOnClick={false}
                        onClose={() => {
                            setNewPlace(null)
                            setUpdatePlaceId(null)
                        }
                        }
                    >
                        <CreatePin newPlace={newPlace} setNewPlace={setNewPlace} currentUser={currentUser} updatePlaceId={updatePlaceId} setPlaceId={setPlaceId} />
                    </Popup>
                )}
                {currentUser ? (
                    <div className='user-container'>
                        <Avatar className='avatar'>
                            {currentUser.charAt(0)}
                        </Avatar>
                        <h4 className='username-title'>{currentUser}</h4>
                        <button className='button logout' onClick={() => dispatch(logOut())}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="buttons">
                        <button className='button login'
                            onClick={() => {
                                setShowRegister(false)
                                setShowLogin(true)
                            }}
                        >
                            Login
                        </button>
                        <button className='button register'
                            onClick={() => {
                                setShowLogin(false)
                                setShowRegister(true)
                            }}
                        >
                            Signup
                        </button>
                    </div>
                )}
                <div className='info'>
                    <div className="marker click-info">
                        Press double click on any location in the map to create memory
                    </div>
                    <div className="marker click-info">
                        You will have to login to create, update, delete your own memory and like others memories
                    </div>
                    <div className="marker">
                        <Room style={{
                            fontSize: '25px',
                            color: 'tomato'
                        }} />
                        Click this kind of marker pin to see your own created travel memory details after logged in
                    </div>
                    <div className="marker">
                        <Room style={{
                            fontSize: '25px',
                            color: 'blue'
                        }} />
                        Click this kind of marker pin to see other users travel memory details
                    </div>
                </div>
                {showLogin && (
                    <Login setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
                )}
                {showRegister && (
                    <Register setShowRegister={setShowRegister} setShowLogin={setShowLogin} />
                )}
            </Map> */}
        </>
    )
}

export default MapContainer