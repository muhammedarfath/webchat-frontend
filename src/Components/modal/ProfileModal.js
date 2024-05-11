import { useState } from 'react';
import { Modal, Textarea, ModalContent, Input, Button } from '@nextui-org/react';
import { FaArrowLeftLong } from "react-icons/fa6";

function ProfileModal({ isCoinModelOpen, setIsCoinModelOpen }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');

    const handleClose = () => {
        setIsCoinModelOpen(false);
    };

    const handleSaveChanges = () => {
        // Add code here to handle saving changes
    };

    return (
        <Modal isOpen={isCoinModelOpen} onClose={handleClose} className="text-dark" placement="center" size="md" hideCloseButton={true} backdrop="blur">
            <ModalContent>
                <div className='flex gap-2 items-center mt-5 ml-4 text-2xl font-bold'>
                   <FaArrowLeftLong />
                   <h1>Account Setting</h1>
                </div>
                
                <div className='h-[37rem] bg-white m-3 flex flex-col justify-center items-center'>
                    <div className='rounded-full w-24 h-24 bg-slate-500 flex justify-center items-center my-4'>
                        <img src="" alt="image" className='rounded-full w-full h-full object-cover' />
                    </div>
                    <div>
                        <div className='flex gap-2 m-6'>
                            <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
        
                        <div className='gap-2 m-6'>
                            <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div>
                            <Textarea
                            label="Bio"
                            placeholder="Enter your Bio"
                            className="max-w-sm ml-4"
                            />                    </div>
                        <div className="flex justify-end mt-9">
                            <Button className='bg-[#420BA1] text-white m-2' variant="text" onClick={handleClose}>Cancel</Button>
                            <Button className='bg-[#420BA1] text-white m-2' variant="contained" onClick={handleSaveChanges}>Save Changes</Button>
                        </div>
                    </div>
                    
                </div>
            </ModalContent>
        </Modal>
    );
}

export default ProfileModal;
