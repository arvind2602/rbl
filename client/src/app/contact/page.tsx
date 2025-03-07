"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useState } from "react";
import Footer from "@/components/Footer";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    enquiryPurpose: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
      <form
        onSubmit={handleSubmit}
        className="w-[70vh] h-[100vh] mx-auto  ml-[550px] mt-[170px]"
      >
        <h1
          style={{ fontFamily: "Satoshi" }}
          className="text-[#7FB2D4] text-7xl font-medium ml-[-6px]"
        >
          Get in touch
        </h1>
        <p
          style={{ fontFamily: "Satoshi" }}
          className=" font-medium text-[20px] text-[#ACACAC] mt-2"
        >
          Feel free to contact us for further assistance
        </p>
        <div className="mb-4 mt-6">
          <label
            htmlFor="name"
            style={{ fontFamily: "Satoshi" }}
            className="block text-[#FFFFFF] font-medium text-[16px] mb-2 "
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border bg-[#B6B6B6] opacity-[12%] rounded-md  focus:outline-none text-white focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            style={{ fontFamily: "Satoshi" }}
            className="block text-[#FFFFFF] font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border  bg-[#B6B6B6] opacity-[12%] rounded-md  text-white  focus:outline-none "
            required
          />
        </div>
      
        <div className="mb-4">
          <label
            htmlFor="enquiryPurpose"
            style={{ fontFamily: "Satoshi" }}
            className="block text-[#FFFFFF] font-medium mb-2"
          >
            Purpose of Enquiry
          </label>
          <textarea
            id="enquiryPurpose"
            name="enquiryPurpose"
            value={formData.enquiryPurpose}
            rows={4}
            className="w-full px-3 py-2 border bg-[#B6B6B6] opacity-[12%] rounded-md  text-white  focus:outline-none "
            required
          ></textarea>
        </div>
        <div className="flex justify-between">
          <div>
            <p
              style={{ fontFamily: "Satoshi" }}
              className="text-[16px] font-medium text-[#BBBBBB]"
            >
              Get help:{" "}
              <a
                href="mailto:connect@vighnotech.com"
                className="text-[#FFFFFF] font-medium text-[16px]"
              >
                info@ai.com
              </a>
            </p>
          </div>

          <div>
            <button
              type="submit"
              style={{ fontFamily: "Satoshi" }}
              className="bg-[#6AADDA] text-[#FFFAFA] py-2 px-4 rounded-md  focus:outline-none focus:bg-blue-600"
            >
              {" "}
              Submit
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default ContactForm;
