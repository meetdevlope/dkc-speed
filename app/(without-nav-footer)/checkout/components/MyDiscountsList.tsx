// "use client";

// import Icon from "components/icon/Icon";
// import React from "react";
// import { DiscountResponse } from "types/product.types";

// interface MyDiscountsListProps {
//   token: string;
// }

// const MyDiscountsList: React.FC<MyDiscountsListProps> = (props) => {
//   const { token } = props;

//   return (
//     <div className="mx-auto mt-4 max-w-md rounded-md bg-white p-2">
//       <div className="mb-4 flex items-center gap-x-2">
//         <h6 className="text-neutral-400">Available Discounts</h6>
//         <Icon name="tag" iconType="stroke" size={16} />
//       </div>
//       <ul className="space-y-3 pl-1">
//         {discounts.map((item, index) => (
//           <li key={index} className="font-medium text-neutral-500">
//             {item.discountTitle}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const discounts: DiscountResponse[] = [
//   {
//     discountTitle: "FREE Products",
//     discountMap: {
//       Meet: 1,
//       Shubham: 2,
//     },
//   },
// ];

// export default MyDiscountsList;
