import Icon from "components/icon/Icon";
import Image from "next/image";
import dayjs from "dayjs";
import React from "react";
import { BlogType } from "types/cms/component.types";

interface BlogCardProps {
  config: BlogType;
  isWidthCard?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = (props) => {
  const { config: blog } = props;

  if (!blog) return null;

  return (
    <article className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:bg-gray-50">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={345}
          height={200}
        />
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Icon name="avatar" iconType="stroke" size={18} />
            <span className="font-medium">{blog.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="calendar" size={16} />
            <span>{dayjs(blog.publishedDate).format("MMM DD, YY")}</span>
          </div>
        </div>

        <h3 className="line-clamp-2 font-secondary text-sm leading-tight font-semibold text-gray-900 transition-colors duration-200 group-hover:text-primary-500 md:text-base">
          {blog.title}
        </h3>

        {blog.description && (
          <div
            dangerouslySetInnerHTML={{ __html: blog?.description }}
            className="three-lines-ellipsis mt-1 mb-4 text-left text-gray-500 [&>*]:text-sm"
          />
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="group-hover:text-primary-700 flex items-center gap-1 text-sm font-semibold text-primary-500 transition-colors duration-200">
            <span className="font-medium">Read More</span>
            <Icon
              name="chevron"
              iconType="stroke"
              size={18}
              className="-rotate-90 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
