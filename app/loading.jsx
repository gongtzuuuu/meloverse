const Loading = () => {
  return (
    <section className="w-full">
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-4 border-indigo-600"></div>
      </div>
    </section>
  );
};

export default Loading;
