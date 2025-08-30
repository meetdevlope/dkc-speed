import MaxWidthWrapper from "components/MaxWidthWrapper";
import PageHeader from "components/PageHeader";
import Link from "next/link";
import { ROUTES } from "utils/routes";
import { getAllBlogs } from "./action";
import BlogCard from "./BlogCard";

const AllBlogsScreen = async () => {
  const blogList = await getAllBlogs();

  return (
    <MaxWidthWrapper className="p-4">
      <PageHeader>Blogs</PageHeader>
      <div className="my-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.isArray(blogList) &&
          blogList?.length > 0 &&
          blogList?.map((blog, index) => (
            <Link key={index} href={ROUTES.BLOGS.BLOG_DETAILS(blog?._id || "")}>
              <BlogCard config={blog} />
            </Link>
          ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default AllBlogsScreen;
