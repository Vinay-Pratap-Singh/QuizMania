const Contact = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center ml-60">
      <form
        name="contact"
        method="post"
        className="shadow-md rounded-md flex flex-col gap-4 items-center w-[22rem] p-4"
      >
        {/* for netlify bot */}
        <input type="hidden" name="form-name" value="contact" />

        <h1 className="text-[#00C8AC] text-2xl font-bold">Contact Form</h1>
        <div className="flex flex-col w-full">
          <label htmlFor="name" className="font-semibold">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            className="border border-white border-b-black"
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="email" className="font-semibold">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            className="border border-white border-b-black"
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="message" className="font-semibold">
            Your Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Enter your message"
            required
            className="border border-white border-b-black h-32 resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-[#1fe8cd] w-full rounded-sm text-white font-bold py-2 hover:bg-[#15dbc0] transition-all duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
