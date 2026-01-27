const HomePage = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-10">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Enjoy Our <br />
              <span className="text-red-500">Delicious Food</span>
            </h1>
            <p className="mt-6 text-gray-300">Experience the taste of fresh and flavorful dining.</p>
            <button className="mt-8 rounded bg-red-600 px-6 py-3 font-semibold">Order Now</button>
          </div>

          <div>{/* image */}</div>
        </div>
      </section>

      {/* Other sections */}
    </>
  );
};

export default HomePage;
