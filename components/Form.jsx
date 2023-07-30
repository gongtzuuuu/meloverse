"use client";

import { useState, useEffect } from "react";

const Form = ({ post, setPost, isSubmitting, handleSubmit, setToggleShow }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  // Add tags by pressing space
  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      const newValue = e.target.value;
      if (newValue.trim()) {
        setPost({ ...post, tag: [...post.tag, newValue.trim()] });
        e.target.value = "";
      }
      setTags(post.tag);
      console.log("New tag added", post.tag);
    }
  };
  // Remove tags
  const removeTag = (index) => {
    const newTagArr = post.tag.filter((e, i) => i !== index);
    setPost({ ...post, tag: newTagArr });
  };

  useEffect(() => {
    setTags(post.tag);
  }, [post]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
    >
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Your story
        </span>
        <textarea
          value={post.post}
          onChange={(e) => setPost({ ...post, post: e.target.value })}
          placeholder="Write your story about this song..."
          required
          className="form_textarea "
        />
      </label>
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Tag{" "}
        </span>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          className="form_input"
          placeholder="Click space to add more tags"
        />
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

      {/*Buttons for cancellation & submitting */}
      <div className="flex-end mx-3 mb-5 gap-4">
        <button
          onClick={() => {
            setToggleShow(false);
          }}
          className="text-gray-500 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
