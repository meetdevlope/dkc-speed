import Divider from "components/Divider";
import Icon from "components/icon/Icon";
import { ImageComponent } from "components/image-component/ImageComponent";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import dayjs from "dayjs";
import { getBlogDetails } from "../action";

const BlogDetailsPage = async (props) => {
  const id = props.params.id || "";

  const blog = await getBlogDetails(id || "");

  if (!blog) return <></>;

  return (
    <MaxWidthWrapper>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-5">
          {blog.title && (
            <h1 className="mb-6 font-secondary text-base leading-tight font-bold text-gray-900 md:text-lg">
              {blog.title}
            </h1>
          )}

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            {blog.author && (
              <div className="flex items-center gap-2">
                <Icon name="avatar" iconType="stroke" size={18} />
                <span className="font-medium">{blog.author}</span>
              </div>
            )}
            {blog.publishedDate && (
              <div className="flex items-center gap-2">
                <Icon name="calendar" size={16} />
                <span>{dayjs(blog.publishedDate).format("MMM DD, YY")}</span>
              </div>
            )}
          </div>
        </div>

        <Divider className="mb-5" />

        {blog.image && (
          <div className="mb-6">
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gray-100 md:h-80 lg:h-96">
              <ImageComponent
                src={blog.image}
                alt={blog.title || "Blog image"}
                className="h-full w-full object-cover"
                loading="lazy"
                width={300}
                height={300}
              />
            </div>
          </div>
        )}

        {blog.description && (
          <div className="bg-white p-2">
            <div
              dangerouslySetInnerHTML={{ __html: blog.description }}
              className="max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>a]:text-primary-500 [&>a]:no-underline hover:[&>a]:underline [&>blockquote]:border-l-4 [&>blockquote]:border-primary-500 [&>blockquote]:pl-6 [&>blockquote]:text-gray-600 [&>blockquote]:italic [&>code]:rounded [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:text-sm [&>h1]:mt-8 [&>h1]:mb-6 [&>h1]:text-3xl [&>h1]:font-semibold [&>h1]:text-gray-900 [&>h2]:mt-6 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h3]:mt-5 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>img]:mx-auto [&>img]:rounded-lg [&>img]:shadow-sm [&>li]:mb-2 [&>li]:leading-relaxed [&>ol]:text-gray-900 [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-gray-900 [&>pre]:overflow-x-auto [&>pre]:rounded-lg [&>pre]:bg-gray-100 [&>pre]:p-4 [&>strong]:font-semibold [&>strong]:text-gray-900 [&>ul]:text-gray-900"
            />
          </div>
        )}

        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="text-sm text-gray-500">
              Published on{" "}
              {blog.publishedDate &&
                dayjs(blog.publishedDate).format("MMM DD, YY")}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default BlogDetailsPage;
