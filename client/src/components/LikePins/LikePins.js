import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likePin } from '../../actions/pins'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import './likePins.css'

const LikePins = ({ pinId, like }) => {

    const [likes, setLikes] = useState(like)
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('travel-user')))
    const dispatch = useDispatch()

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('travel-user')))
    }, [pinId, like])

    const userId = user?._id
    const hasLikedPost = likes.find((like) => like === userId)

    const handleLike = () => {
        dispatch(likePin(pinId))
        if (hasLikedPost) {
            setLikes(likes.filter((id) => id !== userId))
        } else {
            setLikes([...likes, userId])
        }
    }

    return (
        <button className='like-button' disabled={!user} onClick={handleLike}>
            <div className="like-container">
                {likes.length === 0 && (
                    <>
                        <AiOutlineLike />
                        &nbsp;Like
                    </>
                )}
                {((likes.length > 0) && (likes.find((like) => like === userId))) ? (
                    <>
                        <AiFillLike />
                        &nbsp;
                        {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} Like${likes.length > 1 ? `s` : ''}`}
                    </>
                )
                    : (likes.length > 0) && (
                        <>
                            <AiOutlineLike />
                            &nbsp;
                            {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                        </>
                    )}
            </div>
        </button>
    )
}

export default LikePins