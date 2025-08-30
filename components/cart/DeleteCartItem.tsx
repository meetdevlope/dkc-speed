import { useMutation, useQueryClient } from "@tanstack/react-query";
import Icon from "components/icon/Icon";
import Spinner from "components/spinner/Spinner";
import { useCart } from "hooks/useCart";
import React from "react";
import toast from "react-hot-toast";
import { useCartStore } from "store/cart";
import { useCartCount } from "store/cartCount";

type DeleteCartItemProps = {
  token: string;
  deviceId: string;
  deleteId: string;
};

const DeleteCartItem: React.FC<DeleteCartItemProps> = (props) => {
  const { deviceId, token, deleteId } = props;
  const queryClient = useQueryClient();

  const deleteCartItemFromStore = useCartStore((state) => state.delete);
  const decrement = useCartCount((state) => state.decrement);

  const { deleteCart } = useCart(token, deviceId);

  const { mutateAsync: deleteItemMutation, isPending: isDeletingItem } =
    useMutation({
      mutationFn: deleteCart,
      onSuccess: async () => {
        deleteCartItemFromStore(deleteId);
        queryClient.invalidateQueries({
          queryKey: ["get-cart"],
        });
      },
      onError: (error) => {
        console.error("Error in deleting item:", error.message);
        toast.error("Could not delete item from cart");
      },
    });

  const handleDeleteItem = async (e) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      await deleteItemMutation(deleteId);
      decrement();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      disabled={isDeletingItem}
      className="fall cursor-pointer self-end rounded-full bg-neutral-50/60 p-1 transition-all hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={handleDeleteItem}
    >
      {!isDeletingItem ? (
        <Icon
          name="close"
          className="stroke-[1.3px]"
          color="var(--neutral-400)"
          iconType="stroke"
          size={20}
        />
      ) : (
        <Spinner color="gray" />
      )}
    </button>
  );
};

export default DeleteCartItem;
