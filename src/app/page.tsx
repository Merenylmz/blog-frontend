import "./globals.css";
import HomeComponents from "@/app/components/HomeComponents";
import CommonAPI from "@/Helpers/CommonAPI";


const Home = async() => {
  const blogs = await CommonAPI({url: `${process.env.apiLink}/blogs/popular`, method: "GET"});
  const categories = await CommonAPI({url: `${process.env.apiLink}/categories`, method: "GET"});
  return (
    <div className="container mx-auto">
      <HomeComponents blog={blogs.data} category={categories.data} apiLink={process.env.NEXT_PUBLIC_API_URL!}/>
    </div>
  );
}

export default Home;
