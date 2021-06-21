import SiteHeader from "../component/layout/SiteHeader/SiteHeader";
import ListingHeader from "../component/layout/ListingHeader/ListingHeader";
import ListingFeatured from "../component/layout/BlogListing/ListingFeatured";
import Listing from "../component/layout/BlogListing/Listing";
import SectionSwag from "../component/layout/SectionSwag/SectionSwag";
import SiteFooter from "../component/layout/SiteFooter/SiteFooter";
import Head from "next/head";
import PostService from "../services/PostService";
import TagService from "../services/TagService";
import { useState } from "react";

export async function getServerSideProps(context) {
  const clickNo = 0;
  const tagsArray = await TagService.getTags();
  // console.log(tagsArray);
  try {
    const postParams = {
      fieldName: "publishedAt",
      order: -1,
      limit: 9,
      skip: 0
    };
    const responsePost = await PostService.getLatestPosts(postParams);
    // console.log(responsePost.data);

    return {
      props: {
        blog: responsePost.data.blog,
        tagsArray: tagsArray,
        count: responsePost.data.count
      }
    };
  } catch (err) {
    console.log("Error => ", err);
    return err;
  }
}

export default function BlogListing({ blog, tagsArray, count }) {
  // console.clear();
  // console.log(tagsArray);
  const [newBlogs, setNewBlogs] = useState(blog);

  const currentCount = (count) => {
    // console.log(count);
    getNewPosts(count);
  };

  const getNewPosts = async (clickNo) => {
    const limit = 9;
    const postParams = {
      fieldName: "publishedAt",
      order: -1,
      limit: limit,
      skip: clickNo * limit
    };
    const responsePost = await PostService.getLatestPosts(postParams);
    // console.log(responsePost.data.blog);
    // console.log(posts, count);

    setNewBlogs((prevValue) => {
      return [...prevValue, ...responsePost.data.blog];
    });
  };
  return (
    <div>
      <Head>
        <title>Blog | Nullcast</title>
      </Head>
      <SiteHeader />
      <ListingHeader />
      {blog[0] && <ListingFeatured blog={blog} />}
      <Listing
        blog={newBlogs}
        tagsArray={tagsArray}
        currentCount={currentCount}
        blogCount={count}
      />
      <SectionSwag />
      <SiteFooter />
    </div>
  );
}
