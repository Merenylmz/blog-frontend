import "./globals.css";
import HomeComponents from "@/Components/HomeComponents";
import CommonAPI from "@/Helpers/CommonAPI";


const Home = async() => {

  const blogs = await CommonAPI({url: `${process.env.apiLink}/blogs/popular`, method: "GET"});
  const categories = await CommonAPI({url: `${process.env.apiLink}/categories`, method: "GET"});
  
  return (
    <div className="container mx-auto">
      <HomeComponents blog={blogs} category={categories}/>
    </div>
  );
}

export default Home;
