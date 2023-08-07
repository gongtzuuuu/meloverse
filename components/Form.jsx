"use client";

import { useState, useEffect, useRef } from "react";

const Form = ({
  post,
  setPost,
  submitStatus,
  isSubmitting,
  handleSubmit,
  setToggleShow,
}) => {
  const [button, setButton] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const inputValueRef = useRef();

  // Add tags to tags array
  const handleClick = () => {
    const newValue = inputValueRef.current.value;
    if (newValue.trim()) {
      setPost({ ...post, tag: [...post.tag, newValue.trim()] });
      inputValueRef.current.value = "";
    }
    setTags(post.tag);
  };

  // Remove tags from tags array
  const removeTag = (index) => {
    const newTagArr = post.tag.filter((e, i) => i !== index);
    setPost({ ...post, tag: newTagArr });
  };

  useEffect(() => {
    setTags(post.tag);
  }, [post]);

  useEffect(() => {
    if (submitStatus === "Create" && isSubmitting) {
      setButton("Creating");
    } else if (submitStatus === "Create" && !isSubmitting) {
      setButton("Create");
    } else if (submitStatus === "Update" && isSubmitting) {
      setButton("Updating");
    } else if (submitStatus === "Update" && !isSubmitting) {
      setButton("Update");
    }
  }, [submitStatus && isSubmitting]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
    >
      {/* -------------- */}
      {/* Story Textarea */}
      {/* -------------- */}
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Your story
        </span>
        <textarea
          className="form_textarea "
          value={post.post}
          onChange={(e) => setPost({ ...post, post: e.target.value })}
          placeholder="Write your story about this song..."
          required
        />
      </label>
      {/* --------- */}
      {/* Tag Input */}
      {/* --------- */}
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Tag
        </span>
        {/* --- Tags Input & Add Button --- */}
        <div className="flex items-center">
          <input
            ref={inputValueRef}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="form_input"
            placeholder="Click Add to add more tags"
          />
          <button
            type="button"
            className="ml-4 text-sm text-gray-700 underline decoration-1 decoration-gray-500 underline-offset-8"
            onClick={handleClick}
          >
            Add
          </button>
        </div>
        {/* --- Tags Display Area --- */}
        <div className="form_tag_display">
          {post.tag.map((eachTag, index) => (
            <p key={index} className="form_tag">
              #{eachTag}
              <span className="form_span" onClick={() => removeTag(index)}>
                －
              </span>
            </p>
          ))}
        </div>
      </label>
      {/* ------------------------- */}
      {/* Cancel and Submit Buttons */}
      {/* ------------------------- */}
      <div className="flex-end mx-3 mb-5 gap-4">
        {/* --- Cancel Button --- */}
        <button
          onClick={() => {
            setToggleShow(false);
          }}
          className="text-gray-500 text-sm"
        >
          Cancel
        </button>
        {/* --- Submit Button --- */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-1.5 text-sm rounded-full text-white bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
        >
          {button}
        </button>
      </div>
    </form>
  );
};

export default Form;
