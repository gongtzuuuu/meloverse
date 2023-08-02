const NotLogin = ({ text }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Oops!</span>
      </h1>
      <p className="desc">{text}</p>
    </section>
  );
};

export default NotLogin;
