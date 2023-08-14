"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SongDetail from "@components/SongDetail";
import Form from "@components/Form";

// *********************
// Song & Form Component
// *********************
const SongForm = ({ songId, songInfo, postId, postDetail, submitStatus }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [toggleShow, setToggleShow] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formPost, setFormPost] = useState(
    postDetail
      ? {
          songId: songId,
          post: postDetail.post,
          tag: postDetail.tag,
        }
      : {
          songId: songId,
          post: "",
          tag: [],
        }
  );

  // ***********
  // Create Post
  // ***********
  const createPost = async (e) => {
    console.log("createPost invoked!!!!");
    e.preventDefault();
    setIsSubmitting(true);
    const newPost = {
      userId: session?.user.id,
      songId: songId,
      songDetail: {
        name: songInfo.name,
        artist: songInfo.artists[0].name,
        album_img: songInfo.album.images[0].url,
      },
      post: formPost.post,
      tag: formPost.tag,
    };
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/post/new`, {
      method: "POST",
      body: JSON.stringify(newPost),
    });
    if (response.ok && response.status === 201) {
      router.push(`${process.env.NEXTAUTH_URL}/profile/${session.user.id}`);
    }
    setIsSubmitting(false);
  };

  // ***********
  // Update Post
  // ***********
  const updatePost = async (e) => {
    console.log("updatePost invoked!!!!");
    e.preventDefault();
    setIsSubmitting(true);
    const updatePost = {
      post: formPost.post,
      tag: formPost.tag,
    };
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/post/${postId}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatePost),
      }
    );
    // 2. If the post if succedssfully created, then bring back to home
    if (response.ok && response.status === 200) {
      router.push(`${process.env.NEXTAUTH_URL}/profile/${session.user.id}`);
    }
    setIsSubmitting(false);
  };

  if (songInfo)
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <SongDetail
          songId={songId}
          songName={songInfo.name}
          songArtist={songInfo.artists[0].name}
          songImg={songInfo.album.images[0].url}
          setToggleShow={setToggleShow}
        />
        {toggleShow && (
          <Form
            formPost={formPost}
            setFormPost={setFormPost}
            submitStatus={submitStatus}
            handleSubmit={submitStatus === "Create" ? createPost : updatePost}
            isSubmitting={isSubmitting}
            setToggleShow={setToggleShow}
          />
        )}
      </div>
    );
};

export default SongForm;
