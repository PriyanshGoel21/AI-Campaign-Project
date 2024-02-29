import React, { useState } from "react";
import Card from "../components/Card";
import iphoneImg from "../assets/iphone-img.jpg";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Accordion from "../components/Accordian";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Banner from "../components/Banner";
import { useCompanyContext } from "../ThemeContext";
import { toast } from "react-toastify";

interface Product {
  product_name: string;
  product_price: string;
  product_image_url: string;
  product_url: string;
}

interface ResponseData {
  products?: Product[];
}

const PageOne: React.FC = () => {
  const {
    companyName,
    companyUrl,
    setCompanyInfo,
    selectedCards,
    setSelectedCards,
  } = useCompanyContext();
  const [data, setData] = React.useState<ResponseData | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const cardsData = data?.products?.map((product) => ({
    imgSrc: product.product_image_url,
    price: product.product_price,
    description: product.product_name,
  })) || [
    { imgSrc: iphoneImg, price: "999", description: "iPhone 12 Pro" },
    { imgSrc: iphoneImg, price: "999", description: "iPhone 12 Pro" },
    { imgSrc: iphoneImg, price: "999", description: "iPhone 12 Pro" },
    { imgSrc: iphoneImg, price: "999", description: "iPhone 12 Pro" },
  ];

  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://email-marketing.naad.tech/scan_url?url=${companyUrl}`
      );
      setData(response.data as ResponseData);
      console.log("Product data:", response.data);
      toast.success("Scanned Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", companyName, companyUrl, selectedCards);
  };

  const handleScanUrl = () => {
    console.log("Scanning URL:", companyUrl);
    setIsAccordionOpen(true);
    fetchProductData();
  };

  const toggleSelectCard = (index: number) => {
    setSelectedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="flex flex-col mt-[6%] min-h-screen bg-[#FCFCFB]">
      {/* <div className="absolute top-0 right-0 m-4 text-lg font-semibold flex items-center justify-center gap-2">
        <span>Page 1/3</span>
        <FaArrowRightLong className="text-2xl text-slate-700" />
      </div>
      <h1 className="font-semibold mx-auto mt-6 text-[45px]">
        Welcome to Campaign Marketing
      </h1>
      <p className="mx-auto">
        Let’s discuss your project and find out what we can do to provide value.
      </p> */}
      <main className="flex-grow p-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow-2xl max-w-4xl mx-auto"
        >
          <Banner />
          <div>
            <label
              htmlFor="companyName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="companyName"
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyInfo(e.target.value, companyUrl)}
            />
          </div>
          <div>
            <label
              htmlFor="companyUrl"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Company URL
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              id="companyUrl"
              type="text"
              placeholder="Company URL"
              value={companyUrl}
              onChange={(e) => setCompanyInfo(companyName, e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              onClick={handleScanUrl}
            >
              Scan URL
            </button>
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            isAccordionOpen && (
              <Accordion title="Listed Products">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {cardsData.map((card, index) => (
                    <Card
                      key={index}
                      imgSrc={card.imgSrc}
                      price={card.price}
                      description={card.description}
                      isSelected={!!selectedCards[index]}
                      onToggle={() => toggleSelectCard(index)}
                    />
                  ))}
                </div>
              </Accordion>
            )
          )}
          <div className="px-[40%]">
            <Link to="/page3">
              <button
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="submit"
              >
                Save & Submit
              </button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PageOne;
