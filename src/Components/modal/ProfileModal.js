import React, { useRef, useState, useEffect } from 'react';
import { Modal, Textarea, ModalContent, Input, Button } from '@nextui-org/react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineCameraAlt } from "react-icons/md";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../Redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function ProfileModal({ isProfileModelOpen, setIsProfileModelOpen }) {   
    const { user_id, username, email, full_name, bio, image } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setName(username);
        setUserMail(email);
        setUserFullName(full_name);
        setUserBio(bio);
    }, [username, email, full_name, bio]);

    const [name, setName] = useState('');
    const [userMail, setUserMail] = useState('');
    const [userFullName, setUserFullName] = useState('');
    const [userBio, setUserBio] = useState('');
    const [userImage, setUserImage] = useState(null);

    const handleClose = () => {
        setIsProfileModelOpen(false);
    };

    const handleFileChange = (e) => {
        setUserImage(e.target.files[0]);
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('full_name', userFullName);
            formData.append('bio', userBio);
            formData.append('image', userImage);

            const response = await axios.post(`http://127.0.0.1:8000/chat/edit/${user_id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data) {
                console.log(response.data);
                dispatch(updateUserProfile({ full_name: response.data.full_name, bio: response.data.bio, image: response.data.image }));
                navigate('/');
            } else {
                alert('something went wrong');
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal isOpen={isProfileModelOpen} onClose={handleClose} className="text-dark" placement="center" size="md" hideCloseButton={true} backdrop="blur">
            <ModalContent>
                <div className='flex gap-2 items-center mt-5 ml-4 text-2xl font-bold'>
                   <FaArrowLeftLong onClick={handleClose}/>
                   <h1>Account Setting</h1>
                </div>

                <div className='h-[37rem] bg-white m-3 flex flex-col justify-center items-center'>
                    <div className='relative w-[10rem] h-[10rem] my-4 bg-slate-200 rounded-full'>
                        {image ? (
                            <img src={`http://127.0.0.1:8000${image}`} alt="image" className='rounded-full w-full h-full object-cover' />
                        ) : (
                            <img src="https://dreamschat.dreamstechnologies.com/react/template/assets/img/avatar/avatar-2.jpg" alt="image" className='rounded-full w-full h-full object-cover' />
                        )}
                        <button className='absolute bottom-0 border-4 border-white right-1 transform rounded-full -translate-x-1/2 bg-[#420BA1] text-white p-2 text-2xl' onClick={() => fileInputRef.current.click()}>
                            <MdOutlineCameraAlt />
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
                        </button>
                    </div>
                    <div>
                        <div className='flex gap-2 m-6'>
                            <Input label="Username" value={name} onChange={(e) => setName(e.target.value)} />
                            <Input label="Email" type="email" value={userMail} onChange={(e) => setUserMail(e.target.value)} />
                        </div>

                        <div className='gap-2 m-6'>
                            <Input label="Full Name" value={userFullName} onChange={(e) => setUserFullName(e.target.value)} />
                        </div>
                        <div>
                            <Textarea
                                label="Bio"
                                placeholder="Enter your Bio"
                                className="max-w-md"
                                value={userBio}
                                onChange={(e) => setUserBio(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end mt-9">
                            <Button className='bg-[#420BA1] text-white m-2' variant="text" onClick={handleClose}>Cancel</Button>
                            <Button type="submit" className='bg-[#420BA1] text-white m-2' variant="contained" onClick={handleSaveChanges}>Save Changes</Button>
                        </div>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}

export default ProfileModal;
