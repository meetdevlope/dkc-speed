import Icon from "components/icon/Icon";
import Link from "next/link";
import React from "react";

type WhatsappProps = {
  text?: string;
};

const Whatsapp: React.FC<WhatsappProps> = (props) => {
  const { text = `Shop with DKC - ${process.env.NEXT_PUBLIC_FRONTEND_URL}` } =
    props;

  return (
    <Link
      href={`https://wa.me/?text=${encodeURIComponent(text)}`}
      passHref
      target="_blank"
    >
      <Icon name="whatsapp" size={20} />
    </Link>
  );
};

export default Whatsapp;
