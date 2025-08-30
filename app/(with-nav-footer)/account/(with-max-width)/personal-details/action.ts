import { Address, CreateAddressRequest } from "types/address.types";
import { BaseApiResponse } from "types/baseApiTypes";
import { EditPersonalDetailsReq, User } from "types/user.types";

export const getAddress = async (token: string): Promise<Address[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/address`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch address");
    }

    const response: BaseApiResponse<Address[]> = await res.json();

    return response.data;
  } catch (error) {
    console.log(error, "Error while fetching address");
    return null;
  }
};

export const createAddress = async (
  token: string,
  req: CreateAddressRequest,
): Promise<CreateAddressRequest | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/address/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      },
    );
    const response: BaseApiResponse<Address> = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    console.log(error, "Error while fetching address");
    throw error;
  }
};

export const editAddress = async (
  token: string,
  req: CreateAddressRequest,
): Promise<CreateAddressRequest | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/address/edit`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      },
    );
    const response: BaseApiResponse<CreateAddressRequest> = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    console.log(error, "Catch Error while editing address");
    throw error;
  }
};

export const deleteAddress = async (
  token: string,
  id: string,
): Promise<boolean | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/address/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    const response: BaseApiResponse<boolean> = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    console.log(error, "Error while deleting address");
    throw error;
  }
};

export const editUserDetails = async (
  token: string,
  req: EditPersonalDetailsReq,
): Promise<User | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/edit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    const response: BaseApiResponse<User> = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    console.log(error, "Catch Error while editing user details");
    throw error;
  }
};
