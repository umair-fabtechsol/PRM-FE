import { CampaignType } from "@/types";
export const CAMPAIGN_LIST: CampaignType[] = Array.from(
  { length: 5 },
  (_, index) => ({
    id: `user-${index}`,
    name: `John Doe ${index}`,
    status: index % 3 === 0 ? "Red" : index % 3 === 1 ? "Blue" : "Green",
    startDate: `sep 30, 2024`,
    endDate: `sep 31, 2025`,
    revenew: `$123,455`,
    imageUrl: "/images/image.jpg",
  })
);
