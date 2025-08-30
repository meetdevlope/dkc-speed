import React from "react";
import Icon from "./icon/Icon";
import Link from "next/link";

const FollowUs = () => {
  return (
    <div>
      <h6 className="text-center">Follow us on</h6>
      <div className="mt-4 flex items-center justify-center gap-x-4">
        <Link
          target="_blank"
          href={
            "https://www.facebook.com/people/Designer-Kids-Club/61556589175670"
          }
        >
          <Icon name="facebook" size={30} className="hover:text-primary-500" />
        </Link>
        <Link
          target="_blank"
          href={"https://www.instagram.com/designerkidsclub_"}
        >
          <Icon name="instagram" size={30} className="hover:text-primary-500" />
        </Link>
        <Link target="_blank" href={"https://www.tiktok.com/@designerkidsclub"}>
          <Icon name="tiktok" size={30} className="hover:text-primary-500" />
        </Link>
      </div>
    </div>
  );
};

export default FollowUs;
