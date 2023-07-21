const Form = ({ post, setPost, isSubmitting, handleSubmit, setToggleShow }) => {
  return (
    <>
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
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#motivation, #lovestory, #idea, etc."
            required
            className="form_input"
          />
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
    </>
  );
};

export default Form;
