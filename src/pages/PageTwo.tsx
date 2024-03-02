import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import AlertDialog from "../components/AlertDialog";
import Banner from "../components/Banner";
import { useCompanyContext } from "../ThemeContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

type CampaignType = "Type 1" | "Type 2" | "Type 3";
type CampaignStyle = "Style 1" | "Style 2" | "Style 3";

const PageTwo: React.FC = () => {
  const navigate = useNavigate();
  const { companyName, companyUrl, selectedCards, setCampaignId } =
    useCompanyContext();

  const [campaignTimeline, setCampaignTimeline] = useState("");
  const [campaignType, setCampaignType] = useState<CampaignType>("Type 1");
  const [campaignStyle, setCampaignStyle] = useState<CampaignStyle>("Style 1");
  const [campaignGoal, setCampaignGoal] = useState("");
  const [quantity, setQuantity] = useState(50);
  const [customOffer, setCustomOffer] = useState("no");
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  const handleQuantityChange = (operation: "add" | "subtract") => {
    setQuantity((prev) =>
      operation === "add" ? prev + 50 : Math.max(prev - 50, 0)
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setBannerImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData = {
      company_name: companyName,
      company_url: companyUrl,
      products: Object.keys(selectedCards).map((index) => {
        return {
          product_name: `Product ${index + 1}`,
          product_url: `https://example.com/product${index + 1}`,
          product_price: "999",
          product_image_url: `https://example.com/image${index + 1}.jpg`,
        };
      }),
      campaign_timeline: campaignTimeline,
      threshold: 3,
    };

    try {
      const response = await axios.post(
        "https://email-marketing.naad.tech/create_campaign",
        requestData
      );
      toast.success("Submitted Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log("Campaign created successfully:", response.data);

      setCampaignId(response.data.campaign_id);
      navigate("/page3");

      setCampaignTimeline("");
      setCampaignType("Type 1");
      setCampaignStyle("Style 1");
      setCampaignGoal("");
      setQuantity(50);
      setCustomOffer("no");
      setBannerImage(null);
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 min-h-screen custom-bg">
      {/* <div className="absolute top-0 right-0 m-4 text-lg font-semibold flex items-center justify-center gap-2">
        <span>Page 3/3</span>
        <FaArrowRightLong className="text-2xl text-slate-700" />
      </div> */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl space-y-6 bg-white p-8 rounded-lg shadow-2xl"
      >
        <Banner />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="campaign-timeline"
              className="block text-sm font-medium text-gray-700"
            >
              Campaign Timelines
            </label>
            <input
              type="date"
              id="campaign-timeline"
              value={campaignTimeline}
              onChange={(e) => setCampaignTimeline(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="campaign-timeline"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter Quantity"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="campaign-type"
              className="block text-sm font-medium text-gray-700"
            >
              Campaign Type
            </label>
            <select
              id="campaign-type"
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value as CampaignType)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option>Email Campaign</option>
              <option>Social Media Campaign</option>
              <option>Content Marketing Campaign</option>
              <option>Influencer Marketing Campaign</option>
              <option>Search Engine Marketing (SEM) Campaign</option>
              <option>Search Engine Optimization (SEO) Campaign</option>
              <option>Pay-Per-Click (PPC) Campaign</option>
              <option>Affiliate Marketing Campaign</option>
              <option>Video Marketing Campaign</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="campaign-style"
              className="block text-sm font-medium text-gray-700"
            >
              Campaign Style
            </label>
            <select
              id="campaign-style"
              value={campaignStyle}
              onChange={(e) =>
                setCampaignStyle(e.target.value as CampaignStyle)
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option>Newsletter</option>
              <option>Promotional Offers</option>
              <option>Product Announcements</option>
              <option>Event Invitations</option>
              <option>Welcome Series</option>
              <option>Abandoned Cart Reminders</option>
              <option>Customer Feedback Surveys</option>
              <option>Educational Content</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="campaign-goal"
            className="block text-sm font-medium text-gray-700"
          >
            Campaign Goal
          </label>
          <textarea
            id="campaign-goal"
            value={campaignGoal}
            onChange={(e) => setCampaignGoal(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={4}
          ></textarea>
        </div>

        {/* <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <div className="flex items-center mt-1">
            <button
              type="button"
              onClick={() => handleQuantityChange("subtract")}
              className="px-3 py-1 bg-red-400 to bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              -
            </button>
            <input
              type="text"
              readOnly
              value={`${quantity}`}
              className="mx-4 border border-transparent rounded-md shadow-sm py-2 px-3 text-center focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => handleQuantityChange("add")}
              className="px-3 py-1 bg-green-400 to bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              +
            </button>
          </div>
        </div> */}

        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">
            Any Custom Offer?
          </label>
          <div className="mt-2">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="customOffer"
                value="yes"
                checked={customOffer === "yes"}
                onChange={() => setCustomOffer("yes")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="customOffer"
                value="no"
                checked={customOffer === "no"}
                onChange={() => setCustomOffer("no")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          {/* <AlertDialog /> */}
        </div>

        <div>
          <label
            htmlFor="campaign-banner"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Any Specific Banner
          </label>
          <input
            type="file"
            id="campaign-banner"
            onChange={handleImageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        {bannerImage && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(bannerImage)}
              alt="Banner preview"
              className="max-w-xs"
            />
          </div>
        )}
        <div className="flex justify-center">
          {/* <Link to="/page2"> */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded-lg"
          >
            Save & Proceed
          </button>
          {/* </Link> */}
        </div>
      </form>
    </div>
  );
};

export default PageTwo;
