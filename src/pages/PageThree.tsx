import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

type CampaignType = "Type 1" | "Type 2" | "Type 3";
type CampaignStyle = "Style 1" | "Style 2" | "Style 3";

const BaseURL: string = "http://159.89.204.17"


const PageThree: React.FC = () => {
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
        ); // Prevent negative quantity
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setBannerImage(file);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${BaseURL}/final_submit`);
            if (response.ok) {
                // const data = await response.json();
                console.log("Submitted: Response", response.statusText);
            } else {
                console.error("Failed to Submit:", response.statusText);
                // Handle error response
            }
        } catch (error) {
            console.error("Error while submission:", error);
            // Handle network errors
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-slate-300 min-h-screen">
            <div className="absolute top-0 right-0 m-4 text-lg font-semibold flex items-center justify-center gap-2">
                <span>Page 3/3</span>
                <FaArrowRightLong className="text-4xl text-slate-700" />
            </div>
            <form className="w-full max-w-2xl space-y-6 bg-white border border-black p-8 rounded-lg shadow-lg"
                  onSubmit={handleSubmit}
            >
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
                        className="mt-1 block w-full border border-transparent rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
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
                            className="mt-1 block w-full border border-transparent rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option>Type 1</option>
                            <option>Type 2</option>
                            <option>Type 3</option>
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
                            className="mt-1 block w-full border border-transparent rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option>Style 1</option>
                            <option>Style 2</option>
                            <option>Style 3</option>
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
                        className="mt-1 block w-full border border-transparent rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={4}
                    ></textarea>
                </div>

                <div>
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
                            value={`${quantity} units`}
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
                </div>

                <div>
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
                </div>

                <div>
                    <label
                        htmlFor="campaign-banner"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Any Specific campaign banner
                    </label>
                    <input
                        type="file"
                        id="campaign-banner"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-sm text-white border border-transparent rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-600 file:hover:bg-slate-700 file:text-white"
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
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded-lg w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PageThree;
