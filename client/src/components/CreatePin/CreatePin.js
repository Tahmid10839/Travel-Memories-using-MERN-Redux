import React, { useEffect, useState } from 'react'
import './createPin.css'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { createPins, updatePin } from '../../actions/pins'

const CreatePin = ({ newPlace, setNewPlace, currentUser, updatePlaceId, setPlaceId }) => {
    const stars = Array(5).fill(0)
    const [starvalue, setStarValue] = useState(0)
    const [hoverValue, setHoverValue] = useState(null)
    const [starValueNeed, setStarValueNeed] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const dispatch = useDispatch()
    const pins = useSelector((state) => updatePlaceId ? state.pins.pins.find((pin) => pin._id === updatePlaceId) : null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (starvalue === 0) {
            setStarValueNeed('Rating must be at least 1 star')
        } else {
            setStarValueNeed('')
            const newPin = {
                title,
                desc,
                rating: starvalue,
                lat: newPlace.lat,
                long: newPlace.lng
            }
            if (updatePlaceId) {
                dispatch(updatePin(updatePlaceId, { ...newPin, username: currentUser }))
                setPlaceId(updatePlaceId)

            } else {
                dispatch(createPins({ ...newPin, username: currentUser }))
            }
            setNewPlace(null)
        }
    }

    useEffect(() => {
        if (updatePlaceId) {
            setTitle(pins.title)
            setDesc(pins.desc)
            setStarValue(pins.rating)
        }
    }, [updatePlaceId])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                </label>
                <input type="text" placeholder='Enter a Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label htmlFor="">
                    Review
                </label>
                <textarea rows={5} cols={30} placeholder='Say something about this place' value={desc} onChange={(e) => setDesc(e.target.value)} required />
                <label>
                    Rating
                </label>
                <div className='star-container'>
                    {stars.map((_, index) => (
                        <BsStarFill
                            key={index}
                            style={{
                                fontSize: '20px',
                                marginRight: '5px',
                                cursor: 'pointer',
                                color: (hoverValue || starvalue) > index ? 'gold' : 'gray'
                            }}
                            onClick={() => setStarValue(index + 1)}
                            onMouseOver={() => setHoverValue(index + 1)}
                            onMouseLeave={() => setHoverValue(null)}
                        />
                    ))}
                    {starValueNeed !== '' && (
                        <p style={{ color: 'red', fontSize: '12px' }}>{starValueNeed}</p>
                    )}
                </div>
                <button className='add-button' type='submit'>{updatePlaceId ? 'Update' : 'Add'} Memory</button>
            </form>
        </div>
    )
}

export default CreatePin