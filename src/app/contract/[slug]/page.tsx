import PolicyComponent from "@/app/components/PolicyComponent";
import CommonAPI from "@/Helpers/CommonAPI";
import { Params } from "react-router";

const Policies = async({params}: {params: Params}) => {

    const policies = await CommonAPI({url: `${process.env.apiLink}/policies`, parameters: params.slug, method: "GET"});

    return (
        <div>
            <PolicyComponent policies={policies}/>
        </div>
    );
}

export default Policies;