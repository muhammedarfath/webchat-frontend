import React from 'react'
import AvatarProfile from '../avatar/Avatar_profile'
import { backendUrl } from '../../Constants/Constants'
import { Link, useNavigate } from 'react-router-dom'
import FollowButton from '../follow_btn/FollowButton'

function ProfileDetails({user,current_user,username}) {
    const navigate = useNavigate();
    return (
        <div className="w-full flex flex-col justify-center items-center gap-3 p-3">
            {user.profile.image ? (
                <img
                    src={`${backendUrl}${user.profile.image}`}
                    alt="img"
                    className="rounded-full border-1 w-52 h-52 object-cover"
                />
            ) : (
                <AvatarProfile username={user.profile.user.username} size="6xl" />
            )}
            <h6>{user.profile.full_name}</h6>
            <small>@{user.profile.user.username}</small>
            <div className="w-96 flex items-center justify-center w-">
                {!user.profile.bio === "undefined" ? (<span className="text-center">{user.profile.bio}</span>) : (
                    ''
                )}
            </div>
            <span>
                {user.follower && user.following
                    ? `${user.follower.length} followers . ${user.following.length} following`
                    : `0 followers · 0 following`}
            </span>
            {username == current_user ? (
                <div className="flex gap-4">
                    <Link to="/profile-settings">
                        <button className="px-5 py-3 font-semibold rounded-3xl bg-[#E9E9E9]">
                            Edit Profile
                        </button>
                    </Link>
                    <button className="px-5 py-3 font-semibold rounded-3xl bg-[#E9E9E9]">
                        Settings
                    </button>
                </div>
            ) : (
                <div className="flex gap-4">
                    <button
                        className="px-5 py-3 font-semibold rounded-3xl bg-[#E9E9E9]"
                        onClick={() =>
                            navigate("/chathome", {
                                state: { username: user.profile.user.username },
                            })
                        }
                    >
                        Messsage
                    </button>
                    <FollowButton
                        follow_user={user.profile.user.username}
                        follow_status={user.follow_status}
                    />
                </div>
            )}
        </div>
    )
}

export default ProfileDetails
