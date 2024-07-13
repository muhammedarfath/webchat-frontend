import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Card, Skeleton} from "@nextui-org/react";
import Post from '../../Components/post/Post';
import PostModal from '../../Components/post/PostModal';
import {
    useDisclosure,
  } from "@nextui-org/react";

function Tags() {
    const { title } = useParams();
    const [loading,setLoading ] = useState(true)
    const [tagpost,setTagPost] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(()=>{
        setLoading(true)
        console.log(title);
        const fetchTagPosts = async () =>{
            try{
                const response = await axios.get(`http://127.0.0.1:8000/posts/tag-post/${title}/`);
                if (response.data){
                    setTagPost(response.data)
                }else{
                    console.log('err');
                }
                
            }catch(err){
                console.log(err);
            }
            setLoading(false);
        }
        fetchTagPosts()
    },[title])

    console.log(tagpost,"this tag post");


    if (loading) {
        return (
          <div className="h-screen overflow-auto relative bg-white w-full">
          <div className="columns-2 xl:columns-4 p-4 gap-4 space-y-4">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="w-full h-auto rounded-3xl">
                <Skeleton className="rounded-lg">
                  <div className="rounded-lg bg-default-300"
                  style={{height:`${Math.random()*300 + 300}px`}}
                  ></div>
                </Skeleton>
              </Card>
            ))}
          </div>
        </div>
        )
      }
      const handleOpen = (post) => {
        setSelectedPost(post)
        onOpen();
      };
      const getRandomImage = () =>{
        const randomIndex = Math.floor(Math.random() * tagpost.length);
        return tagpost[randomIndex].picture;
      }
  return (
    <>
       {!loading && <div className="w-full flex flex-col overflow-auto">
        <div className="w-full h-1/2 flex-row flex gap-1 p-5">
        {tagpost.length > 0 ? (
               <img src={`http://127.0.0.1:8000${getRandomImage()}`} alt="img" className="rounded-full border-1 lg:w-52 lg:h-52 w-28 h-28 object-cover" />
            ) : (
              <img src="/images/profile-image.webp" alt="img" className="rounded-full border-1 lg:w-52 lg:h-52 w-28 h-28 object-cover" />
            )}
          <div className='flex flex-col justify-center gap-2 ml-5'>
            <h1 className='text-3xl'>#sample</h1>
            <small className='text-xl'>{tagpost.length.toLocaleString()} posts</small>
          </div>
        </div>

        <div className="flex w-full sticky top-0 bg-white shadow-sm p-4">
           <span>Top Posts</span>
        </div>

        <div className="columns-2 xl:columns-4 p-4 gap-4 space-y-4">
         {tagpost.map((post, index) => (
            <Post key={index} post={post} handleOpen={handleOpen} />
          ))}
    </div>
    {selectedPost && (
        <PostModal isOpen={isOpen} onClose={onClose} selectedPost={selectedPost} />
    )}

      </div>}

    </>
  )
}

export default Tags
