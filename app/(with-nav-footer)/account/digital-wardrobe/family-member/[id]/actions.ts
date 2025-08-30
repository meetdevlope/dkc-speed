import { fetchData } from "utils/apiCaller";
import {
  CreateFamilyMemberRequest,
  EventJournal,
  FamilyMember,
  FamilyMemberResponse,
  WardrobeItem,
} from "../../action";
import toast from "react-hot-toast";

export const getFamilyMemberDetails = async (
  token: string,
  id: string,
): Promise<FamilyMemberResponse> => {
  return fetchData<FamilyMemberResponse>(
    `/wardrobe/family-member/details/${id}`,
    {
      token: token,
      errorMessage: "family-member-details",
      shouldNotThrowErrorOnCatch: true,
    },
  );
};

export const getMemberWardrobeItems = async (
  token: string,
  memberId: string,
): Promise<WardrobeItem[]> => {
  return fetchData<WardrobeItem[]>(
    `/wardrobe/inventory/family-member/${memberId}`,
    {
      token: token,
      errorMessage: "member-wardrobe-inventory",
      shouldNotThrowErrorOnCatch: true,
    },
  );
};

export const getMemberEventsJournals = async (
  token: string,
  memberId: string,
): Promise<EventJournal> => {
  return fetchData<EventJournal>(
    `/wardrobe/journal/family-member/${memberId}`,
    {
      token: token,
      errorMessage: "member-journal-list",
      shouldNotThrowErrorOnCatch: true,
    },
  );
};

export const editFamilyMember = async (
  token: string,
  id: string,
  body: CreateFamilyMemberRequest,
): Promise<FamilyMember | null> => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/wardrobe/family-member/edit/${id}`;

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
    toast.error("An error occurred while editing the member.");
    console.error("Error editing family member:", error);
    return null;
  }
};

export const deleteFamilyMember = async (
  token: string,
  id: string,
): Promise<FamilyMember | null> => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/wardrobe/family-member/delete/${id}`;

  try {
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error(`Failed to Delete: ${response.statusText}`);
      return null;
    }

    const output = await response.json();

    if (!output || !output.data) {
      toast.error("Invalid response data.");
      return null;
    }

    toast.success("Deleted successfully!");
    return output.data;
  } catch (error) {
    toast.error("An error occurred while deleting the member.");
    console.error("Error deleting family member:", error);
    return null;
  }
};

export const deleteEvent = async (
  token: string,
  id: string,
): Promise<EventJournal | null> => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/wardrobe/journal/delete/${id}`;

  try {
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error(`Failed to Delete: ${response.statusText}`);
      return null;
    }

    const output = await response.json();

    if (!output || !output.data) {
      toast.error("Invalid response data.");
      return null;
    }

    toast.success("Deleted successfully!");
    return output.data;
  } catch (error) {
    toast.error("An error occurred while deleting the member.");
    console.error("Error deleting event journal:", error);
    return null;
  }
};

export const getProductEventsJournals = async (
  token: string,
  productId: string,
): Promise<EventJournal> => {
  return fetchData<EventJournal>(`/wardrobe/journal/product/${productId}`, {
    token: token,
    errorMessage: "product-journal-list",
    shouldNotThrowErrorOnCatch: true,
  });
};
