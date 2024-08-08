import Image from "next/image";

const LoadingComponent = ({loadingIcon, image="loadingLogo.svg"}: {loadingIcon: boolean, image?: string}) => {
    return (
        <>
            {
                loadingIcon &&
                <Image width={100} height={100} src={`/${image}`} alt="loading..."></Image>
            }
        </>
    );
}

export default LoadingComponent;