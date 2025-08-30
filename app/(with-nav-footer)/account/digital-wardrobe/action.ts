import { EnvironmentalFootprintResponse } from "app/(with-nav-footer)/products/[slug]/action";
import toast from "react-hot-toast";
import { BaseApiResponse } from "types/baseApiTypes";
import { User } from "types/user.types";
import { fetchData } from "utils/apiCaller";
import {
  MatchingRecommendationRequest,
  RecommendationDetailsRequest,
  RecommendationListRequest,
  RecommendationResponse,
  WardrobeInventoryWarnType,
} from "./wardrobe.types";
import { Product } from "types/product.types";

export const getFamilyMembers = async (
  token: string,
): Promise<FamilyMemberResponse[]> => {
  return fetchData<FamilyMemberResponse[]>(`/wardrobe/family-member/list`, {
    token: token,
    errorMessage: "wardrobe-family-members",
    shouldNotThrowErrorOnCatch: true,
  });
};

export const createFamilyMember = async (
  token: string,
  body: CreateFamilyMemberRequest,
): Promise<FamilyMember | null> => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/wardrobe/family-member/create`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      toast.error(`Failed to create: ${response.statusText}`);
      return null;
    }

    const output = await response.json();

    if (!output || !output.data) {
      toast.error("Invalid response data.");
      return null;
    }

    toast.success("Created successfully!");
    return output.data;
  } catch (error) {
    toast.error("An error occurred while creating the member.");
    console.error("Error creating family member:", error);
    return null;
  }
};

export const getEventsJournals = async (
  token: string,
): Promise<EventJournal> => {
  return fetchData<EventJournal>(`/wardrobe/journal/list`, {
    token: token,
    errorMessage: "journal-list",
    shouldNotThrowErrorOnCatch: true,
  });
};

export const createEvent = async (
  token: string,
  body: CreateEventRequest,
): Promise<EventJournal | null> => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/wardrobe/journal/create`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      toast.error(`Failed to create: ${response.statusText}`);
      return null;
    }

    const output = await response.json();

    if (!output || !output.data) {
      toast.error("Invalid response data.");
      return null;
    }

    toast.success("Created successfully!");
    return output.data;
  } catch (error) {
    toast.error("An error occurred while creating event journal.");
    console.error("Error creating event journal:", error);
    return null;
  }
};

export const getWardrobeItems = async (
  token: string,
  urlParams?: string,
): Promise<WardrobeItem[]> => {
  return fetchData<WardrobeItem[]>(
    `/wardrobe/inventory/list?${urlParams || ""}`,
    {
      token: token,
      errorMessage: "wardrobe-inventory",
      shouldNotThrowErrorOnCatch: true,
    },
  );
};

export const createWardrobeItem = async (
  token: string,
  body: CreateWardrobeItem,
): Promise<WardrobeItem | null> => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/wardrobe/inventory/create`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      toast.error(`Failed to create: ${response.statusText}`);
      return null;
    }

    const output = await response.json();

    if (!output || !output.data) {
      toast.error("Invalid response data.");
      return null;
    }

    toast.success("Added successfully!");
    return output.data;
  } catch (error) {
    toast.error("An error occurred while adding wardrobe item.");
    console.error("Error adding wardrobe item:", error);
    return null;
  }
};

export const editWardrobeItem = async (
  token: string,
  id: string,
  body: CreateWardrobeItem,
): Promise<WardrobeItem | null> => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/wardrobe/inventory/edit/${id}`;

  try {
    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      toast.error(`Failed to edit: ${response.statusText}`);
      return null;
    }

    const output = await response.json();

    if (!output || !output.data) {
      toast.error("Invalid response data.");
      return null;
    }

    toast.success("Edited successfully!");
    return output.data;
  } catch (error) {
    toast.error("An error occurred while editing wardrobe item.");
    console.error("Error editing wardrobe item:", error);
    return null;
  }
};

export const getWardrobeOverviewAndEnvFootprint = async (
  token: string,
): Promise<WardrobeDashboardResponse> => {
  return fetchData<WardrobeDashboardResponse>(`/wardrobe/inventory/dashboard`, {
    token: token,
    errorMessage: "wardrobe-overview",
    shouldNotThrowErrorOnCatch: true,
  });
};

export const getWardrobeRecommendations = async (
  token: string,
  body: RecommendationListRequest,
): Promise<RecommendationResponse[]> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      "/wardrobe/inventory/recommendation/list",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    console.error("Failed to fetch wardrobe recommendations");
    throw new Error("API error: wardrobe/inventory/recommendation/list");
  }

  const apiResponse: BaseApiResponse<RecommendationResponse[]> =
    await response.json();

  return apiResponse.data;
};

export const getWardrobeRecommendationProducts = async (
  token: string,
  body: RecommendationDetailsRequest,
): Promise<RecommendationResponse> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      "/wardrobe/inventory/recommendation/details",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    console.error("Failed to fetch wardrobe recommendations");
    throw new Error("API error: wardrobe/inventory/recommendation/list");
  }

  const apiResponse: BaseApiResponse<RecommendationResponse> =
    await response.json();

  return apiResponse.data;
};

export const getWardrobeMatchingRecommendation = async (
  token: string,
  body: MatchingRecommendationRequest,
): Promise<Product[]> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      "/wardrobe/inventory/recommendation/matching-product-list",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  const apiResponse: BaseApiResponse<Product[]> = await response.json();

  if (!response.ok) {
    console.error(
      apiResponse?.message,
      "Failed to fetch wardrobe matching recommendations",
    );
    throw new Error(
      "API error: wardrobe/inventory/recommendation/matching-product-list",
    );
  }

  return apiResponse.data;
};

export const generateShareWardrobe = async (
  token: string,
  body: CreateWardrobeShareRequest,
): Promise<CreateWardrobeShareResponse | null> => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/wardrobe/share/create`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      toast.error(
        `Failed to generate share wardrobe link: ${response.statusText}`,
      );
      return null;
    }

    const output = await response.json();

    if (!output || !output.data) {
      toast.error("Invalid response data.");
      return null;
    }

    return output.data;
  } catch (error) {
    toast.error("An error occurred while generating share wardrobe link.");
    console.error("Error generating share wardrobe link:", error);
    return null;
  }
};

export const getSharedWardrobe = async (
  id: string,
): Promise<ShareWardrobeResponse> => {
  return fetchData<ShareWardrobeResponse>(`/wardrobe/share/inventory/${id}`, {
    errorMessage: "get-shred-wardrobe-",
    shouldNotThrowErrorOnCatch: true,
  });
};

export const getUserById = async (id: string): Promise<User> => {
  return fetchData<User>(`/auth/user-details/${id}`, {
    errorMessage: "get-user-by-id",
    shouldNotThrowErrorOnCatch: true,
  });
};

export const getWardrobeCollectionList = async (
  token: string,
  familyMember?: string,
): Promise<WardrobeCollection[]> => {
  const params = new URLSearchParams();
  if (familyMember) {
    params.append("familyMember", familyMember);
  }

  const url = `/wardrobe/collection/list${params.toString() ? `?${params.toString()}` : ""}`;

  return fetchData<WardrobeCollection[]>(url, {
    token: token,
    errorMessage: "wardrobe-collection-list",
    shouldNotThrowErrorOnCatch: true,
  });
};

export interface CreateFamilyMemberRequest {
  name: string;
  gender: string;
  birthDate: string;
}

export interface FamilyMemberResponse {
  member: FamilyMember;
  environmentFootprint: EnvironmentalFootprintResponse;
  overview: FamilyMemberOverview;
}

export interface EventJournal {
  _id: string;
  productId: string;
  familyMember: string;
  eventTitle: string;
  description: string;
  photos: string[];
  userId: string;
  journalDate: Date;
}

export type FamilyMemberOverview = {
  totalItems: number;
  dkcItems: number;
  purchasedItems: number;
  totalValue: number;
};

export type FamilyMember = {
  _id: string;
  name: string;
  gender: string;
  birthDate: string;
  userId: string;
  createdDate: string;
};

export interface WardrobeItem {
  name: string;
  brand: string;
  size: string;
  _id: string;
  dkcInventory?: boolean;
  skuId: string;
  photos: string[];
  familyMember?: string;
  userId?: string;
  wearType?: WardrobeInventoryWarnType;
  purchasePrice: number;
  purchaseDate?: string;
  createdDate: Date;
  categories?: string[];
}

export interface CreateWardrobeItem {
  name?: string;
  brand: string;
  size: string;
  familyMember: string;
  dkcInventory?: boolean;
  photos: string[];
  purchasePrice: number;
  wearType?: WardrobeInventoryWarnType;
  skuId?: string;
  purchaseDate: string;
}

export interface CreateEventRequest {
  productId: string;
  familyMember: string;
  eventTitle: string;
  description?: string;
  photos: string[];
  journalDate: string;
}

export interface WardrobeDashboardResponse {
  environmentFootprint: {
    co2e_footprint_kg: number;
    cumulative_energy_demand_mj: number;
    water_scarcity_footprint_g_peq: number;
    eutrophication_footprint_m3: number;
  };
  overview: {
    totalItems: number;
    dkcItems: number;
    totalValue: number;
    familyMember: number;
  };
}

export interface CreateWardrobeShareRequest {
  productId: string[];
}

export interface CreateWardrobeShareResponse {
  _id: string;
  productId: string[];
  userId: string;
  createdDate: string;
  active: boolean;
}

export interface ShareWardrobeResponse {
  inventory: WardrobeItem[];
  userDetails: {
    name: string;
  };
}

export enum WardrobeListType {
  DKC = "dkc",
  OTHER = "other",
}

export enum WardrobeRecommendationType {
  StyleBase = "style_base",
  SeasonalOrOccasional = "seasonal_or_occasional",
  Trendy = "trendy",
  Matching = "matching",
  LocationOrFestive = "location_or_festive",
}

export interface WardrobeRecommendationParams {
  type?: WardrobeRecommendationType;
  location?: string;
  pageSize?: string;
  productId?: string;
}

export interface WardrobeCollection {
  _id: string;
  name: string;
}
