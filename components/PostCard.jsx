import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const PostCard = ({ postData, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  if (postData)
    return (
      <div className="prompt_card">
        <div className="flex flex-col item-center">
          {/* Song Detail */}
          {pathName !== `/details/${postData.songId}` && (
            <Link href={`/details/${postData.songId}`}>
              <div className="flex relative">
                <Image
                  src={postData.songDetail.album_img}
                  alt="album image"
                  width={40}
                  height={40}
                />
                <div className="flex flex-col ml-4">
                  <p className="font-satoshi text-sm font-semibold">
                    {postData.songDetail.name}
                  </p>
                  <p className="font-satoshi text-sm text-gray-700">
                    {postData.songDetail.artist}
                  </p>
                </div>
              </div>
            </Link>
          )}
          {/* Post Detail */}
          <div className="my-4 flex flex-col">
            <p className="my-4 font-satoshi text-gray-700">{postData.post}</p>
            <div className="flex flex-wrap">
              {postData.tag.map((eachTag) => (
                <p className="my-4 mr-2 font-inter text-sm blue_gradient cursor-pointer">
                  #{eachTag}
                </p>
              ))}
            </div>
          </div>
          {/* Post creator */}
          <Link href={`/profile/${postData.userId._id}`}>
            <div className="flex-1 flex justify-start items-center gap-3">
              <Image
                src={postData.userId.image}
                alt="user_image"
                width={20}
                height={20}
                className="rounded-full object-contain"
              />
              <h3 className="my-4 font-satoshi text-sm text-gray-700">
                Written by: {postData.userId.username}
              </h3>
            </div>
          </Link>
          {/* Post edit & delete button */}
          {/* Check (1) If the current login user is the creator of the post */}
          {/* Check (2) If the user is currently in the profile page */}
          {session?.user.id === postData.userId._id &&
            pathName === "/profile" && (
              <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                <p className="outline_btn cursor-pointer" onClick={handleEdit}>
                  Edit
                </p>
                <p
                  className="outline_btn cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </p>
              </div>
            )}
        </div>
      </div>
    );
};

export default PostCard;
