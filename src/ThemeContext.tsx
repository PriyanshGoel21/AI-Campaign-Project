import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CompanyContextType {
  companyName: string;
  companyUrl: string;
  setCompanyInfo: (name: string, url: string) => void;
  selectedCards: { [key: number]: boolean };
  setSelectedCards: Dispatch<SetStateAction<{ [key: number]: boolean }>>;
  campaignId: number | null; // Define the campaignId property
  setCampaignId: React.Dispatch<React.SetStateAction<number | null>>; // Define the setCampaignId function
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};

interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({
  children,
}: CompanyProviderProps) => {
  const [companyName, setCompanyName] = React.useState("");
  const [companyUrl, setCompanyUrl] = React.useState("");
  const [selectedCards, setSelectedCards] = React.useState<{
    [key: number]: boolean;
  }>({});
  const [campaignId, setCampaignId] = React.useState<number | null>(null); // Initialize campaignId as null

  const setCompanyInfo = (name: string, url: string) => {
    setCompanyName(name);
    setCompanyUrl(url);
  };

  const contextValue: CompanyContextType = {
    companyName,
    companyUrl,
    setCompanyInfo,
    selectedCards,
    setSelectedCards,
    campaignId, // Add campaignId to the context
    setCampaignId, // Add setCampaignId to the context
  };

  return (
    <CompanyContext.Provider value={contextValue}>
      {children}
    </CompanyContext.Provider>
  );
};
